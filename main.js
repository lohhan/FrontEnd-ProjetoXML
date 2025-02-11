const app = Vue.createApp({
  data() {
    return {
      isNotaVazia: false,
    };
  },
  methods: {
    alertaNotaVazia() {
      this.isNotaVazia = true;
    },
  },
});
