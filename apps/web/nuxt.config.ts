import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },

  // Nuxt Image configuration
  // @see https://image.nuxt.com/getting-started/configuration
  image: {
    // Use ipx provider for static images in public folder
    provider: 'ipx',
    // Quality settings
    quality: 80,
    // Format settings - prefer modern formats
    format: ['webp', 'png', 'jpg'],
    // Presets for common image sizes
    presets: {
      logo: {
        modifiers: {
          format: 'png',
          quality: 90,
        },
      },
      error: {
        modifiers: {
          format: 'png',
          quality: 85,
        },
      },
    },
  },
})
