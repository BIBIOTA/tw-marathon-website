<template>
  <UPopover>
    <UButton variant="outline" icon="i-lucide-calendar">
      <span v-if="store.dateRange">
        {{ formatDate(store.dateRange[0]) }} ~ {{ formatDate(store.dateRange[1]) }}
      </span>
      <span v-else class="text-gray-400">搜尋日期範圍</span>
    </UButton>

    <template #content>
      <DatePicker
        v-model.range="dateRangeValue"
        :min-date="new Date()"
        :columns="isMobile ? 1 : 2"
      />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import dayjs from 'dayjs'

const store = useStore()

const windowWidth = ref(import.meta.client ? window.innerWidth : 1024)

if (import.meta.client) {
  onMounted(() => {
    const onResize = () => { windowWidth.value = window.innerWidth }
    window.addEventListener('resize', onResize)
    onUnmounted(() => window.removeEventListener('resize', onResize))
  })
}

const isMobile = computed(() => windowWidth.value < 1024)

const dateRangeValue = computed({
  get() {
    if (!store.dateRange) return null
    return {
      start: new Date(store.dateRange[0]),
      end: new Date(store.dateRange[1]),
    }
  },
  set(val: { start: Date; end: Date } | null) {
    if (val && val.start && val.end) {
      store.dateRange = [val.start, val.end]
    } else {
      store.dateRange = null
    }
  },
})

function formatDate(date: Date | string) {
  return dayjs(date).format('YYYY-MM-DD')
}
</script>
