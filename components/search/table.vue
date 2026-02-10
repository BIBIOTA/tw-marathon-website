<template>
  <UTable
    ref="tableRef"
    v-model:pagination="pagination"
    :data="data"
    :columns="columns"
    :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
    class="w-full [&_table]:table-fixed [&_table]:w-full [&>div]:!overflow-x-clip"
  >
    <template #eventName-cell="{ row }">
      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide lg:overflow-hidden lg:text-ellipsis">
        {{ row.original.eventName }}
      </div>
    </template>

    <template #eventDate-cell="{ row }">
      <span class="whitespace-nowrap">{{ row.original.eventDate }}</span>
    </template>

    <template #distances-cell="{ row }">
      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="(distance, i) in row.original.distances"
          :key="`distance_${i}`"
          :color="getBadgeColor(distance.color)"
          variant="subtle"
          size="sm"
        >
          {{ distance.distance }}
        </UBadge>
      </div>
    </template>

    <template #entryDateRange-cell="{ row }">
      <UBadge
        v-if="isEntryEnded(row.original.id)"
        color="neutral"
        variant="subtle"
        size="sm"
      >
        已截止
      </UBadge>
      <span v-else class="text-sm">{{ row.original.entryDateRange || '-' }}</span>
    </template>

    <template #id-cell="{ row }">
      <UButton
        icon="i-lucide-eye"
        size="xs"
        variant="ghost"
        color="neutral"
        @click="openModal(row.original.id)"
      />
    </template>
  </UTable>

  <div v-if="data.length > 0" class="flex justify-center mt-4">
    <UPagination
      :page="(pagination.pageIndex ?? 0) + 1"
      :total="data.length"
      :items-per-page="pagination.pageSize"
      @update:page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { EventTableDto } from '@/dtos/event-table-dto'
import { getBadgeColor } from '@/libs/event-helper'

const store = useStore()

const data = computed<EventTableDto[]>(() => store.getEventsToTableData)

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

watch(data, () => {
  pagination.value.pageIndex = 0
})

const columns: TableColumn<EventTableDto>[] = [
  {
    accessorKey: 'eventDate',
    header: '舉辦日期',
    meta: { class: { td: 'whitespace-nowrap w-24 lg:w-28', th: 'whitespace-nowrap w-24 lg:w-28' } },
  },
  {
    accessorKey: 'eventTime',
    header: '起跑時間',
    meta: { class: { td: 'hidden md:table-cell md:w-24', th: 'hidden md:table-cell md:w-24 whitespace-nowrap' } },
  },
  {
    accessorKey: 'eventName',
    header: '賽事名稱',
    meta: { class: { td: 'max-w-0' } },
  },
  {
    accessorKey: 'location',
    header: '舉辦地點',
    meta: { class: { td: 'hidden lg:table-cell truncate', th: 'hidden lg:table-cell' } },
  },
  {
    accessorKey: 'distances',
    header: '賽事距離',
    meta: { class: { td: 'hidden sm:table-cell sm:w-24 lg:w-28', th: 'hidden sm:table-cell sm:w-24 lg:w-28' } },
  },
  {
    accessorKey: 'agent',
    header: '主辦單位',
    meta: { class: { td: 'hidden lg:table-cell truncate', th: 'hidden lg:table-cell' } },
  },
  {
    accessorKey: 'entryDateRange',
    header: '報名狀態',
    meta: { class: { td: 'hidden lg:table-cell lg:w-44', th: 'hidden lg:table-cell lg:w-44' } },
  },
  {
    accessorKey: 'id',
    header: '',
    meta: { class: { th: 'w-10', td: 'w-10' } },
  },
]

function onPageChange(p: number) {
  pagination.value = { ...pagination.value, pageIndex: p - 1 }
}

function isEntryEnded(id: number) {
  const event = store.events.find(e => e.id === id)
  return event?.entryIsEnd
}

function openModal(id: number) {
  const event = store.events.find(e => e.id === id)
  if (!event) return
  store.setVisiableModal(true)
  store.setEventModal(event)
}
</script>
