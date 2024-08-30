
document.addEventListener("DOMContentLoaded", function () {

let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetec.json';
let elementoParaInserirProdutos = document.getElementById('tabela_produtos');


// Chama a função diretamente
buscarProdutos();

async function buscarProdutos() {
  try {
    let res = await fetch(endpoint);
    if (!res.ok) {
      // Se a resposta não for bem-sucedida, lança um erro
      throw new Error('Network response was not ok');
    } else {
      // Se a resposta for bem-sucedida
      let produtos = await res.json();
      exibirProdutosNaTela(produtos);
    }
  } catch (error) {
    // Trata qualquer erro que ocorra durante a execução
    console.error('Failed to fetch produtos:', error);
  }
}

  

 function exibirProdutosNaTela(produtos) {
    produtos.forEach(produtoUnico => {
      // Verifica o códigoRm do produto atual
      let saldo;
      switch (produtoUnico.codigoRm) {
        case 42567:
          saldo = localStorage.getItem("total42567") || '';
          break;
        case 42568:
          saldo = localStorage.getItem("total42568") || '';
          break;
        case 40864:
          saldo = localStorage.getItem("total40864") || '';
          break;
        case 40865:
          saldo = localStorage.getItem("total40865") || '';
          break;
        case 40866:
          saldo = localStorage.getItem("total40866") || '';
          break;
        case 42569:
          saldo = localStorage.getItem("total42569") || '';
          break;
        default:
          saldo = '';
      }

      // Monta a linha da tabela com os dados do produto
      elementoParaInserirProdutos.innerHTML += `
        <tr>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.titulo}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px"><a href="${produtoUnico.linkFicha}">Ficha Técnica - link</a></td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.codigoRm}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.cargaHoraria}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.valorSTecSenai}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.publico}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.setorAtendido}</td>
          <td style="border: 1px solid black; padding: 8px">${saldo}</td>
        </tr>
      `;
    });
  }
});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
/*
function exibirProdutosNaTela(produtos) {
  produtos.forEach(produtoUnico => {
    elementoParaInserirProdutos.innerHTML += `
        <tr>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.titulo}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px"><a href="${produtoUnico.linkFicha}">Ficha Técnica - link</a></td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.codigoRm}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.cargaHoraria}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.valorSTecSenai}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.publico}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.setorAtendido}</td>
          <td style="border: 1px solid black; padding: 8px">${SE produtoUnico.codigoRm = 42567, trazer o valor saldo42567}</td>
        </tr>
    `;
  });
}
  

});





 *************************** FORMATO DA API ***********************************************
function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado
      const contador42567 = data.filter(
        (item) => item.servRMSenaiST === "42567"
      ).length;

      const contador42568 = data.filter(
        (item) => item.servRMSenaiST === "42568"
      ).length;

      const contador40864 = data.filter(
        (item) => item.servRMSenaiST === "40864"
      ).length;

      const contador40865 = data.filter(
        (item) => item.servRMSenaiST === "40865"
      ).length;

      const contador40866 = data.filter(
        (item) => item.servRMSenaiST === "40866"
      ).length;

      const contador42569 = data.filter(
        (item) => item.servRMSenaiST === "42569"
      ).length;

      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome42567").textContent = 40 - contador42567;
      document.querySelector("#contadorNome42568").textContent = 1 - contador42568;
      document.querySelector("#contadorNome40864").textContent = 10 - contador40864;
      document.querySelector("#contadorNome40865").textContent = 0 - contador40865;
      document.querySelector("#contadorNome40866").textContent = 10 - contador40866;
      document.querySelector("#contadorNome42569").textContent = 10 - contador42569;

      // Armazena em variáveis para uso posterior
      // Exemplo:
      // const total4722 = contador4722;
      // const total4727 = contador4727;
      // E assim por diante...

    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}

// Chama a função para carregar os dados ao iniciar a página
carregarDados();















"linkFicha": "https://datasebrae.com.br/wp-content/uploads/2020/09/Framework-OKR-para-Otimizac%CC%A7a%CC%83o-de-Processos-MMP14065-1.pdf",
"tagProduto": "Framework OKR para otimização de processo",
"familia": "SEBRAETEC - CONSULTORIA TECNOLÓGICA 4H - PRESENCIAL",
"titulo": "Sebraetec Senai - Framework OKR para otimização de processos",
"codigoRae": 4727,
"codigoRm": 42567,
"valorSTecSenai": 770.00,
"publico": "ME / EPP",
"setorAtendido": "Ind./Com./Serv.",
"cargaHoraria": 4,
"modalidade": "PRESENCIAL"
*/