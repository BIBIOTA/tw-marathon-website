<template>
  <a-checkbox-group v-model:value="store[keyName]" :options="options" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store/main';

export default defineComponent({
  name: 'Checkbox',
  props: {
    options: {
      type: Array,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
})
</script>