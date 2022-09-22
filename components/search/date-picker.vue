<template>
  <a-space direction="vertical" :size="12">
    <a-range-picker v-model:value="store.dateRange" format="YYYY-MM-DD" :placeholder="['搜尋日期起', '搜尋日期起']"       :disabled-date="disabledDate"
    />
  </a-space>
</template>
<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from '@/store/main';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DatePicker',
  setup() {
    const store = useStore()

    const disabledDate = (current: Dayjs): boolean => {
      return current.diff(dayjs(), 'day') < 0;
    };

    return {
      store,
      disabledDate,
    };
  },
});
</script>
<style>
  @media (max-width: 1024px) {
    .ant-picker-panel-container .ant-picker-panels {
      flex-direction: column !important;
    }
  }
</style>