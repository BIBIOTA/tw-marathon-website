<template>
  <UInput v-model="store.keywords" placeholder="關鍵字" class="w-full lg:w-72" />
</template>

<script setup lang="ts">
const store = useStore()
</script>
