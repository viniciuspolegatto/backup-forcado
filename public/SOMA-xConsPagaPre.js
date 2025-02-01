const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');

const filtroArea = document.getElementById('filtroArea');
const filtroSubarea = document.getElementById('filtroSubarea');
const filtroSetor = document.getElementById('filtroSetor');
const filtroPublico = document.getElementById('filtroPublico');

document.addEventListener('DOMContentLoaded', buscarProdutos);

let produtosFiltrados = [];

async function buscarProdutos() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');
        
        const produtos = await res.json();
        produtosFiltrados = produtos.filter(produto => 
            produto.Modalidade === 'Presencial' &&
            produto.Pago === 'Sim' &&
            produto.Natureza === 'Consultoria' &&
            ![
                'EPP, ME', 'EPP, ME, MEI', 'EPP, ME, MEI, Potencial Empreendedor, Potencial Empresário, Produtor Rural',
                'EPP, ME, MEI, Potencial Empresário, Produtor Rural', 'EPP, ME, MEI, Potencial Empresário',
                'EPP, ME, MEI, Produtor Rural', 'EPP, ME, Potencial Empresário, Produtor Rural', 'EPP, ME, Potencial Empreendedor',
                'EPP, ME, Produtor Rural', 'ME', 'ME, MEI', 'ME, MEI, Potencial Empresário', 'ME, Produtor Rural',
                'MEI', 'MEI, Potencial Empreendedor, Potencial Empresário', 'Potencial Empreendedor',
                'Potencial Empreendedor, Potencial Empresário, Produtor Rural', 'Produtor Rural'
            ].includes(produto.PublicoAlvo) &&
            produto.Area !== 'Marketing e Vendas'
        );

        preencherFiltros(produtosFiltrados);
        exibirProdutosNaTela(produtosFiltrados);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function preencherFiltros(produtos) {
    const valoresUnicos = (chave) => [...new Set(produtos.map(p => p[chave]))].sort();

    const preencherSelect = (elemento, valores) => {
        valores.forEach(valor => {
            const option = document.createElement('option');
            option.value = valor;
            option.textContent = valor;
            elemento.appendChild(option);
        });
    };

    preencherSelect(filtroArea, valoresUnicos('Area'));
    preencherSelect(filtroSubarea, valoresUnicos('Subarea'));
    preencherSelect(filtroSetor, valoresUnicos('Setor'));
    preencherSelect(filtroPublico, valoresUnicos('PublicoAlvo'));

    filtroArea.addEventListener('change', filtrarProdutos);
    filtroSubarea.addEventListener('change', filtrarProdutos);
    filtroSetor.addEventListener('change', filtrarProdutos);
    filtroPublico.addEventListener('change', filtrarProdutos);
}

function filtrarProdutos() {
    const areaSelecionada = filtroArea.value;
    const subareaSelecionada = filtroSubarea.value;
    const setorSelecionado = filtroSetor.value;
    const publicoSelecionado = filtroPublico.value;

    const produtosFiltradosLocalmente = produtosFiltrados.filter(produto =>
        (areaSelecionada === '' || produto.Area === areaSelecionada) &&
        (subareaSelecionada === '' || produto.Subarea === subareaSelecionada) &&
        (setorSelecionado === '' || produto.Setor === setorSelecionado) &&
        (publicoSelecionado === '' || produto.PublicoAlvo === publicoSelecionado)
    );

    exibirProdutosNaTela(produtosFiltradosLocalmente);
}

function exibirProdutosNaTela(produtos) {
    tabelaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const custoCredenciado = Number(produto.Custo_Credenciado).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        const linha = `
            <tr>
                <td>${produto.EmpresasHabilitadas}</td>
                <td>${produto.Subarea}</td>
                <td>${produto.Area}</td>
                <td>
                    <a href="SOMA-detalhes.html?id=${produto.ID_Produto}" style="text-decoration: none; color: blue;">
                        ${produto.NomeProduto}
                    </a>
                </td>
                <td>${produto.Natureza}</td>
                <td>${produto.Modalidade}</td>
                <td>${produto.CargaHoraria}</td>
                <td>${produto.Setor}</td>
                <td>${produto.PublicoAlvo}</td>
                <td>${custoCredenciado}</td>
                <td>${produto.Pago}</td>
                <td>${produto.DescricaoProduto}</td>
            </tr>
        `;

        tabelaProdutos.innerHTML += linha;
    });
}
