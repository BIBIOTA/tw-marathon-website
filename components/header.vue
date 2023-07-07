<template>
  <div
   style="background-color: #7dd3fc;" 
    class="lg:flex lg:justify-start lg:mb-2 mb-5 rounded-md">
    <div class="bg-blue-400 px-20 rounded-md py-5 cursor-pointer" @click="toIndex">
      <h1 class="lg:text-left text-center text-3xl font-bold text-indigo-50">
        台灣路跑賽事
      </h1>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    function toIndex() {
      window.location.href = '/';
    }

    return {
      toIndex,
    }
  },
})
</script>
