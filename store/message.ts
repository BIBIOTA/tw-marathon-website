import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

export const useMessage = defineStore('Message', {
  state: () => ({
    message: null,
    type: null,
  }),
  getters: {},
  actions: {
    resetShowMessage() {
      this.type = null;
      this.message = null;
    },
    success (text: string) {
      message.success(text);
      setTimeout(() => {
        this.resetShowMessage();
      }, 3000);
    },
    error (text: string) {
      message.error(text);
      setTimeout(() => {
        this.resetShowMessage();
      }, 3000);
    },
    warning (text: string) {
      message.warning(text);
      setTimeout(() => {
        this.resetShowMessage();
      }, 3000);
    },
  },
})
