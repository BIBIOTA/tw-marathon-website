<template>
  <Header />
  <SearchBar />
</template>
<script>
  import '@/assets/css/tailwind.css'
  import { defineComponent } from 'vue'
  import Header from '@/components/Header.vue'
  import SearchBar from '@/components/search/searchbar.vue'

  export default defineComponent({
    name: 'App',
    setup() {
      return {}
    },
    components: {
      Header,
      SearchBar
    },
  })
</script>
