<template>
  <div class="my-2">
    <div class="searchBox">
      <div>
        <Input />
      </div>
      <div>
        <Checkbox />
      </div>
      <div>
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
        setIsApiLoading,
        setTotalCount,
        setEvents
      } = store;

      const params: SearchParamsDto = {
        keywords: getKeywords,
        distances: getDistances,
        dateRange: getDateRange,
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
    @apply mx-2 mb-5 lg:mb-2;
  }
</style>