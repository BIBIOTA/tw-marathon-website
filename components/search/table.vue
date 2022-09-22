<template>
  <a-table
    :pagination="pagination"
    :columns="columns"
    :data-source="data"
    @resizeColumn="handleResizeColumn"
    @change="change"
  >
    <template #headerCell="{ column }">
      <span>
        {{ column.title }}
      </span>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'distances'">
        <span>
          <a-tag
            v-for="(distance, i) in record.distances"
            :key="`distance_${i}`"
            :color="distance.color"
            class="my-1"
          >
            {{ distance.distance }}
          </a-tag>
        </span>
      </template>
      <template v-if="column.key === 'id'">
        <span>
          <a-button @click="openModal(record.id)" type="primary">更多</a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { PaginationConfig } from 'ant-design-vue/lib/pagination';
import { useStore } from '@/store/main';
import { EventTableDto } from '@/dtos/event-table-dto';

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const store = useStore();

    function resetPagination(pageSize: number): void {
      pagination.current = 1;
      pagination.pageSize = pageSize;
    }

    let data = ref<EventTableDto[]>([])
    watch(
      () => store.getEventsToTableData,
      (newEventsData) => {
        data.value = newEventsData;
        resetPagination(pagination.pageSize);
      }
    );

    const pagination = reactive<PaginationConfig>({
      current: 1,
      pageSize: 10,
    });

    const columns = ref<TableColumnsType>([
      {
        title: '舉辦日期',
        dataIndex: 'eventDate',
        key: 'eventDate',
        width: '10%',
      },
      {
        title: '起跑時間',
        dataIndex: 'eventTime',
        key: 'eventTime',
        width: '10%',
        responsive: ['md'],
      },
      {
        title: '賽事名稱',
        dataIndex: 'eventName',
        key: 'eventName',
        width: '20%',
      },
      {
        title: '舉辦地點',
        key: 'location',
        dataIndex: 'location',
        width: '20%',
        responsive: ['lg'],
      },
      {
        title: '賽事距離',
        key: 'distances',
        dataIndex: 'distances',
        width: '15%',
        responsive: ['sm'],
      },
      {
        title: '主辦單位',
        key: 'agent',
        dataIndex: 'agent',
        width: '15%',
        responsive: ['lg'],
      },
      {
        title: '報名日期',
        key: 'entryDateRage',
        dataIndex: 'entryDateRage',
        width: '15%',
        responsive: ['lg'],
      },
      {
        title: '更多',
        key: 'id',
        dataIndex: 'id',
        width: '10%',
        className: 'more',
      },
    ]);

    return {
      pagination,
      data,
      columns,
      handleResizeColumn: (w, col) => {
        col.width = w;
      },
      change: (data: PaginationConfig) => {
        pagination.current = data.current;
        pagination.pageSize = data.pageSize;
      },
      openModal: (id: number) => {
        store.setVisiableModal(true);
        store.setEventModal(store.events[id - 1]);
      },
    };
  },
});
</script>
