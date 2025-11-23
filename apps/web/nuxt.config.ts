import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  // Color Mode configuration
  colorMode: {
    preference: 'system', // 'light' | 'dark' | 'system'
    fallback: 'light',
    classSuffix: '',
  },

  runtimeConfig: {
    apiBase: process.env.API_BASE_URL!,
    public: {},
  },

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
