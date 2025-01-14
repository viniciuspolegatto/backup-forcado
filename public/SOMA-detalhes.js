const urlParams = new URLSearchParams(window.location.search);
const idProduto = urlParams.get('id');
const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const detalhesProduto = document.getElementById('detalhesProduto');
const enviarPedidoBtn = document.getElementById('enviarPedido');
const usarEmailWebBtn = document.getElementById('usarEmailWeb');

document.addEventListener('DOMContentLoaded', carregarDetalhes);

async function carregarDetalhes() {
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Erro ao buscar dados da API.');

        const produtos = await res.json();
        const produto = produtos.find(p => String(p.ID_Produto) === String(idProduto));

        if (!produto) {
            detalhesProduto.innerHTML = `<p>Produto não encontrado. Verifique o ID na URL.</p>`;
            return;
        }

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

        enviarPedidoBtn.addEventListener('click', () => enviarPedidoDesktop(produto));
        usarEmailWebBtn.addEventListener('click', () => enviarPedidoWeb(produto));
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
        detalhesProduto.innerHTML = `<p>Erro ao carregar os detalhes do produto. Tente novamente mais tarde.</p>`;
    }
}

function enviarPedidoDesktop(produto) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = gerarCorpoEmail(produto);

    const mailto = `mailto:marcosvp@sebraesp.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;
}

function enviarPedidoWeb(produto) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = gerarCorpoEmail(produto).replace(/\n/g, '%0A'); // Substitui quebras de linha pelo formato correto para URLs

    const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosvp@sebraesp.com.br&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.open(outlookWebUrl, '_blank');
}


function gerarCorpoEmail(produto) {
    return `
DETALHES DO PRODUTO
====================
Nome do Produto: ${produto.NomeProduto}
Descrição: ${produto.DescricaoProduto}
Pago: ${produto.Pago}

--------------------
ESCOLAS SENAI PARA ATENDIMENTO
--------------------
- Morro Agudo = SENAI RIBEIRÃO PRETO
  Contato: Maria_Helena/Victor (13) 98181-3280
- Guaíra | Ipuã = SENAI FRANCA
  Contato: Walter/Filipe (16) 99718-2473
- Bebedouro | Jaborandi | Monte Azul Paulista | Pirangi | Taiaçu | Taiúva | Taquaral | Terra Roxa | Viradouro = SENAI SERTÃOZINHO
  Contato: Marta/Caio: (16) 99975-0447
- Altair | Ariranha | Barretos | Cajobi | Colina | Colômbia | Embaúba | Guaraci | Icém | Paraíso | Severínia = SENAI SÃO JOSÉ DO RIO PRETO
  Contato: Robson (17) 99658-5954

Atenciosamente,
Equipe de Atendimento Credenciado
`;
}

function enviarPedido(produto) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = gerarCorpoEmail(produto);

    const mailto = `mailto:marcosvp@sebraesp.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;
}

function usarEmailWeb(produto) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = gerarCorpoEmail(produto).replace(/\n/g, '%0A'); // Substitui quebras de linha pelo formato correto para URLs

    const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosvp@sebraesp.com.br&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.open(outlookWebUrl, '_blank');
}

/*

function gerarCorpoEmail(produto) {
    return `
    
       <ul>
          <li> ---------------- <b>ESCOLAS SENAI PARA ATENDIMENTO</b> --------------</li>
          <li>Morro Agudo = SENAI RIBEIRÃO PRETO = Contato: Maria_Helena/Victor (13) 98181-3280 </li>
          <li>Guaíra | Ipuã = SENAI FRANCA = Contato: Walter/Filipe (16) 99718-2473 </li>
          <li>Bebedouro | Jaborandi | Monte Az. Pta | Pirangi | Taiaçu | Taiúva | Taquaral | Terra Roxa | Viradouro = SENAI SERTÃOZINHO = Contato: Marta/Caio: (16) 99975-0447</li>
          <li>Altair | Ariranha | Barretos | Cajobi | Colina | Colômbia | Embaúba | Guaraci | Icém | Paraíso | Severínia = SENAI SÃO JOSÉ DO RIO PRETO = Contato: Robson (17) 99658-5954</li>

        </ul>
    
    
        **Nome do Produto:** ${produto.NomeProduto}\n
        **Descrição:** ${produto.DescricaoProduto}\n
        **ID do Produto:** ${produto.ID_Produto}\n
        **Família:** ${produto.Familia}<br>
        **Área:** ${produto.Area}<br>
        **Subárea:** ${produto.Subarea}<br>
        <p>**Natureza:** ${produto.Natureza}</p>
        **Preço para o Cliente:** ${Number(produto.Soma_Precificacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}%0A
        **Valor Total:** ${Number(produto.Custo_Credenciado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}%0A
        **Público-alvo:** ${produto.PublicoAlvo}%0A
        **Origem:** ${produto.Origem}%0A
        **Carga Horária:** ${produto.CargaHoraria} horas%0A
        **Empresas Habilitadas:** ${produto.EmpresasHabilitadas}%0A
        **Complexidade:** ${produto.Complexidade}%0A
        **Modalidade:** ${produto.Modalidade}%0A
        **Pago:** ${produto.Pago}%0A
        %0A
        Atenção: Esta mensagem pode conter informação confidencial ou privilegiada, sendo seu sigilo protegido por lei. Se você não for o destinatário ou a pessoa autorizada a receber esta mensagem, não pode usar, copiar ou divulgar as informações nela contidas ou tomar qualquer ação baseada nessas informações. Se você recebeu esta mensagem por engano, por favor, avise imediatamente ao remetente, respondendo o e-mail e em seguida apague-a. Agradecemos sua cooperação.%0A
    `;
}
*/