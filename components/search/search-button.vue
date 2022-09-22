<template>
  <a-button v-if="store.isApiLoading" type="primary" size="large" loading>Loading</a-button>
  <a-button v-else type="primary" size="large" @click="$emit('search')">
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
</template>
<script lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/main';

export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  components: {
    SearchOutlined,
  },
};
</script>
