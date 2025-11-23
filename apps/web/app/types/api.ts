/**
 * API Types
 *
 * Type definitions for API requests and responses
 */

/**
 * HTTP Method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * API Error Response
 */
export interface ApiError {
  statusCode?: number
  statusMessage?: string
  message?: string
  data?: unknown
}

/**
 * API Request Options
 */
export interface ApiRequestOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | null | undefined>
  immediate?: boolean
}

/**
 * API Response wrapper
 */
export type ApiResponse<T = unknown> = T

/**
 * Health Check Response
 */
export interface HealthCheckResponse {
  status: string
  timestamp: string
  service: string
}
