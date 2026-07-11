/**
 * Shared TypeScript types matching the backend's response shapes.
 * Keep these in sync with apps/api/src/auth/auth.service.ts
 */

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  avatarUrl: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}