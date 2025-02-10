app.component("button-carregar-pasta", {
  /*html*/
  template: `
      <button @click="selecionarArquivo" class="bg-blue1 p-6 rounded-md text-white font-semibold my-4 max-w-96 self-center hover:bg-blue3 duration-150 ease-in-out" >
         Selecionar Pasta de XMLs
      </button>
      <input @change="handleFileChange" ref="inputFile" class="hidden" type="file" multiple webkitdirectory></input>
      <ul>
         <li v-for="(file, index) in files" :key="index">{{file.path}}</li>
      </ul>
   `,
  data() {
    return {
      files: [],
    };
  },
  methods: {
    selecionarArquivo() {
      this.$refs.inputFile.click();
    },
    handleFileChange(e) {
      const fileList = e.target.files;
      this.files = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        this.files.push({
          name: file.name,
          path: file.webkitRelativePath,
        });
      }
    },
  },
});
