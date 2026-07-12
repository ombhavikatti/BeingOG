import type { ApiError, AuthResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined. Add it to .env.local.",
  );
}

// ─── localStorage keys (must match auth-context.tsx) ───
const STORAGE_KEYS = {
  accessToken: "beingog:access_token",
  refreshToken: "beingog:refresh_token",
  user: "beingog:user",
} as const;

/**
 * Thrown when the backend returns a non-2xx response.
 */
export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError,
  ) {
    super(
      Array.isArray(body.message)
        ? body.message[0]
        : (body.message ?? "Request failed"),
    );
    this.name = "ApiRequestError";
  }

  get displayMessage(): string {
    return Array.isArray(this.body.message)
      ? this.body.message[0]
      : (this.body.message ?? "Something went wrong. Please try again.");
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  accessToken?: string;
  /** Internal flag — prevents infinite retry loops */
  _isRetry?: boolean;
  /** Skip auto-refresh for specific calls (e.g., login/register themselves) */
  _skipAuthRefresh?: boolean;
}

// ─── Single-flight refresh state ───
// If 10 requests hit 401 at once, they all await the SAME refresh promise.
let refreshPromise: Promise<string | null> | null = null;

/**
 * Attempts to refresh the access token using the stored refresh token.
 * Returns the new access token, or null if refresh failed (user should re-login).
 */
async function refreshAccessToken(): Promise<string | null> {
  // If a refresh is already in-flight, join it
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const storedRefresh = localStorage.getItem(STORAGE_KEYS.refreshToken);
      if (!storedRefresh) return null;

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: storedRefresh }),
      });

      if (!response.ok) {
        // Refresh token invalid/expired — nuke everything, force re-login
        localStorage.removeItem(STORAGE_KEYS.accessToken);
        localStorage.removeItem(STORAGE_KEYS.refreshToken);
        localStorage.removeItem(STORAGE_KEYS.user);
        return null;
      }

      const data = (await response.json()) as AuthResponse;

      // Persist the fresh pair
      localStorage.setItem(STORAGE_KEYS.accessToken, data.accessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, data.refreshToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user));

      // Notify the rest of the app (AuthContext listens for this)
      window.dispatchEvent(
        new CustomEvent("beingog:auth-refreshed", { detail: data }),
      );

      return data.accessToken;
    } catch {
      return null;
    } finally {
      // Clear the shared promise once done (so future 401s trigger fresh refreshes)
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Core fetch wrapper. Auto-refreshes tokens on 401.
 */
export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, accessToken, headers, _isRetry, _skipAuthRefresh, ...rest } =
    options;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // ─── AUTO-REFRESH on 401 ───
  // Only if:
  //  - this call was authenticated (had a token)
  //  - it's not already a retry (prevents infinite loops)
  //  - it's not the refresh/login/register call itself
  if (
    response.status === 401 &&
    accessToken &&
    !_isRetry &&
    !_skipAuthRefresh
  ) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // Retry the original request with the fresh token
      return apiRequest<T>(path, {
        ...options,
        accessToken: newToken,
        _isRetry: true,
      });
    }
    // Refresh failed → let the 401 bubble up so UI can redirect to /login
  }

  // Handle no-content responses
  if (response.status === 204) {
    return undefined as T;
  }

  const data = (await response.json().catch(() => ({}))) as ApiError;

  if (!response.ok) {
    throw new ApiRequestError(response.status, data);
  }

  return data as T;
}