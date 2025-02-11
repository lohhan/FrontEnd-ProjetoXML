app.component("button-deletar-itens", {
  /*html*/
  props: {
    nota: {
      type: Boolean,
      required: true,
    },
  },
  template: `
   <button :class="{hidden: nota}" @click="deletarItens" class="bg-red-600 p-6 rounded-md text-white font-semibold my-4 max-w-96 self-center hover:bg-red-700 duration-150 ease-in-out" >
      Deletar XMLs
   </button>
`,
  data() {
    return {
      url: "https://localhost:7119/NotasFiscais",
    };
  },
  methods: {
    deletarItens() {
      try {
        const response = confirm(
          "Todos os items serão deletados. Você tem certeza que deseja realizar esta ação?"
        );
        if (response) {
          const deletar = axios.delete(this.url);
          alert("Items deletados");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
