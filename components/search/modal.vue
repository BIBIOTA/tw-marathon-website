<template>
  <UModal v-model:open="isOpen" :title="getTitle()">
    <template #body>
      <div class="divide-y divide-default">
        <div
          v-for="field in visibleFields"
          :key="field.key"
          class="flex py-3"
        >
          <div class="w-1/3 text-sm font-medium text-muted shrink-0">{{ field.label }}</div>
          <div class="w-2/3 text-sm">
            <template v-if="field.key === 'distances'">
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="(distance, i) in getEventDistancesTags(store.eventModal!.distances)"
                  :key="`modal_tag${i}`"
                  :color="getBadgeColor(distance.color)"
                  variant="subtle"
                  size="sm"
                >
                  {{ distance.distance }}
                </UBadge>
              </div>
            </template>
            <template v-else-if="field.key === 'eventLink'">
              <UButton
                :to="getEventData('eventLink')"
                target="_blank"
                variant="link"
                size="sm"
                icon="i-lucide-external-link"
                trailing
              >
                前往報名
              </UButton>
            </template>
            <template v-else-if="field.key === 'entryDateRange'">
              <UBadge v-if="store.eventModal?.entryIsEnd" color="neutral" variant="subtle" size="sm">已截止</UBadge>
              <span v-else>{{ getEventEntryDateRange(store.eventModal!.entryIsEnd, store.eventModal!.entryStartDate, store.eventModal!.entryEndDate) }}</span>
            </template>
            <template v-else-if="field.key === 'eventCertificate'">
              {{ getEventCertificate(store.eventModal) }}
            </template>
            <template v-else>
              {{ getEventData(field.key) }}
            </template>
          </div>
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <UButton label="關閉" variant="outline" class="ml-auto" @click="close" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { getEventDistancesTags, getEventEntryDateRange, getEventCertificate, getBadgeColor } from '@/libs/event-helper'

const store = useStore()

const isOpen = computed({
  get: () => store.visibleModal,
  set: (val: boolean) => {
    store.setVisiableModal(val)
    if (!val) store.setEventModal(null)
  },
})

const fields = [
  { key: 'eventInfo', label: '賽事資訊' },
  { key: 'eventDate', label: '舉辦日期' },
  { key: 'eventTime', label: '起跑時間' },
  { key: 'location', label: '舉辦地點' },
  { key: 'distances', label: '賽事距離' },
  { key: 'agent', label: '主辦單位' },
  { key: 'entryDateRange', label: '報名日期' },
  { key: 'eventCertificate', label: '賽事認證' },
  { key: 'eventLink', label: '報名連結' },
]

const visibleFields = computed(() => {
  if (!store.eventModal) return []
  return fields.filter(field => {
    if (field.key === 'distances') return store.eventModal!.distances?.length > 0
    if (field.key === 'eventLink') return !!store.eventModal!.eventLink
    if (field.key === 'eventCertificate') {
      const cert = getEventCertificate(store.eventModal)
      return cert && cert !== '-'
    }
    if (field.key === 'entryDateRange') return true
    const val = getEventData(field.key)
    return val && val !== '-'
  })
})

function getTitle() {
  return store.eventModal?.eventName ?? ''
}

function getEventData(key: string) {
  return store.eventModal?.[key] ?? '-'
}
</script>
