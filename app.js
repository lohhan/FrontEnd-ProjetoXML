const App = {
  template:
    /*html*/
    `
   <main>
      <div class="flex flex-col gap-8">
         <img class="max-w-32 self-center" src="assets/sieg-logo.png" alt="">
         <div class="text-center flex flex-col gap-2">
            <h1 class="text-blue2 font-bold text-5xl max-w-xl self-center">Carregue seus XMLs e Visualize Facilmente!</h1>
            <h3 class="text-blue2 font-semibold text-xl">Selecione uma pasta e veja seus arquivos XML organizados em segundos.</h3>
            <div class="flex flex-row justify-center gap-4">
               <Botao :canSelecionarArquivos="canSelecionarArquivos" :styles="'bg-blue1 hover:bg-blue3'">Selecionar Pasta de XMLs</Botao>

               <Botao :canDeletarArquivos="canDeletarArquivos" :nota="isNotaVazia" 
               :styles="'bg-red-600 hover:bg-red-700'">Deletar XMLs</Botao>
            
            </div>
            <Table @nota-vazia="alertaNotaVazia" />
         </div>
      </div>
   </main>
   `,
  data() {
    return {
      isNotaVazia: false,
      canSelecionarArquivos: true,
      canDeletarArquivos: true,
    };
  },
  methods: {
    alertaNotaVazia() {
      this.isNotaVazia = true;
    },
  },
};
