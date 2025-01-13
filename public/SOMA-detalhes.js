const urlParams = new URLSearchParams(window.location.search);
const idProduto = urlParams.get('id'); // Obtém o ID do produto da URL
const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const detalhesProduto = document.getElementById('detalhesProduto');
const enviarPedidoBtn = document.getElementById('enviarPedido');

document.addEventListener('DOMContentLoaded', carregarDetalhes);

async function carregarDetalhes() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');

        const produtos = await res.json();

        // Certifique-se de comparar o ID como string, pois a URL pode enviar o valor como string
        const produto = produtos.find(p => String(p.ID_Produto) === String(idProduto));

        if (!produto) {
            detalhesProduto.innerHTML = `<p>Produto não encontrado. Verifique o ID na URL.</p>`;
            return;
        }

        // Exibe os detalhes do produto encontrado
        detalhesProduto.innerHTML = `
            <h2>${produto.NomeProduto}</h2>
            <p><strong>Descrição:</strong> ${produto.DescricaoProduto}</p>
            <p><strong>ID do Produto:</strong> ${produto.ID_Produto}</p>
            <p><strong>Família:</strong> ${produto.Familia}</p>
            <p><strong>Área:</strong> ${produto.Area}</p>
            <p><strong>Subárea:</strong> ${produto.Subarea}</p>
            <p><strong>Natureza:</strong> ${produto.Natureza}</p>
            <p><strong style="color: red;">PREÇO PARA O CLIENTE:</strong> ${Number(produto.Soma_Precificacao).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>
            <p><strong>Valor total:</strong> ${Number(produto.Custo_Credenciado).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</p>            
            <p><strong>Público-alvo:</strong> ${produto.PublicoAlvo}</p>
            <p><strong>Origem:</strong> ${produto.Origem}</p>
            <p><strong>Carga horária:</strong> ${produto.CargaHoraria} horas</p>
            <p><strong>Empresas Habilitadas:</strong> ${produto.EmpresasHabilitadas}</p>
            <p><strong>Complexidade:</strong> ${produto.Complexidade}</p>
            <p><strong>Modalidade:</strong> ${produto.Modalidade}</p>
            <p><strong>Pago:</strong> ${produto.Pago}</p>
        `;

        // Configura o botão para enviar o pedido
        enviarPedidoBtn.addEventListener('click', () => enviarPedido(produto));
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
        detalhesProduto.innerHTML = `<p>Erro ao carregar os detalhes do produto. Tente novamente mais tarde.</p>`;
    }
}

function enviarPedido(produto) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = `
        Nome do Produto: ${produto.NomeProduto}
        Descrição: ${produto.DescricaoProduto}
        ID do Produto: ${produto.ID_Produto}
        Família: ${produto.Familia}
        Área: ${produto.Area}
        Subárea: ${produto.Subarea}
        Natureza: ${produto.Natureza}
        Preço para o Cliente: ${Number(produto.Soma_Precificacao).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}
        Valor Total: ${Number(produto.Custo_Credenciado).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })}
        Público-alvo: ${produto.PublicoAlvo}
        Origem: ${produto.Origem}
        Carga Horária: ${produto.CargaHoraria} horas
        Empresas Habilitadas: ${produto.EmpresasHabilitadas}
        Complexidade: ${produto.Complexidade}
        Modalidade: ${produto.Modalidade}
        Pago: ${produto.Pago}
    `;

    const mailto = `mailto:marcosvp@sebraesp.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;
}
