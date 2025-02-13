const Table = {
  /*html*/
  template: `
  <table id="myTable" class="display border-blue3">
      <thead class="text-blue1">
         <tr>
            <th>Tipo</th>
            <th>Número</th>
            <th>Chave</th>
            <th>Data Emissão</th>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Excluir</th>
         </tr>
      </thead>
      <tbody>
      </tbody>
   </table>
  `,
  data() {
    return {
      table: null,
      notas: [],
      url: "https://localhost:7119/NotasFiscais",
    };
  },
  mounted() {
    this.table = new DataTable("myTable");
    this.getNotas();
  },
  methods: {
    async getNotas() {
      try {
        const response = await axios
          .get(this.url)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });

        this.notas = response;
        this.verificarTamanhoLista();

        $("#myTable").DataTable({
          data: this.notas,
          columns: [
            { data: "tipoDaNota" },
            { data: "numeroDaNota" },
            { data: "chaveDaNota" },
            { data: "dataEmissao" },
            { data: "cnpjEmit" },
            { data: "nomeEmit" },
            { data: "valorNota" },
            {
              data: "notaFiscalId",
              title: "Excluir",
              render: () => {
                return '<button class="las la-trash text-red-600 font-md"></button>';
              },
            },
            {
              data: "notaFiscalId",
              title: "Baixar",
              render: () => {
                return '<button class="las la-arrow-circle-down"></button>';
              },
            },
          ],
          columnDefs: [
            {
              targets: 3,
              createdCell: (td, cellData, rowData, row, col) => {
                const [date] = cellData.split("T");
                $(td).text(date);
              },
            },
            {
              targets: 4,
              createdCell: (td, cellData, rowData, row, col) => {
                const maskedValue = cellData
                  .replace(/D/g, "")
                  .replace(
                    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
                    "$1.$2.$3/$4/$5"
                  );
                $(td).text(maskedValue);
              },
            },
            {
              targets: 6,
              createdCell: (td, cellData, rowData, row, col) => {
                $(td).text(`R$${cellData}`);
              },
            },
            {
              targets: 7,
              createdCell: (td, cellData, rowData, row, col) => {
                $(td).on("click", () => this.excluirNota(cellData));
              },
            },
            {
              targets: 8,
              createdCell: (td, cellData, rowData, row, col) => {
                $(td).on("click", () => this.downloadNota(cellData));
              },
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },
    async excluirNota(id) {
      const response = confirm(
        `O item de id: ${id} será deletado e essa ação é irreversível. Você tem certeza que deseja realizar esta ação?`
      );
      if (response) {
        await axios.delete(`${this.url}/${id}`);
        alert("Item deletado com sucesso!");
        window.location.reload();
      }
    },
    async downloadNota(id) {
      try {
        const response = await axios.get(`${this.url}/download/${id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "application/xml" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nota_fiscal${id}.xml`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (e) {
        console.error("Erro ao tentar baixar o arquivo!", error);
      }
    },
    verificarTamanhoLista() {
      if (this.notas.length <= 0) {
        this.$emit("nota-vazia");
      }
    },
  },
};
