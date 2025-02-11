app.component("table-section", {
  /*html*/
  template: `
  <table id="myTable" class="display border-blue3">
      <thead class="text-blue1">
         <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Número</th>
            <th>Chave</th>
            <th>Data Emissão</th>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Visualizar</th>
            <th>Deletar</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>{{notaFiscalId}}</td>
            <td>teste</td>
            <td>teste</td>
            <td>teste</td>
            <td>teste</td>
            <td>teste</td>
            <td>teste</td>
            <td>teste</td>
            <td><button class="las la-eye border px-4 py-1 bg-blue2 rounded-md text-white"></button></td>
            <td><button @click="verificacaoDeletar(item.id)" class="las la-trash px-4 py-1 bg-red-600 rounded-md text-white "></button></td>
         </tr>
      </tbody>
   </table>
  `,
  data() {
    return {
      notas: [],
      notaFiscalId: "",
      url: "https://localhost:7119/NotasFiscais",
    };
  },
  mounted() {
    this.getNotas();
  },
  methods: {
    async getNotas() {
      await axios
        .get(this.url)
        .then((response) => {
          return response.data;
        })
        .then((responseData) => {
          this.notaFiscalId = responseData[0].notaFiscalId;
          console.log(this.notaFiscalId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
