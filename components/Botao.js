const Botao = {
  props: {
    styles: {
      type: String,
      required: true,
    },
    nota: {
      type: Boolean,
    },
    canSelecionarArquivos: {
      type: Boolean,
    },
    canDeletarArquivos: {
      type: Boolean,
    },
  },
  template:
    /*html*/
    `
      <button @click="verificarAcao" :class="[styles, {hidden: nota}]" class="p-6 rounded-md text-white font-semibold my-4 duration-150 ease-in-out">
         <slot></slot>      
      </button>
      <div v-if="canSelecionarArquivos">
         <input @change="handleFileChange" ref="inputFile" class="hidden" type="file" multiple ></input>
         <ul>
            <li v-for="(file, index) in files" :key="index">{{file.path}}</li>
         </ul>
      </div>
      
   `,
  data() {
    return {
      formData: null,
      url: "https://localhost:7119/NotasFiscais",
    };
  },
  methods: {
    selecionarArquivo() {
      this.$refs.inputFile.click();
    },
    handleFileChange(e) {
      this.formData = new FormData();
      const fileList = e.target.files;

      for (let i = 0; i < fileList.length; i++) {
        this.formData.append("files", fileList[i]);
      }
      this.submitData(this.formData);
    },
    async submitData(data) {
      try {
        await axios.post(this.url, data);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
    deletarItens() {
      try {
        const response = confirm(
          "Todos os items serão deletados. Você tem certeza que deseja realizar esta ação?"
        );
        if (response) {
          axios.delete(this.url);
          alert("Items deletados");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    verificarAcao() {
      if (this.canSelecionarArquivos) {
        this.selecionarArquivo();
      }
      if (this.canDeletarArquivos) {
        this.deletarItens();
      }
    },
  },
};
