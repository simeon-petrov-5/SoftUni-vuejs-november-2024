import { defineStore } from 'pinia';

export const useNameStore = defineStore('nameStore', {
  state: () => ({
    name: 'Simeon',
  }),
  actions: {
    changeName() {
      this.name = 'Something else';
    },
  },
});
