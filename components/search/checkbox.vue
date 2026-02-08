<template>
  <UCheckboxGroup
    v-model="store[keyName]"
    :items="items"
    :orientation="orientation"
  />
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; value: string | boolean }[]
  keyName: string
  orientation?: 'horizontal' | 'vertical'
}>()

const store = useStore()
</script>
