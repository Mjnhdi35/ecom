/**
 * API Composable
 *
 * Provides a typed way to make API requests through the proxy.
 * All requests to /api/* will be proxied to the backend API server.
 * Client never knows the actual backend URL - only Nitro server does.
 *
 * @example
 * ```ts
 * // Eager fetch (auto-fetches on mount)
 * const { data, error, pending } = await useApiFetch('/users')
 *
 * // Lazy fetch (manual trigger)
 * const { data, error, pending, execute } = await useApiLazy('/users')
 * ```
 */

import type { ApiRequestOptions, ApiResponse } from '~/types/api'
import { useAuthStore } from '~/stores/auth'

/**
 * Get authorization header from Pinia store
 */
function getAuthHeader(): string | null {
  if (import.meta.server) {
    return null
  }

  try {
    const authStore = useAuthStore()
    return authStore.getAuthHeader()
  }
  catch {
    // Fallback to sessionStorage if store not available (client-side only)
    if (
      typeof window !== 'undefined'
      && typeof sessionStorage !== 'undefined'
    ) {
      const token = sessionStorage.getItem('auth')
      if (token) {
        try {
          const auth = JSON.parse(token)
          return auth.accessToken ? `Bearer ${auth.accessToken}` : null
        }
        catch {
          return null
        }
      }
    }
    return null
  }
}

/**
 * Make an API request through the proxy
 * Client only uses relative paths - backend URL is hidden
 *
 * @param path - API path (without /api prefix)
 * @param options - Request options
 * @returns Promise with response data
 */
export async function useApi<T = ApiResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, headers = {}, query } = options

  // Build relative URL path (client never knows actual backend URL)
  // Remove leading slash if present
  const apiPath = path.startsWith('/') ? path.slice(1) : path
  const url = `/api/${apiPath}`

  const authHeader = getAuthHeader()

  try {
    // Use $fetch which will automatically go through Nitro proxy for relative URLs
    // In client-side, relative URLs will be proxied by Nitro server
    const response = await $fetch<ApiResponse>(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      query: query as Record<string, string>,
      // Ensure request goes through Nitro proxy
      baseURL: import.meta.server ? undefined : '',
    })

    return response as T
  }
  catch (error) {
    // Re-throw with better error handling
    const apiError = error as {
      statusCode?: number
      statusMessage?: string
      data?: unknown
      message?: string
    }

    throw createError({
      statusCode: apiError.statusCode || 500,
      statusMessage: apiError.statusMessage || 'API Request Failed',
      data: apiError.data || apiError.message,
    })
  }
}

/**
 * Reactive API fetch using useFetch (eager - auto-fetches on mount)
 * Client only uses relative paths - backend URL is hidden
 *
 * @param path - API path (without /api prefix)
 * @param options - Request options
 * @returns Reactive fetch result
 */
export function useApiFetch<T = ApiResponse>(
  path: string,
  options: ApiRequestOptions = {},
) {
  const {
    method = 'GET',
    body,
    headers = {},
    query,
    immediate = true,
  } = options

  // Build relative URL (client never knows actual backend URL)
  const apiPath = path.startsWith('/') ? path.slice(1) : path
  const url = `/api/${apiPath}`

  // Build base fetch options
  // useFetch has complex typing, so we use type assertion
  const baseOptions = {
    body: body as string | FormData | undefined,
    headers,
    query,
    immediate,
  }

  // useFetch has complex method typing, so we conditionally add it
  if (method === 'GET') {
    return useFetch<T>(url, baseOptions as Parameters<typeof useFetch<T>>[1])
  }

  // For non-GET methods, add method with type assertion
  return useFetch<T>(url, {
    ...baseOptions,
    method: method.toLowerCase() as 'post' | 'put' | 'patch' | 'delete',
  } as Parameters<typeof useFetch<T>>[1])
}

/**
 * Lazy API fetch using useLazyFetch (manual trigger)
 * Client only uses relative paths - backend URL is hidden
 * Does not fetch automatically - must call execute() to fetch
 *
 * @param path - API path (without /api prefix) or function returning path
 * @param options - Request options
 * @returns Reactive lazy fetch result with execute function
 */
export function useApiLazy<T = ApiResponse>(
  path: string | (() => string),
  options: Omit<ApiRequestOptions, 'immediate'> = {},
) {
  const { method = 'GET', body, headers = {}, query } = options

  // Build relative URL (client never knows actual backend URL)
  const url = computed(() => {
    const pathValue = typeof path === 'function' ? path() : path
    const apiPath = pathValue.startsWith('/') ? pathValue.slice(1) : pathValue
    return `/api/${apiPath}`
  })

  // Build base fetch options
  // useLazyFetch has complex typing, so we use type assertion
  const baseOptions = {
    body: body as string | FormData | undefined,
    headers,
    query,
  }

  // useLazyFetch has complex method typing, so we conditionally add it
  if (method === 'GET') {
    return useLazyFetch<T>(
      url,
      baseOptions as Parameters<typeof useLazyFetch<T>>[1],
    )
  }

  // For non-GET methods, add method with type assertion
  return useLazyFetch<T>(url, {
    ...baseOptions,
    method: method.toLowerCase() as 'post' | 'put' | 'patch' | 'delete',
  } as Parameters<typeof useLazyFetch<T>>[1])
}

/**
 * API client with common methods
 */
export const api = {
  /**
   * GET request
   */
  get: <T = ApiResponse>(
    path: string,
    query?: Record<string, string | number | boolean | null | undefined>,
  ) => useApi<T>(path, { method: 'GET', query }),

  /**
   * POST request
   */
  post: <T = ApiResponse>(path: string, body?: unknown) =>
    useApi<T>(path, { method: 'POST', body }),

  /**
   * PUT request
   */
  put: <T = ApiResponse>(path: string, body?: unknown) =>
    useApi<T>(path, { method: 'PUT', body }),

  /**
   * PATCH request
   */
  patch: <T = ApiResponse>(path: string, body?: unknown) =>
    useApi<T>(path, { method: 'PATCH', body }),

  /**
   * DELETE request
   */
  delete: <T = ApiResponse>(path: string) =>
    useApi<T>(path, { method: 'DELETE' }),
}
