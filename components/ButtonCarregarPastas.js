app.component("button-carregar-pasta", {
  /*html*/
  template: `
      <button @click="selecionarArquivo" class="bg-blue1 p-6 rounded-md text-white font-semibold my-4  hover:bg-blue3 duration-150 ease-in-out" >
         Selecionar Pasta de XMLs
      </button>
      <input @change="handleFileChange" ref="inputFile" class="hidden" type="file" multiple ></input>
      <ul>
         <li v-for="(file, index) in files" :key="index">{{file.path}}</li>
      </ul>
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
  },
});
