const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');

document.addEventListener('DOMContentLoaded', buscarProdutos);

async function buscarProdutos() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');
        
        const produtos = await res.json();
        exibirProdutosNaTela(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function exibirProdutosNaTela(produtos) {
    const produtosFiltrados = produtos.filter(produto => 
        produto.Modalidade === 'Hibrido' &&
        produto.Pago === 'Não' &&
        produto.Natureza === 'Consultoria' 
        //&& produto.EmpresasHabilitadas !== 'xx'
        && produto.Area !== 'Desenvolvimento Setorial'
        && produto.Area !== 'Desenvolvimento Territorial'
        && produto.Area !== 'Políticas Públicas'
        //&& produto.DescricaoProduto !== 'NaN'
    );

     // Classificar os itens: "xx" será movido para o final
    const produtosOrdenados = produtosFiltrados.sort((a, b) => {
        if (a.EmpresasHabilitadas === 'xx' && b.EmpresasHabilitadas !== 'xx') return 1;
        if (a.EmpresasHabilitadas !== 'xx' && b.EmpresasHabilitadas === 'xx') return -1;
        return 0;
    });

    produtosOrdenados.forEach(produto => {
        const custoCredenciado = Number(produto.Custo_Credenciado).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const linha = `
            <tr>
                <td style="border: 1px solid black; text-align: center; padding: 8px">${produto.EmpresasHabilitadas}</td>
                <td style="border: 1px solid black; text-align: left; padding: 8px">${produto.Subarea}</td>
                <td style="border: 1px solid black; text-align: left; padding: 8px">${produto.Area}</td>
                <td style="border: 1px solid black; padding: 8px">
                    <a href="SOMA-detalhes.html?id=${produto.ID_Produto}" style="text-decoration: none; color: blue;">
                        ${produto.NomeProduto}
                    </a>
                </td>
                <td style="border: 1px solid black; padding: 8px">${produto.Natureza}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Modalidade}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.CargaHoraria}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Setor}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.PublicoAlvo}</td>
                <td style="border: 1px solid black; padding: 8px">${custoCredenciado}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Pago}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.DescricaoProduto}</td>
            </tr>
        `;

        tabelaProdutos.innerHTML += linha;
    });
}








/* / Define o endpoint e o elemento para inserir os produtos
let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
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
  // Aplica os três filtros
  let produtosFiltrados = produtos.filter(produto => 
    produto.Modalidade === "Presencial"  // Apenas modalidade "Presencial"
    && produto.Pago === "Não"  // Descrição diferente de "NaN"
    && produto.Natureza === "Consultoria"  // Descrição diferente de "NaN"
    && produto.DescricaoProduto !== "NaN"  // Descrição diferente de "NaN"                                          
    // && produto.EmpresasHabilitadas !== "xx"  // EmpresasHabilitadas diferente de "xx"
  );

  produtosFiltrados.forEach(produtoUnico => {
    // Formata o valor de custo credenciado como moeda brasileira
    let custoCredenciadoFormatado = Number(produtoUnico.Custo_Credenciado).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    // Monta a linha da tabela com os dados do produto
    elementoParaInserirProdutos.innerHTML += `
      <tr>
        <td style="border: 1px solid black; text-align: center; padding: 8px">${produtoUnico.EmpresasHabilitadas}</td>
        <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.Subarea}</td>
        <td style="border: 1px solid black; text-align: left; padding: 8px">${produtoUnico.Area}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.NomeProduto}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.Natureza}</td>    
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.Modalidade}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.CargaHoraria}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.Setor}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.PublicoAlvo}</td>
        <td style="border: 1px solid black; padding: 8px">${custoCredenciadoFormatado}</td>
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.Pago}</td>        
        <td style="border: 1px solid black; padding: 8px">${produtoUnico.DescricaoProduto}</td>
      </tr>
    `;
  });
}




*******************************************************************************************
document.addEventListener("DOMContentLoaded", function () {
  let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/consultoriaSemCustoSOMA.json';
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
    // Aplica os três filtros
    let produtosFiltrados = produtos.filter(produto => 
      produto.Modalidade === "Presencial" && // Apenas modalidade "Presencial"
      produto.DescricaoProduto !== "NaN" && // Descrição diferente de "NaN"
      produto.EmpresasHabilitadas !== "xx"  // EmpresasHabilitadas diferente de "xx"
    );

    produtosFiltrados.forEach(produtoUnico => {
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




----------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

let endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/consultoriaSemCustoSOMA.json';
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
*/