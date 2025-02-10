app.component("table-section", {
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
         </tr>
      </thead>
      <tbody>
         <tr v-for="item in data">
            <td>{{item.tipoNota}}</td>
            <td>{{item.numeroNota}}</td>
            <td>{{item.chaveNota}}</td>
            <td>{{item.dataEmissao}}</td>
            <td>{{item.cnpj}}</td>
            <td>{{item.nome}}</td>
            <td>R$ {{item.valor}}</td>
            <button class="las la-eye border px-4 py-1 bg-blue2 rounded-md text-white"></button>
           <button @click="verificacaoDeletar" class="las la-trash px-4 py-1 bg-red-600 rounded-md text-white "></button>
         </tr>
      </tbody>
   </table>
  `,
  data() {
    return {
      data: [
        {
          tipoNota: "NFE",
          numeroNota: "1987",
          chaveNota: "213120312802",
          dataEmissao: "25/04/2005",
          cnpj: "3123291091/14",
          nome: "Lohhan Guilherme",
          valor: 20,
        },
        {
          tipoNota: "NFE",
          numeroNota: "1987",
          chaveNota: "213120312802",
          dataEmissao: "25/04/2005",
          cnpj: "3123291091/14",
          nome: "Lohhan Guilherme",
          valor: 20,
        },
      ],
    };
  },
  methods: {
    verificacaoDeletar() {
      alert("teste");
    },
  },
});
