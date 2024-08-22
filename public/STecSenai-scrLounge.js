let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetec.json';

let elementoParaInserirProdutos = document.getElementById('tabela_produtos');

let produtos = [];

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
    elementoParaInserirProdutos.innerHTML += `
        <tr>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.familia}</td>
          <td style="border: 1px solid black; padding: 8px"><a href="https://datasebrae.com.br/wp-content/uploads/2020/04/Caderno-de-Tend%C3%AAncias-DS24003-3.pdf">Ficha - Caderno de Tendências</a></td>
          <td style="border: 1px solid black; padding: 8px">${produtoUnico.titulo}</td>
          <td style="border: 1px solid black; padding: 8px; text-align: center">ME / EPP</td>
        </tr>
    `;
  });
}

/* **********************************************************************
const fetch = require('node-fetch'); // Importa o módulo node-fetch apenas para rodar no desenvolvimento
let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiSebraetecSenaiSp/main/produtosSebraetec.json';
let produtos = [];

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
      console.log(produtos);
    }
  } catch (error) {
    // Trata qualquer erro que ocorra durante a execução
    console.error('Failed to fetch produtos:', error);
  }
}
********************************************************************* */