<template>
  <Header />
  <SearchBar />
  <Footer />
</template>
<script>
  import '@/assets/css/tailwind.css'
  import { defineComponent } from 'vue'
  import Header from '@/components/header.vue'
  import SearchBar from '@/components/search/searchbar.vue'
  import Footer from './components/footer.vue'

  export default defineComponent({
    name: 'App',
    setup() {
      const name = '台灣路跑賽事查詢';
      const description = '簡易查詢近期台灣路跑賽事。';
      useHead({
        title: '台灣路跑賽事查詢',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        charset: 'utf-8',
        meta: [
          { name: 'title', content: name },
          { name: 'og:title', content: name },
          { name: 'og:site_name', content: name },
          { name: 'description', content: description },
          { name: 'og:description', content: description },
          { name: 'og:type', content: 'website' },
          { name: 'og:locale', content: 'zh-tw' },
          { name: 'og:site', content: 'https://marathontw-web.bibiota.com/' },
        ],
      })
      return {}
    },
    components: {
    Header,
    SearchBar,
    Footer
},
  })
</script>
