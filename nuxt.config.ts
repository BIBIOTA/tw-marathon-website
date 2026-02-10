// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01',
  imports: {
    dirs: ['store'],
  },

  app: {
    htmlAttrs: { lang: 'zh-TW' },
    head: {
      link: [
        { rel: 'preconnect', href: 'https://marathontw.bibiota.com' },
      ],
    },
  },

  site: {
    url: 'https://marathontw-web.bibiota.com',
    name: '台灣路跑賽事查詢',
    description: '查詢台灣馬拉松、半馬、10K 路跑賽事，依日期、距離篩選，掌握最新報名資訊。',
    defaultLocale: 'zh-TW',
  },

  schemaOrg: {
    identity: {
      type: 'WebSite',
      name: '台灣路跑賽事查詢',
      url: 'https://marathontw-web.bibiota.com',
    },
  },

  nitro: {
    externals: {
      inline: ['unhead', '@unhead/vue', '@unhead/schema-org', '@unhead/addons'],
    },
  },
})
