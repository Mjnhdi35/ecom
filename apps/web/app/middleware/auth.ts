/**
 * Authentication Middleware
 *
 * Protects routes that require authentication.
 * Redirects to sign-in page if user is not authenticated.
 */

export default defineNuxtRouteMiddleware((to) => {
  const isAuthenticated = useIsAuthenticated()

  // If not authenticated, redirect to sign-in
  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/sign-in',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
