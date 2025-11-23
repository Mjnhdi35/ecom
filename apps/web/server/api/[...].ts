/**
 * API Proxy Route
 *
 * Proxies all API requests from /api/* to the backend API server.
 * This allows the frontend to make requests to /api/* which will be
 * forwarded to the backend API server.
 *
 * IMPORTANT: The actual backend URL is only known to the Nitro server.
 * Client never sees or knows the backend URL - only relative paths are used.
 *
 * @see https://nitro.unjs.io/guide/routing
 */

interface ApiError {
  statusCode?: number
  statusMessage?: string
  data?: unknown
  message?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.apiBase as string | undefined

  if (!apiBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'API Base URL not configured',
    })
  }

  const pathParam = getRouterParam(event, '_')
  const path = Array.isArray(pathParam) ? pathParam.join('/') : pathParam || ''
  const query = getQuery(event)

  const baseUrl = apiBaseUrl.endsWith('/')
    ? apiBaseUrl.slice(0, -1)
    : apiBaseUrl

  const targetUrl = `${baseUrl}/${path}`

  // Build query string if there are query parameters
  const queryString = new URLSearchParams(
    query as Record<string, string>,
  ).toString()
  const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl

  const requestBody
    = event.method !== 'GET' && event.method !== 'HEAD'
      ? await readBody(event).catch(() => undefined)
      : undefined

  const forwardHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const authHeader = getHeader(event, 'authorization')
  if (authHeader) {
    forwardHeaders.Authorization = authHeader
  }

  try {
    const response = await $fetch(fullUrl, {
      method: event.method,
      headers: forwardHeaders,
      body: requestBody,
    })

    return response
  }
  catch (error) {
    const apiError = error as ApiError & {
      response?: {
        _data?: unknown
        status?: number
        statusText?: string
      }
      data?: unknown
      cause?: unknown
      status?: number
      statusText?: string
      message?: string
    }

    const errorData
      = apiError.data
        || (apiError.response?._data as unknown)
        || apiError.message
        || apiError.cause
        || 'Unknown error'

    throw createError({
      statusCode: apiError.statusCode || apiError.response?.status || 500,
      statusMessage:
        apiError.statusMessage
        || apiError.response?.statusText
        || apiError.statusText
        || 'API Error',
      data: errorData,
    })
  }
})
