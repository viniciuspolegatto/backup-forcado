let botaoGerarContrato = document.querySelector("#botaoGerarContrato");
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

        <table style="width: 90%; text-align: justify;">
          <thead>
            <tr>
              <th><h2>${produto.NomeProduto}</h2></th>
            </tr>
            <tr>
              <th><h3>${produto.DescricaoProduto}</h3></th>
            </tr>
          </thead>
        </table>
        <p></P>
        <table style="width: 90%; border-collapse: collapse; text-align: justify; border: 1px solid #ccc; margin: 5px;">
          <tbody>
            <tr>
              <td><strong style="color: red;">PREÇO PARA O CLIENTE:</strong> ${Number(produto.Soma_Precificacao).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
              })}</td>
              <td><strong>ID do Produto:</strong> ${produto.ID_Produto}</td>
              <td><strong>Família:</strong> ${produto.Familia}</td>
              <td><strong>Área:</strong> ${produto.Area}</td>
            </tr>
            <tr>
              <td><strong>Pagamento ao Credenciado:</strong> ${Number(produto.Custo_Credenciado).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
              })}</td>
              <td><strong>Natureza:</strong> ${produto.Natureza}</td>
              <td><strong>Subárea:</strong> ${produto.Subarea}</td>
              <td><strong>Público-alvo:</strong> ${produto.PublicoAlvo}</td>
            </tr>
            <tr>
              <td><strong>Empresas Habilitadas:</strong> ${produto.EmpresasHabilitadas}</td>
              <td><strong>Origem:</strong> ${produto.Origem}</td>
              <td><strong>Carga horária:</strong> ${produto.CargaHoraria} horas</td>
              <td><strong>Complexidade:</strong> ${produto.Complexidade}</td>
            </tr>
            <tr>
              <td><strong>Modalidade:</strong> ${produto.Modalidade}</td>
              <td><strong>Pago:</strong> ${produto.Pago}</td>
            </tr>
          </tbody>
        </table>`;
      
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

// Ação de coleta e armazenagem de dados da página STecAGRO-dadosContrato.html
document.getElementById('botaoImpressaoCnpj').addEventListener('click', async function() {
  let cepBruto = document.getElementById('cep').value;
  let cnpjBruto = document.getElementById('cnpj').value;
  let nomeCliente = document.getElementById('nomeClienteForm').value;
  let nascimentoCliente = document.getElementById('nascimento').value;
  let cpfBruto = document.getElementById('cpf').value;
  let numeroResidencia = document.getElementById('numeroResidencia').value;
  let telefone = document.getElementById('telefone').value;
  let email = document.getElementById('email').value;
  let testemunhaSelecionada = document.getElementById("listaDeTestemunhas");
  let testemunhaDados = testemunhaSelecionada.value; // Obtém o valor selecionado

  
// Valida se nome, cpf e telefone estão preenchidos *******************************
    if (!nomeCliente || !cpfBruto || !telefone) {
      alert("Preencha Nome, CPF e Telefone");
      return; // Impede o envio dos dados
    }

// Função para eliminar caracteres do CNPJ, CEP e CPF que não sáo números *********
  function limparCnpj(cnpjBruto){
    return cnpjBruto.replace(/\D/g, '');
  } let cnpjDigitado = limparCnpj(cnpjBruto);
  
  function limparCep(cepBruto){
    return cepBruto.replace(/\D/g, '');
  } let cepDigitado = limparCep(cepBruto);
  
  function limparCpf(cpfBruto){
    return cpfBruto.replace(/\D/g, '');
  } let cpf = limparCpf(cpfBruto)

  
// SPLIT para Quebra a String PRODUTO e TESTEMUNHA para salvar detalhes no Banco de Dados **
  const testemunhaDetalhes = testemunhaDados.split(" | "); // formato apresentado em STecSAgro-dadosContrato.html
  const testemunhaNome = testemunhaDetalhes[0];
  const testemunhaCargo = testemunhaDetalhes[1];
  const testemunhaCpf = testemunhaDetalhes[2];
//------------------------------------------------- 


// ELEMENTO PARA COLETAR INFORMAÇÕES DE CNPJ e CEP
  try {
    let resCep = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
    let dataCep = await resCep.json();

    if (dataCep.erro) {
      throw new Error("CEP não encontrado");
    }

    let resCnpj = await fetch(`/cnpj/${cnpjDigitado}`);
    let dataCnpj = await resCnpj.json();
    console.log("retorno do script coletor de dados do dataCnpj" + dataCnpj)
  
// Função para corrigir o nome fantasia, telefone, Email, complemento e QSA da PJ caso não tenha -------------------------------------------------

  function obterNomeFantasia() {
    let fantasiaPj = dataCnpj.fantasia;
      if (!fantasiaPj || fantasiaPj === "") {
        fantasiaPj = "não atribuído";
      } else {
      fantasiaPj = dataCnpj.fantasia;
    }
     return fantasiaPj;} // Obtém o nome fantasia
  let fantasiaPj = obterNomeFantasia();
  
  function obterTelefonePj () {
    let telefonePj = dataCnpj.telefone;
    if (!telefonePj || telefonePj === "") {
      telefonePj = "não atribuído";
    } else {telefonePj = dataCnpj.telefone;}
     return telefonePj;}
  let telefonePj = obterTelefonePj();
  
  function obterEmailPj () {
    let emailPj = dataCnpj.email;
    if (!emailPj || emailPj === "") {
      emailPj = "não atribuído";
    } else {emailPj = dataCnpj.email;}
     return emailPj;}
  let emailPj = obterEmailPj();
  
  function obterQsaPj () {
    let socioPj = dataCnpj.qsa[0]
    if (!socioPj || socioPj === "") {
      socioPj = "não atribuído";
    } else {socioPj = dataCnpj.qsa[0].nome;}
     return socioPj;}
  let socioPj = obterQsaPj();

  function obterComplementoPj () {
    let complementoPj = dataCnpj.complemento
    if (!complementoPj || complementoPj === "") {
      complementoPj = "";
    } else {complementoPj = ", complemento "+dataCnpj.complemento;}
     return complementoPj;}
  let complementoPj = obterComplementoPj();



// ----------------------------------------
// Preenchendo a tabela de verificação que aparecerá na página STecAGRO-dadosContrato 
    document.getElementById('cnpj-td').textContent = dataCnpj.cnpj;
    document.getElementById('qsa-td').textContent = socioPj;
    document.getElementById('razao-social-td').textContent = dataCnpj.nome;
    document.getElementById('empresa-atividade-principal').textContent = dataCnpj.atividade_principal[0].text;
    document.getElementById('empresa-nome-fantasia').textContent = fantasiaPj;
    document.getElementById('empresa-logradouro').textContent = dataCnpj.logradouro;
    document.getElementById('empresa-municipio').textContent = dataCnpj.municipio;
    document.getElementById('empresa-situacao').textContent = dataCnpj.situacao;
    document.getElementById('empresa-porte').textContent = dataCnpj.porte;
    document.getElementById('telefone-td').textContent = telefonePj;
    document.getElementById('endereco-td').textContent = `${dataCep.logradouro}, ${dataCep.bairro}, ${dataCep.localidade} - ${dataCep.uf}`;
    document.getElementById('cep-td').textContent = dataCep.cep;
    document.getElementById('nome-cliente-td').textContent = nomeCliente;
    document.getElementById('cpf-td').textContent = cpfBruto;
    document.getElementById('numero-residencia-td').textContent = numeroResidencia;
    document.getElementById('telefone-contato-td').textContent = telefone;
    document.getElementById('email-td').textContent = email;
    document.getElementById("testemunha-td").textContent = testemunhaNome;

    document.getElementById('data-table').style.display = 'block';

// Armazenar os dados no localStorage para ser usado na nova janela de contrato
    localStorage.setItem('dadosCnpj', JSON.stringify(dataCnpj));
    localStorage.setItem('cepDigitado', JSON.stringify(dataCep)); // Armazenar dados do CEP como JSON
    localStorage.setItem('nomeCliente', nomeCliente);
    localStorage.setItem('cpfBruto', cpfBruto);
    localStorage.setItem('numeroResidencia', numeroResidencia);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('email', email);

    localStorage.setItem('complementoPj', complementoPj);
    localStorage.setItem('fantasiaPj',fantasiaPj);
    localStorage.setItem('telefonePj',telefonePj);
    localStorage.setItem('emailPj',emailPj);
    
    localStorage.setItem('testemunhaNome', testemunhaNome);
    localStorage.setItem('testemunhaCargo', testemunhaCargo);
    localStorage.setItem('testemunhaCpf', testemunhaCpf);

    // Adiciona o evento de clique para o botão Gerar Contrato
    enviarPedidoBtn.addEventListener('click', () => enviarPedidoDesktop(dataCnpj));
  
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os dados. Por favor, verifique as informações digitadas e tente novamente.");
  }

//-----------------------------------------------------------
}); // FIM DO ADD EVENT LISTENER




function enviarPedidoDesktop(dataCnpj) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const assunto = `ER - SOLICITAÇÃO ATENDIMENTO CREDENCIADO - ${dataHora}`;
    const corpo = gerarCorpoEmail(dataCnpj);

    const mailto = `mailto:marcosvp@sebraesp.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailto;
    const corpo = gerarCorpoEmail(produto).replace(/\n/g, '%0A'); // Substitui quebras de linha pelo formato correto para URLs

    const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosvp@sebraesp.com.br&subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.open(outlookWebUrl, '_blank');
}

function gerarCorpoEmail(produto) {
    return `
        Nome do Produto: ${produto.NomeProduto}
        Descrição: ${produto.DescricaoProduto}
        ID do Produto: ${produto.ID_Produto}
        Família: ${produto.Familia}
        Área: ${produto.Area}
        Subárea: ${produto.Subarea}
        Natureza: ${produto.Natureza}
        Preço para o Cliente: ${Number(produto.Soma_Precificacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        Valor Total: ${Number(produto.Custo_Credenciado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        Público-alvo: ${produto.PublicoAlvo}
        Origem: ${produto.Origem}
        Carga Horária: ${produto.CargaHoraria} horas
        Empresas Habilitadas: ${produto.EmpresasHabilitadas}
        Complexidade: ${produto.Complexidade}
        Modalidade: ${produto.Modalidade}
        Pago: ${produto.Pago}
    `;
}
