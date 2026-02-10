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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  meta: [
    { property: 'og:image', content: 'https://marathontw-web.bibiota.com/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
  ],
})
</script>
