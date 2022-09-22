<template>
  <div>
    <a-modal v-model:visible="store.visibleModal" :title="getTitle()" :closable="false">
      <template #footer>
        <a-button key="submit" type="primary" @click="closeModal">關閉</a-button>
      </template>
      <table class="w-full">
        <tr>
          <td class="title">賽事資訊</td>
          <td class="content">{{ getEventData('eventInfo') }}</td>
        </tr>
        <tr>
          <td class="title">舉辦日期</td>
          <td class="content">{{ getEventData('eventDate') }}</td>
        </tr>
        <tr>
          <td class="title">起跑時間</td>
          <td class="content">{{ getEventData('eventTime') }}</td>
        </tr>
        <tr>
          <td class="title">舉辦地點</td>
          <td class="content">{{ getEventData('location') }}</td>
        </tr>
        <tr>
          <td class="title">賽事距離</td>
          <td class="content">
            <span v-if="store.eventModal && store.eventModal.distances.length > 0">
              <a-tag
                v-for="(distance, i) in getEventDistancesTags(store.eventModal.distances)"
                :key="`modal_tag${i}`"
                :color="distance.color"
                class="my-1"
              >
                {{ distance.distance }}
              </a-tag>
            </span>
          </td>
        </tr>
        <tr>
          <td class="title">主辦單位</td>
          <td class="content">{{ getEventData('agent') }}</td>
        </tr>
        <tr>
          <td class="title">報名日期</td>
          <td class="content" v-if="store.eventModal">{{ getEventEntryDateRange(store.eventModal.entryIsEnd, store.eventModal.entryStart, store.eventModal.entryEnd) }}</td>
        </tr>
        <tr>
          <td class="title">賽事認證</td>
          <td class="content">{{ getEventCertificate(store.eventModal) }}</td>
        </tr>
        <tr>
          <td class="title">報名連結</td>
          <td class="content">
            <div v-if="getEventData('eventLink')">
              <a :href="getEventData('eventLink')">
                {{ getEventData('eventLink') }}
              </a>
            </div>
            <div v-else>
              -
            </div>
          </td>
        </tr>
      </table>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/main';
import { getEventDistancesTags, getEventEntryDateRange, getEventCertificate } from '@/libs/event-helper';

export default defineComponent({
    name: "Modal",
    setup() {
        const store = useStore();
        const closeModal = () => {
            store.setVisiableModal(false);
            store.setEventModal(null);
        };
        const getTitle = () => {
            if (store.eventModal) {
                return store.eventModal.eventName;
            }
            return null;
        };
        const getEventData = (key : string) => {
            if (store.eventModal) {
                return store.eventModal[key] ?? '-';
            }
            return '-';
        };
        return {
            store,
            getTitle,
            getEventData,
            getEventEntryDateRange,
            getEventDistancesTags,
            getEventCertificate,
            closeModal,
        };
    },
});
</script>
<style scoped>
  table tr {
    @apply border-b-2 mb-4;
  }
  table tr td.title{
    @apply w-1/3 py-4;
  }
  table tr td.content{
    @apply w-2/3 py-4;
  }
  table tr td.content div {
    max-width: 200px;
  }
</style>