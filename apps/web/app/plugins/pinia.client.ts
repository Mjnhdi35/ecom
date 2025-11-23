/**
 * Pinia Plugin Configuration
 *
 * Configures Pinia with persistedstate plugin for client-side persistence.
 * Note: @pinia/nuxt automatically creates and configures Pinia,
 * so we only need to add the persistedstate plugin.
 */

import { createPersistedState } from 'pinia-plugin-persistedstate'
import { usePinia } from '#imports'

export default defineNuxtPlugin(() => {
  const pinia = usePinia()

  pinia.use(
    createPersistedState({
      storage: (() => {
        if (import.meta.client && typeof sessionStorage !== 'undefined') {
          return sessionStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      })(),
      auto: false,
    }),
  )
})
