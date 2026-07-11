"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, ApiRequestError } from "@/lib/api/client";
import type { AuthResponse, AuthUser } from "@/lib/api/types";

// ─── localStorage keys ───
const STORAGE_KEYS = {
  accessToken: "beingog:access_token",
  refreshToken: "beingog:refresh_token",
  user: "beingog:user",
} as const;

// ─── Context shape ───
interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean; // true during initial mount (checking localStorage)
  isAuthenticated: boolean;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  email: string;
  username: string;
  name: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider — wraps the app. Manages user + tokens in state + localStorage.
 * Must be added inside providers in layout.tsx (we'll do this next).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, hydrate from localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(STORAGE_KEYS.accessToken);
      const savedUser = localStorage.getItem(STORAGE_KEYS.user);
      if (savedToken && savedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAccessToken(savedToken);
        setUser(JSON.parse(savedUser) as AuthUser);
      }
    } catch {
      // localStorage might be unavailable (SSR, private mode) — silently continue
    }
    setIsLoading(false);
  }, []);

  // ─── Helpers ───
  function persistAuth(response: AuthResponse) {
    localStorage.setItem(STORAGE_KEYS.accessToken, response.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, response.refreshToken);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.user));
    setAccessToken(response.accessToken);
    setUser(response.user);
  }

  function clearAuth() {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
    setAccessToken(null);
    setUser(null);
  }

  // ─── Actions ───
  async function signup(data: SignupData) {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
    persistAuth(response);
  }

  async function login(data: LoginData) {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
    persistAuth(response);
  }

  function logout() {
    clearAuth();
    // TODO Phase 4.15: call backend to invalidate refresh token
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        isAuthenticated: !!user && !!accessToken,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth() — the hook every component uses to interact with auth state.
 *
 * Usage:
 *   const { user, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

// Re-export the error class so pages can catch it
export { ApiRequestError };