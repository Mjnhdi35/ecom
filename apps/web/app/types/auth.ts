/**
 * Authentication Types
 *
 * Type definitions for authentication requests and responses
 */

/**
 * Login Request
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * Register Request
 * Matches CreateUserDto from backend: displayName, email, password (min 6)
 */
export interface RegisterRequest {
  displayName: string
  email: string
  password: string
}

/**
 * Auth Response
 * Only contains tokens - user info is fetched separately via /auth/me
 */
export interface AuthResponse {
  accessToken: string
  refreshToken: string
}

/**
 * User Response
 * User information from /auth/me endpoint
 */
export interface User {
  id: string
  email: string
  displayName: string
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string
}
