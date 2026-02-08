<template>
  <UButton
    icon="i-lucide-search"
    size="lg"
    :loading="store.isApiLoading"
    @click="$emit('search')"
  >
    Search
  </UButton>
</template>

<script setup lang="ts">
defineEmits<{
  search: []
}>()

const store = useStore()
</script>
