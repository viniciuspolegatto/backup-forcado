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
        produto.Modalidade === 'Presencial' &&
        produto.Pago === 'Não' &&
        produto.Natureza === 'Consultoria'
        // && produto.DescricaoProduto !== 'NaN'
    );

    produtosFiltrados.forEach(produto => {
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

