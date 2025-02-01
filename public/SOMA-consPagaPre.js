const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');
const filtroArea = document.getElementById('filtroArea');
const filtroSetor = document.getElementById('filtroSetor');
let produtos = [];

document.addEventListener('DOMContentLoaded', buscarProdutos);

async function buscarProdutos() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');
        
        produtos = await res.json();
        preencherFiltros(produtos);
        exibirProdutosNaTela();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function preencherFiltros(produtos) {
    // Filtra as áreas para excluir "Educação" e "Desenvolvimento Territorial" e adiciona "Todos"
    const areas = ['Todos', ...new Set(produtos.map(p => p.Area).filter(area => area && area !== 'Educação' && area !== 'Desenvolvimento Territorial'))];
    const setores = ['Todos', ...new Set(produtos.map(p => p.Setor).filter(setor => setor))];

    preencherSelect(filtroArea, areas);
    preencherSelect(filtroSetor, setores);
}

function preencherSelect(select, valores) {
    valores.forEach(valor => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });
}

function exibirProdutosNaTela() {
    tabelaProdutos.innerHTML = '';
    const produtosFiltrados = produtos.filter(produto => 
        produto.Modalidade === 'Presencial' &&
        produto.Pago === 'Sim' &&
        produto.Natureza === 'Consultoria' &&
        produto.Area !== 'Desenvolvimento Setorial' &&
        produto.Area !== 'Desenvolvimento Territorial' &&
        // Filtragem por Área
        (filtroArea.value === 'Todos' || produto.Area === filtroArea.value) &&
        // Filtragem por Setor
        (filtroSetor.value === 'Todos' || produto.Setor === filtroSetor.value)
    );

    const produtosOrdenados = produtosFiltrados.sort((a, b) => {
        if (a.EmpresasHabilitadas === 'xx' && b.EmpresasHabilitadas !== 'xx') return 1;
        if (a.EmpresasHabilitadas !== 'xx' && b.EmpresasHabilitadas === 'xx') return -1;
        return 0;
    });

    produtosOrdenados.forEach(produto => {
        const custoCredenciado = Number(produto.Soma_Precificacao).toLocaleString('pt-BR', {
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

// Adiciona o evento de mudança para os filtros
[filtroArea, filtroSetor].forEach(filtro => {
    filtro.addEventListener('change', exibirProdutosNaTela);
});
