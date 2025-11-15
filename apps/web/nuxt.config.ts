// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
