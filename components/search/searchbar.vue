<template>
  <div class="my-2">
    <div class="searchBox">
      <div class="lg:border-r-2 lg:py-2">
        <Input />
      </div>
      <div class="lg:border-r-2 lg:py-2">
        <Checkbox :options="marathonOptions" :keyName="'distances'" />
      </div>
      <div class="lg:border-r-2 lg:py-2">
        <Checkbox :options="entryOptions" :keyName="'onlyRegistering'" />
      </div>
      <div class="lg:border-r-2 lg:py-2">
        <DatePicker />
      </div>
      <div>
        <SearchButton @search="search" />
      </div>
    </div>
    <div>
      <div class="mx-2 mb-2">
        <Table />
      </div>
    </div>
    <Modal />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from '@/store/main';
import { useMessage } from '@/store/message';
import { getEvents } from '@/apis/events';
import { SearchParamsDto } from '@/dtos/search-param-dto';
import { EventsResponseDto } from '@/dtos/events-response-dto';
import Input from './input.vue';
import Checkbox from './checkbox.vue';
import DatePicker from './date-picker.vue';
import SearchButton from './search-button.vue';
import Table from './table.vue';
import Modal from './modal.vue';

export default defineComponent({
  name: 'SearchBar',
  setup() {

    const marathonOptions = [
      { label: '全馬', value: 'MARATHON' },
      { label: '半馬', value: 'HALF_MARATHON' },
      { label: '10公里', value: 'TEN_K' },
    ];

    const entryOptions = [
      { label: '開放報名中', value: true },
    ];

    onMounted(async () => {
      await search();
    })

    const store = useStore();
    const messageStore = useMessage();

    async function search() {
      const {
        getKeywords,
        getDistances,
        getDateRange,
        getOnlyRegistering,
        setIsApiLoading,
        setTotalCount,
        setEvents
      } = store;

      const params: SearchParamsDto = {
        keywords: getKeywords,
        distances: getDistances,
        dateRange: getDateRange,
        onlyRegistering: getOnlyRegistering,
      }
      
      setIsApiLoading(true);
      getEvents(params).then((data: EventsResponseDto) => {
        setTotalCount(data.totalCount);
        setEvents(data.events);
      }).catch(() => {
        messageStore.error('發生例外錯誤，資料取得失敗');
      }).finally(() => {
        setIsApiLoading(false);
      });
    }

    return {
      entryOptions,
      marathonOptions,
      store,
      search,
    };
  },
  components: {
    Input,
    Checkbox,
    DatePicker,
    SearchButton,
    Table,
    Modal
},
});
</script>
<style scoped>
  div.searchBox {
    @apply flex flex-col justify-center items-center lg:flex-row;
  }
  div.searchBox div {
    @apply mx-2 mb-2 lg:mb-0;
  }
</style>