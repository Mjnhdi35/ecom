/**
 * Guest Middleware
 *
 * Redirects authenticated users away from guest-only pages
 * (like sign-in and sign-up pages).
 */

export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = useIsAuthenticated()

  // If authenticated, redirect to home
  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
