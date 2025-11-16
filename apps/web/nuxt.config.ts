// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      pexelsApiKey: process.env.NUXT_PEXELS_API_KEY || '',
    },
  },

  compatibilityDate: '2025-07-15',

  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      {
        name: 'Poppins',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700'],
      },
    ],
  },
})
