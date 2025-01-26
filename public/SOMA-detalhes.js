let botaoBuscarCadastro = document.querySelector("#botaoBuscarCadastro");
let botaoGerarContrato = document.querySelector("#botaoGerarContrato");
const urlParams = new URLSearchParams(window.location.search);
const idProduto = urlParams.get('id'); // Obtém o ID do produto da URL
const endpoint = 'https://raw.githubusercontent.com/viniciuspolegatto/apiCredenciamentoSomaSebraeSP/main/SebraeSpSomaConsultorias.json';
const detalhesProduto = document.getElementById('detalhesProduto');
const enviarPedidoBtn = document.getElementById('enviarPedido');
const usarEmailWebBtn = document.getElementById('usarEmailWeb');
const inputDataConsultoria = document.getElementById("dataConsultoria");

document.addEventListener('DOMContentLoaded', () => {
  carregarDetalhes();
  configurarDataMinimaEValidacao(); // Chamada da função para configurar a data mínima
});


// Lógica para calcular e validar dias úteis e feriados
function calcularDiasUteis(inicio, feriados, diasNecessarios) {
    let contadorDiasUteis = 0;
    const resultado = new Date(inicio);
    while (contadorDiasUteis < diasNecessarios) {
        resultado.setUTCDate(resultado.getUTCDate() + 1); // Corrige para UTC para manter sincronização
        const diaSemana = resultado.getUTCDay(); // Obtém o dia da semana com base em UTC
        const dataFormatada = resultado.toISOString().split("T")[0];
        if (diaSemana !== 0 && diaSemana !== 6 && !feriados.includes(dataFormatada)) {
            contadorDiasUteis++;
        }
    }
    return resultado;
}

// Configura a data mínima e adiciona a validação
function configurarDataMinimaEValidacao() {
    const feriados = [
        "2025-01-01", "2025-04-21", "2025-05-01", "2025-09-07", "2025-10-12",
        "2025-11-02", "2025-11-15", "2025-12-25"
    ];
    const hoje = new Date();
    const dataMinima = calcularDiasUteis(hoje, feriados, 13);
    const inputDataConsultoria = document.getElementById("dataConsultoria");

    // Configura o mínimo no campo de data
    inputDataConsultoria.min = dataMinima.toISOString().split("T")[0];
    inputDataConsultoria.disabled = false;

    // Adiciona o evento de validação
    inputDataConsultoria.addEventListener("change", () => {
        const dataSelecionada = new Date(inputDataConsultoria.value);
        const diaSemana = dataSelecionada.getUTCDay(); // Corrige para UTC para validação correta
        const dataFormatada = inputDataConsultoria.value;

        if (
            diaSemana === 0 || // Domingo
            diaSemana === 6 || // Sábado
            feriados.includes(dataFormatada) || // Feriado
            dataSelecionada < dataMinima // Antes do prazo mínimo
        ) {
            swal({
                title: "Data Inválida!",
                text: "Por favor, escolha uma data válida: dias úteis após 13 dias úteis e evite sábados, domingos e feriados.",
                icon: "warning",
                button: "Ok"
            });
            inputDataConsultoria.value = ""; // Limpa a seleção inválida
        }
    });
}

// Executa as funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    configurarDataMinimaEValidacao();
});


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

    // Exibe os detalhes do produto encontrado
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
  
  // Armazena os detalhes para uso posterior
    localStorage.setItem('NomeProduto', produto.NomeProduto);
    localStorage.setItem('Modalidade', produto.Modalidade);
    
  } catch (error) {
    console.error('Erro ao carregar detalhes do produto:', error);
    detalhesProduto.innerHTML = `<p>Erro ao carregar os detalhes do produto. Tente novamente mais tarde.</p>`;
  }
}

// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
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
  const testemunhaDetalhes = testemunhaDados.split(" | "); // formato apresentado em STecSenai-dadosContrato.html
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
  
   
  function apontaMEI() {
    let verificaMEI = dataCnpj.simei.optante;
    if (verificaMEI === false) {
      verificaMEI = "NÃO";
    } else {
      verificaMEI = "SIM, é MEI";
    }
    return verificaMEI;}
  let verificaMEI = apontaMEI();
    
    
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
// Preenchendo a tabela de verificação que aparecerá na página STecSenai-dadosContrato 
    document.getElementById('cnpj-td').textContent = dataCnpj.cnpj;
    document.getElementById('qsa-td').textContent = socioPj;
    document.getElementById('razao-social-td').textContent = dataCnpj.nome;
    document.getElementById('empresa-atividade-principal').textContent = dataCnpj.atividade_principal[0].text;
    document.getElementById('empresa-nome-fantasia').textContent = fantasiaPj;
    document.getElementById('empresa-logradouro').textContent = `${dataCnpj.logradouro}, nº ${dataCnpj.numero} - Bairro: ${dataCnpj.bairro}, Município de ${dataCnpj.municipio} - ${dataCnpj.uf}`;
    document.getElementById('empresa-simei').textContent = verificaMEI;
    document.getElementById('empresa-situacao').textContent = dataCnpj.situacao;
    document.getElementById('empresa-porte').textContent = dataCnpj.porte;
    document.getElementById('telefone-td').textContent = telefonePj;
    document.getElementById('endereco-td').textContent = `${dataCep.logradouro}`;
    document.getElementById('cep-td').textContent = dataCep.cep;
    document.getElementById('nome-cliente-td').textContent = nomeCliente;
    document.getElementById('cpf-td').textContent = cpfBruto;
    //document.getElementById('numero-residencia-td').textContent = numeroResidencia;
    document.getElementById('telefone-contato-td').textContent = telefone;
    document.getElementById('email-td').textContent = email;
    document.getElementById("testemunha-td").textContent = testemunhaNome;

    document.getElementById('data-table').style.display = 'block';

// Armazenar os dados no localStorage para ser usado na nova janela de contrato
    localStorage.setItem('dadosCnpj', JSON.stringify(dataCnpj));
    localStorage.setItem('cepDigitado', JSON.stringify(dataCep)); // Armazenar dados do CEP como JSON
    localStorage.setItem('nomeCliente', nomeCliente);
    localStorage.setItem('cpfBruto', cpfBruto);
    //localStorage.setItem('numeroResidencia', numeroResidencia);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('email', email);

    localStorage.setItem('complementoPj', complementoPj);
    localStorage.setItem('fantasiaPj',fantasiaPj);
    localStorage.setItem('telefonePj',telefonePj);
    localStorage.setItem('emailPj',emailPj);
    
    
    localStorage.setItem('testemunhaNome', testemunhaNome);
    localStorage.setItem('testemunhaCargo', testemunhaCargo);
    localStorage.setItem('testemunhaCpf', testemunhaCpf);
    

  
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os dados. Por favor, verifique as informações digitadas e tente novamente.");
  }

//-----------------------------------------------------------
}); // FIM DO ADD EVENT LISTENER



botaoGerarContrato.addEventListener("click", function () {
  // PRODUTO - Atendimento
  const NomeProduto = localStorage.getItem('NomeProduto') || 'N/A';
  const Modalidade = localStorage.getItem('Modalidade') || 'N/A'; 
  
  // Coleta os dados do formulário
  const cnpj = document.getElementById('cnpj').value;
  const razaoSocial = document.getElementById('razao-social-td').textContent || 'N/A';
  const nomeFantasia = document.getElementById('empresa-nome-fantasia').textContent || 'N/A';
  const atividadePrincipal = document.getElementById('empresa-atividade-principal').textContent || 'N/A';
  const situacaoCnpj = document.getElementById('empresa-situacao').textContent || 'N/A';
  const porte = document.getElementById('empresa-porte').textContent || 'N/A';
  const logradouro = document.getElementById('empresa-logradouro').textContent || 'N/A';
  const simei = document.getElementById('empresa-simei').textContent || 'N/A';
  const telefonePj = document.getElementById('telefone-td').textContent || 'N/A';

  // Dados do solicitante/testemunha
  const testemunhaNome = document.getElementById("testemunha-td").textContent || 'N/A';
  
  // Dados do projeto
  const projeto = document.getElementById('projeto').value || 'NÃO';
  const nomeProjeto = document.getElementById('nomeProj').value || 'N/A';

  // Dados da consultoria
  const dataConsultoria = document.getElementById('dataConsultoria').value || 'N/A';
  const horario = document.getElementById('horarioConsultoria').value || 'N/A';

  // Coleta dos dados pessoais do cliente
  const nomeCliente = document.getElementById('nomeClienteForm').value || 'N/A';
  const cpf = document.getElementById('cpf').value || 'N/A';
  const nascimento = document.getElementById('nascimento').value || 'N/A';
  const cep = document.getElementById('cep').value || 'N/A';
  const endereco = document.getElementById('endereco-td').textContent || 'N/A';
  //const numeroResidencia = document.getElementById('numeroResidencia').value || 'N/A';
  const telefoneContato = document.getElementById('telefone').value || 'N/A';
  const emailCliente = document.getElementById('email').value || 'N/A';

  // Formatação do corpo do e-mail
  const emailBody = `
    **DETALHES DO PRODUTO**
  - Nome do Produto: ${NomeProduto}
  - Modalidade: ${Modalidade}
  - Data da Consultoria: ${dataConsultoria}
  - Horário: ${horario}

  **DADOS DA PESSOA JURÍDICA**
  - CNPJ: ${cnpj}
  - Situação CNPJ: ${situacaoCnpj}
  - É MEI?: ${simei}
  - Razão Social: ${razaoSocial}
  - Nome Fantasia: ${nomeFantasia}
  - Atividade Principal: ${atividadePrincipal}
  - Porte Empresarial: ${porte}
  - Logradouro: ${logradouro}
  - Telefone (PJ): ${telefonePj}

  **DADOS DA PESSOA FÍSICA (CLIENTE)**
  - Nome Completo: ${nomeCliente}
  - CPF: ${cpf}
  - Data de Nascimento: ${nascimento}
  - CEP: ${cep}
  - Endereço: ${endereco}
  
  - Telefone de Contato: ${telefoneContato}
  - E-mail: ${emailCliente}

  **DADOS DO PROJETO**
  - Pertence a Algum Projeto? ${projeto}
  - Nome do Projeto: ${nomeProjeto}

  **SOLICITANTE**
  - Nome do Solicitante/Testemunha: ${testemunhaNome}
  `;

  // Criação do link mailto
 const mailtoLink = `mailto:marcosvp@sebraesp.com.br?cc=Back@sebraesp.onmicrosoft.com,joaovmt@sebraesp.com.br&subject=ER BARRETOS - SOLICITAÇÃO DE CONSULTORIA&body=${encodeURIComponent(emailBody)}`;

  // Redireciona para o link mailto
  window.location.href = mailtoLink;
});
