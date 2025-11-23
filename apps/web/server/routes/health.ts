/**
 * Health Check Route
 *
 * Simple health check endpoint for the Nuxt server
 */

export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'nuxt-web',
  }
})
