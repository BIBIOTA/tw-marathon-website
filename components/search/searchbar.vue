<template>
  <div class="my-4">
    <UCard>
      <!-- Mobile: collapsible search -->
      <div class="lg:hidden">
        <UCollapsible v-model:open="searchOpen">
          <UButton
            variant="ghost"
            block
            :icon="searchOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            trailing
          >
            搜尋條件
          </UButton>

          <template #content>
            <div class="flex flex-col gap-4 pt-3">
              <SearchInput />
              <SearchCheckbox :items="marathonOptions" keyName="distances" orientation="horizontal" size="xl" wrapperClass="text-base" fieldsetClass="justify-around w-full" />
              <div class="flex gap-2">
                <UButton
                  v-for="option in entryStatusOptions"
                  :key="option.value"
                  :label="option.label"
                  :variant="store.entryStatus === option.value ? 'solid' : 'outline'"
                  color="neutral"
                  size="md"
                  class="flex-1"
                  @click="store.entryStatus = option.value"
                />
              </div>
              <SearchDatePicker />
              <SearchButton @search="search" />
            </div>
          </template>
        </UCollapsible>
      </div>

      <!-- Desktop: inline search -->
      <div class="hidden lg:flex items-center gap-4">
        <SearchInput />
        <USeparator orientation="vertical" class="h-8" />
        <SearchCheckbox :items="marathonOptions" keyName="distances" orientation="horizontal" />
        <USeparator orientation="vertical" class="h-8" />
        <UFieldGroup>
          <UButton
            v-for="option in entryStatusOptions"
            :key="option.value"
            :label="option.label"
            :variant="store.entryStatus === option.value ? 'solid' : 'outline'"
            color="neutral"
            size="sm"
            @click="store.entryStatus = option.value"
          />
        </UFieldGroup>
        <USeparator orientation="vertical" class="h-8" />
        <SearchDatePicker />
        <SearchButton @search="search" />
      </div>
    </UCard>

    <!-- Loading skeleton -->
    <div v-if="store.isApiLoading" class="mt-4 space-y-3">
      <USkeleton v-for="i in 8" :key="i" class="h-12 w-full" />
    </div>

    <!-- Empty state -->
    <div v-else-if="!store.isApiLoading && store.events.length === 0 && hasSearched" class="mt-8 text-center text-muted py-12">
      <UIcon name="i-lucide-search-x" class="size-12 mx-auto mb-3 text-dimmed" />
      <p class="text-lg font-medium">沒有找到符合條件的賽事</p>
      <p class="text-sm text-dimmed mt-1">請嘗試調整搜尋條件</p>
    </div>

    <!-- Table -->
    <div v-else class="mt-4">
      <SearchTable />
    </div>

    <SearchModal />
  </div>
</template>

<script setup lang="ts">
import { getSearchParamsDtoFromUrlQuery, setEventToUrlQuery } from '@/libs/url'
import { getEvents } from '@/apis/events'
import type { SearchParamsDto } from '@/dtos/search-param-dto'
import type { EntryStatus } from '@/dtos/search-param-dto'
import type { EventsResponseDto } from '@/dtos/events-response-dto'

const entryStatusOptions: { label: string; value: EntryStatus }[] = [
  { label: '全部', value: 'all' },
  { label: '開放報名中', value: 'registering' },
  { label: '尚未截止', value: 'notEnded' },
]

const marathonOptions = [
  { label: '全馬', value: 'MARATHON' },
  { label: '半馬', value: 'HALF_MARATHON' },
  { label: '10公里', value: 'TEN_K' },
]

const store = useStore()
const searchOpen = ref(true)
const hasSearched = ref(false)

onMounted(async () => {
  store.setSearchParams(getSearchParamsDtoFromUrlQuery())
  await search()
})

function buildApiParams(): Record<string, unknown> {
  const params: Record<string, unknown> = {
    keywords: store.getKeywords,
    distances: store.getDistances,
    dateRange: store.getDateRange,
  }
  if (store.getEntryStatus === 'registering') {
    params.onlyRegistering = true
  } else if (store.getEntryStatus === 'notEnded') {
    params.entryIsEnd = false
  }
  return params
}

async function search() {
  const apiParams = buildApiParams()
  const urlParams: SearchParamsDto = {
    keywords: store.getKeywords,
    distances: store.getDistances,
    dateRange: store.getDateRange,
    entryStatus: store.getEntryStatus,
  }
  setEventToUrlQuery(urlParams)
  store.setIsApiLoading(true)
  try {
    const data: EventsResponseDto = await getEvents(apiParams)
    store.setTotalCount(data.totalCount)
    store.setEvents(data.events)
    hasSearched.value = true
  } catch {
    useToast().add({ title: '發生例外錯誤，資料取得失敗', color: 'error' })
  } finally {
    store.setIsApiLoading(false)
  }
}
</script>
