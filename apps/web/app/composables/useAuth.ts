/**
 * Authentication Composable
 *
 * Provides authentication functionality using Pinia store.
 * This is a wrapper around the Pinia auth store for backward compatibility.
 */

import type { AuthResponse, LoginRequest, RegisterRequest } from '~/types/auth'
import { useAuthStore } from '~/stores/auth'

/**
 * Check if user is authenticated
 */
export const useIsAuthenticated = () => {
  const authStore = useAuthStore()
  return computed(() => authStore.isAuthenticated)
}

/**
 * Get current user
 */
export const useUser = () => {
  const authStore = useAuthStore()
  return authStore.user
}

/**
 * Login user
 * Uses Pinia store for state management
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const authStore = useAuthStore()
  return await authStore.login(credentials)
}

/**
 * Register new user
 * Uses Pinia store for state management
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const authStore = useAuthStore()
  return await authStore.register(data)
}

/**
 * Logout user
 * Uses Pinia store for state management
 */
export async function logout(): Promise<void> {
  const authStore = useAuthStore()
  return await authStore.logout()
}

/**
 * Refresh access token
 * Uses Pinia store for state management
 */
export async function refreshAccessToken(): Promise<string> {
  const authStore = useAuthStore()
  return await authStore.refreshAccessToken()
}

/**
 * Initialize auth state
 * Pinia persistedstate plugin handles this automatically
 * This function is kept for backward compatibility but does nothing
 */
export function initAuth() {
  // Pinia persistedstate plugin automatically restores state from sessionStorage
  // No manual initialization needed
}

/**
 * Get authorization header
 * Uses Pinia store for state management
 */
export function getAuthHeader(): string | null {
  const authStore = useAuthStore()
  return authStore.getAuthHeader()
}
