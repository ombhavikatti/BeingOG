import type { ApiError } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined. Add it to .env.local (see docs/design-system.md)."
  );
}

/**
 * Thrown when the backend returns a non-2xx response.
 * Carries the parsed error body + HTTP status so UI can decide how to react.
 */
export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError,
  ) {
    super(
      Array.isArray(body.message) ? body.message[0] : body.message ?? "Request failed"
    );
    this.name = "ApiRequestError";
  }

  /** Convenience — returns the first error message as a user-friendly string. */
  get displayMessage(): string {
    return Array.isArray(this.body.message)
      ? this.body.message[0]
      : this.body.message ?? "Something went wrong. Please try again.";
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  accessToken?: string;
}

/**
 * Core fetch wrapper. Everything the frontend sends to the backend goes through here.
 *
 * Usage:
 *   const data = await apiRequest<AuthResponse>("/auth/login", {
 *     method: "POST",
 *     body: { email, password },
 *   });
 */
export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, accessToken, headers, ...rest } = options;

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

  // Handle no-content responses (e.g., DELETE returning 204)
  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiRequestError(response.status, data as ApiError);
  }

  return data as T;
}