/**
 * Auth Store
 *
 * Manages authentication state using Pinia with persistedstate
 * and Pinia Colada for async data management.
 */

import { defineStore } from 'pinia'
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '~/types/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // State
    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)

    // Getters
    const isAuthenticated = computed(() => !!accessToken.value)

    // Actions
    function setAuth(response: AuthResponse) {
      accessToken.value = response.accessToken
      refreshToken.value = response.refreshToken
    }

    function setUser(userData: User) {
      user.value = userData
    }

    function clearAuth() {
      user.value = null
      accessToken.value = null
      refreshToken.value = null
    }

    async function login(credentials: LoginRequest): Promise<AuthResponse> {
      try {
        const response = await useApi<AuthResponse>('auth/login', {
          method: 'POST',
          body: credentials,
        })

        setAuth(response)
        return response
      }
      catch (error) {
        clearAuth()
        throw error
      }
    }

    async function register(data: RegisterRequest): Promise<AuthResponse> {
      try {
        const response = await useApi<AuthResponse>('auth/register', {
          method: 'POST',
          body: data,
        })

        setAuth(response)
        return response
      }
      catch (error) {
        clearAuth()
        throw error
      }
    }

    async function logout(): Promise<void> {
      try {
        if (refreshToken.value) {
          await useApi('auth/logout', {
            method: 'POST',
            body: { refreshToken: refreshToken.value },
          })
        }
      }
      catch {
        // Logout error - silently fail
      }
      finally {
        clearAuth()
      }
    }

    async function refreshAccessToken(): Promise<string> {
      if (!refreshToken.value) {
        throw createError({
          statusCode: 401,
          statusMessage: 'No refresh token available',
        })
      }

      try {
        const response = await useApi<AuthResponse>('auth/refresh', {
          method: 'POST',
          body: { refreshToken: refreshToken.value },
        })

        setAuth(response)
        return response.accessToken
      }
      catch (error) {
        clearAuth()
        throw error
      }
    }

    function getAuthHeader(): string | null {
      return accessToken.value ? `Bearer ${accessToken.value}` : null
    }

    return {
      // State
      user: readonly(user),
      accessToken: readonly(accessToken),
      refreshToken: readonly(refreshToken),
      // Getters
      isAuthenticated,
      // Actions
      login,
      register,
      logout,
      refreshAccessToken,
      getAuthHeader,
      setAuth,
      setUser,
      clearAuth,
    }
  },
  {
    // Persist state to sessionStorage (client-side only)
    persist: {
      key: 'auth',
      storage: (() => {
        // Only use sessionStorage on client-side
        if (import.meta.client && typeof sessionStorage !== 'undefined') {
          return sessionStorage
        }
        // Return a no-op storage for server-side
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      })(),
    },
  },
)
