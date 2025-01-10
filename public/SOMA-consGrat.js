
document.addEventListener("DOMContentLoaded", function () {

let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/consultoriaSemCustoSOMA.json';
//let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetecAgro.json';
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



      // Monta a linha da tabela com os dados do produto
      elementoParaInserirProdutos.innerHTML += `
        <tr>
          <td style="border: 1px solid black; text-align: center; padding: 8px">${produtoUnico.EmpresasHabilitadas}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.Subarea}</td>
          <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.Area}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.NomeProduto}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.Modalidade}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.CargaHoraria}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.Setor}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.PublicoAlvo}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.Custo_Credenciado}</td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.DescricaoProduto}</td>
        </tr>
      `;
    });
  }
});
