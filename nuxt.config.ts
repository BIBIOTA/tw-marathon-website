// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01',
  imports: {
    dirs: ['store'],
  },
})
