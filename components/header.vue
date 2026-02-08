<template>
  <header class="bg-primary py-4 px-6 mb-4 rounded-md">
    <div class="container mx-auto flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white cursor-pointer" @click="toIndex">
        台灣路跑賽事
      </h1>
      <span v-if="store.totalCount > 0" class="text-sm text-white/80">
        共 {{ store.totalCount }} 筆賽事
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = useStore()

function toIndex() {
  window.location.href = '/'
}
</script>
