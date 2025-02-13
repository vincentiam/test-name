import { defineStore } from "pinia";

export const userData = defineStore("dialog", {
  state: () => ({
    userid: "",
  }),
  actions: {
    setId(item) {
      this.userid = item;
    },
  },
});