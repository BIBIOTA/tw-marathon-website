<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-1 container mx-auto px-4">
        <SearchSearchbar />
      </main>
      <Footer />
    </div>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  title: '台灣路跑賽事查詢',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: '簡易查詢近期台灣路跑賽事。' },
    { property: 'og:title', content: '台灣路跑賽事查詢' },
    { property: 'og:site_name', content: '台灣路跑賽事查詢' },
    { property: 'og:description', content: '簡易查詢近期台灣路跑賽事。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh-tw' },
    { property: 'og:site', content: 'https://marathontw-web.bibiota.com/' },
  ],
})
</script>
