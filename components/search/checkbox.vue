<template>
  <UCheckboxGroup
    v-model="store[keyName]"
    :items="items"
    :orientation="orientation"
    :size="size"
    :class="wrapperClass"
    :ui="{ fieldset: fieldsetClass }"
  />
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; value: string | boolean }[]
  keyName: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wrapperClass?: string
  fieldsetClass?: string
}>()

const store = useStore()
</script>
