<template>
  <a-checkbox-group v-model:value="store.distances" :options="options" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/main';

const options = [
  { label: '全馬', value: 'MARATHON' },
  { label: '半馬', value: 'HALF_MARATHON' },
  { label: '10公里', value: 'TEN_K' },
];

export default defineComponent({
  name: 'Checkbox',
  setup() {
    const store = useStore()
    return {
      options,
      store,
    }
  },
})
</script>