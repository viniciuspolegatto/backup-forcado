const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const tabelaProdutos = document.getElementById('tabela_produtos').querySelector('tbody');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownToggleSetor = document.getElementById('dropdownToggleSetor');
const dropdownMenuSetor = document.getElementById('dropdownMenuSetor');
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
    const areas = [...new Set(produtos.map(p => p.Area).filter(area => area && area !== 'Educação' && area !== 'Desenvolvimento Territorial'))];
    const setores = [...new Set(produtos.map(p => p.PublicoAlvo).filter(setor => setor))];

    preencherDropdownAreas(areas);
    preencherDropdownSetores(setores);
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

function preencherDropdownSetores(setores) {
    dropdownMenuSetor.innerHTML = '';
    
    setores.forEach(setor => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = setor;
        checkbox.addEventListener('change', exibirProdutosNaTela);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + setor));
        dropdownMenuSetor.appendChild(label);
    });
    
    dropdownToggleSetor.addEventListener('click', () => {
        dropdownMenuSetor.style.display = dropdownMenuSetor.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', (event) => {
        if (!dropdownToggleSetor.contains(event.target) && !dropdownMenuSetor.contains(event.target)) {
            dropdownMenuSetor.style.display = 'none';
        }
    });
}

function getSelectedAreas() {
    return Array.from(dropdownMenu.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
}

function getSelectedSetores() {
    return Array.from(dropdownMenuSetor.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
}

function exibirProdutosNaTela() {
    tabelaProdutos.innerHTML = '';
    
    const selectedAreas = getSelectedAreas();
    const selectedSetores = getSelectedSetores();
    
    const produtosFiltrados = produtos.filter(produto =>
        produto.Modalidade === 'Hibrido' &&
        produto.Pago === 'Não' &&
        produto.Natureza === 'Consultoria' &&
        (selectedAreas.length === 0 || selectedAreas.includes(produto.Area)) &&
        (selectedSetores.length === 0 || selectedSetores.includes(produto.Setor))
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
                <td>${produto.EmpresasHabilitadas}</td>
                <td>${produto.Subarea}</td>
                <td>${produto.Area}</td>
                <td><a href="SOMA-detalhes.html?id=${produto.ID_Produto}">${produto.NomeProduto}</a></td>
                <td>${produto.Natureza}</td>
                <td>${produto.Modalidade}</td>
                <td>${produto.CargaHoraria}</td>
                <td>${produto.Setor}</td>
                <td>${produto.PublicoAlvo}</td>
                <td>${custoCredenciado}</td>
                <td>${produto.Aplicador}</td>
                <td>${produto.DescricaoProduto}</td>
            </tr>
        `;
        tabelaProdutos.innerHTML += linha;
    });
}
