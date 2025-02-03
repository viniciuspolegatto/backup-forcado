const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
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
    //const areas = [...new Set(produtos.map(p => p.Area).filter(area => area && area !== 'Educação' && area !== 'Desenvolvimento Territorial'))];
    const areas = [...new Set(produtos.map(p => p.Area).filter(area => area))];
    const setores = ['Todos', ...new Set(produtos.map(p => p.Setor).filter(setor => setor))];

    preencherDropdownAreas(areas);
    preencherSelect(filtroSetor, setores);
}

function preencherDropdownAreas(areas) {
    dropdownMenu.innerHTML = '';

    areas.forEach(area => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = area;
        checkbox.addEventListener('change', exibirProdutosNaTela);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + area));
        dropdownMenu.appendChild(label);
    });

    dropdownToggle.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

function preencherSelect(select, valores) {
    valores.forEach(valor => {
        const option = document.createElement('option');
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });
}

function getSelectedAreas() {
    return Array.from(dropdownMenu.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
}

function exibirProdutosNaTela() {
    tabelaProdutos.innerHTML = '';

    const selectedAreas = getSelectedAreas();
    const selectedSetor = filtroSetor.value;

    const produtosFiltrados = produtos.filter(produto =>
        produto.Modalidade === 'Presencial' &&
        produto.Pago === 'Não' &&
        produto.Natureza === 'Instrutoria / Oficina / Curso / Palestra' &&
        (selectedAreas.length === 0 || selectedAreas.includes(produto.Area)) &&
        (selectedSetor === 'Todos' || produto.Setor === selectedSetor)
    );

    // Ordena para que "xx" no campo EmpresasHabilitadas vá para o final
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
                    <a href="SOMA-detalhesInst.html?id=${produto.ID_Produto}" style="text-decoration: none; color: blue;">
                        ${produto.NomeProduto}
                    </a>
                </td>
                <td style="border: 1px solid black; padding: 8px">${produto.Natureza}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Modalidade}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.CargaHoraria}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Setor}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.PublicoAlvo}</td>
                <td style="border: 1px solid black; padding: 8px">${custoCredenciado}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.Aplicador}</td>
                <td style="border: 1px solid black; padding: 8px">${produto.DescricaoProduto}</td>
            </tr>
        `;
        tabelaProdutos.innerHTML += linha;
    });
}

// Adiciona o evento de mudança para os filtros
filtroSetor.addEventListener('change', exibirProdutosNaTela);
