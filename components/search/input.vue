<template>
  <div class="components-input">
    <a-input v-model:value="store.keywords" placeholder="關鍵字" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/main';

export default defineComponent({
  name: 'Input',
  setup() {
    const store = useStore()
    return {
      store,
    };
  },
});
</script>
<style scoped>
  .components-input .ant-input {
    width: 300px;
    margin: 0 8px 8px 0;
  }
</style>
  