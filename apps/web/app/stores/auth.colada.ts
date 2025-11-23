/**
 * Auth Store with Pinia Colada
 *
 * Uses Pinia Colada for async data management, caching, loading states, and retry logic.
 */

import { useQuery, useMutation } from '@pinia/colada'
import type { LoginRequest, RegisterRequest, User } from '~/types/auth'
import { useAuthStore } from './auth'

/**
 * Query for getting current user
 * Uses Pinia Colada for caching and loading states
 */
export function useCurrentUser() {
  const authStore = useAuthStore()

  return useQuery({
    key: ['auth', 'me'],
    query: async () => {
      const response = await useApi<User>('auth/me', {
        method: 'GET',
        headers: {
          Authorization: authStore.getAuthHeader() || '',
        },
      })
      // Update store with user data
      authStore.setUser(response)
      return response
    },
    enabled: () => authStore.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
  })
}

/**
 * Mutation for login
 * Uses Pinia Colada for loading states and error handling
 */
export function useLoginMutation() {
  const authStore = useAuthStore()

  return useMutation({
    mutation: async (credentials: LoginRequest) => {
      const response = await authStore.login(credentials)

      // Fetch user after successful login
      if (authStore.isAuthenticated) {
        try {
          const user = await useApi<User>('auth/me', {
            method: 'GET',
            headers: {
              Authorization: authStore.getAuthHeader() || '',
            },
          })
          authStore.setUser(user)
        }
        catch {
          // Continue even if user fetch fails
        }
      }

      return response
    },
    onSuccess: () => {
      // User query will automatically refetch when enabled
    },
  })
}

/**
 * Mutation for register
 * Uses Pinia Colada for loading states and error handling
 */
export function useRegisterMutation() {
  const authStore = useAuthStore()

  return useMutation({
    mutation: async (data: RegisterRequest) => {
      const response = await authStore.register(data)

      // Fetch user after successful register
      if (authStore.isAuthenticated) {
        try {
          const user = await useApi<User>('auth/me', {
            method: 'GET',
            headers: {
              Authorization: authStore.getAuthHeader() || '',
            },
          })
          authStore.setUser(user)
        }
        catch {
          // Continue even if user fetch fails
        }
      }

      return response
    },
    onSuccess: () => {
      // User query will automatically refetch when enabled
    },
  })
}

/**
 * Mutation for logout
 * Uses Pinia Colada for loading states
 */
export function useLogoutMutation() {
  const authStore = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutation: async () => {
      return await authStore.logout()
    },
    onSuccess: () => {
      // Invalidate auth queries
      // This will be handled automatically by Pinia Colada
      router.push('/auth/sign-in')
    },
  })
}

/**
 * Mutation for refresh token
 * Uses Pinia Colada for loading states and retry logic
 */
export function useRefreshTokenMutation() {
  const authStore = useAuthStore()

  return useMutation({
    mutation: async () => {
      return await authStore.refreshAccessToken()
    },
  })
}
