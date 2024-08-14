/* scriptColetorDeDados.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir*/

const botaoAddDados = document.querySelector("#botaoAdicionarDados");
const listaMontada = document.querySelector("#listaVisualDeDados");
const botaoLimparDados = document.querySelector("#botaoLimparDados");
const botaoBuscarCadastro = document.querySelector("#botaoBuscarCadastro");
const botaoGerarContrato = document.querySelector("#botaoGerarContrato");

const entradaDeNome = document.querySelector("#nomeCon");
const entradaDeCpf = document.querySelector("#cpfCon");
const entradaDeEmail = document.querySelector("#emailCon");
const entradaDeTel = document.querySelector("#telCon");
const entradaDeNum = document.querySelector("#numCon");
const entradaDeCep = document.querySelector("#cep");
const entradaDeCnpj = document.querySelector("#cnpj");
const entradaDeNasc = document.querySelector("#nascCon");
const entradaServicoSTecSenai = document.querySelector("#servicosSebraetecSenai")
const entradaTestemunha = document.querySelector("#testemunhaSTecSenai")


// ********************************************************************
botaoAddDados.addEventListener("click", async function() {
// Coleta os dados dos campos
  const nome = entradaDeNome.value.trim();
  const cpf = entradaDeCpf.value.trim();
  const telefone = entradaDeTel.value.trim();
  const email = entradaDeEmail.value.trim();
  const numPf = entradaDeNum.value.trim();
  const cep = entradaDeCep.value.trim();
  const cnpj = entradaDeCnpj.value.trim();
  const nasc = entradaDeNasc.value.trim();
  const STecSenai = entradaServicoSTecSenai.value.trim();
  const testemunhaSenai = entradaTestemunha.value.trim();


  // Valida se nome, cpf e telefone estão preenchidos
    if (!nome || !cpf || !telefone) {
      alert("Preencha Nome, CPF e Telefone");
      return; // Impede o envio dos dados
    }

    // Coleta os dados das APIs, Verificando se CEP e CNPJs existem
    let cnpjData = {};
    let cepData = {};

    try {
        if (cnpj) {
            let resCnpj = await fetch(`/cnpj/${cnpj}`);
            if (!resCnpj.ok) {
                throw new Error("CNPJ não encontrado.");
            }
            cnpjData = await resCnpj.json();
            if (!cnpjData.nome) {
                alert("CNPJ inválido. Verifique o número e tente novamente.");
                return; // Impede o envio dos dados
            }
        }

        if (cep) {
            let resCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!resCep.ok) {
                throw new Error("CEP não encontrado.");
            }
            cepData = await resCep.json();
            if (cepData.erro) {
                alert("CEP inválido. Verifique o número e tente novamente.");
                return; // Impede o envio dos dados
            }
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar os dados: " + error.message);
        return; // Impede o envio dos dados em caso de erro
    }

    // Constrói a lista com os dados coletados
  // Para puxar dados de uma lista let fruta = {cor: "azul", sementes:true}, usa-se apenas fruta.cor
  // Para puxar dados de uma array let lista = [true, 1, "texto", {cor:"azul",sementes:true}], usa-se lista[4].cor

    let logradouroPf = cepData.logradouro;
    let bairroPf = cepData.bairro;
    let cidadePf = cepData.localidade;
    let estadoPf = cepData.uf;
  
    let cnpjPj  = cnpjData.cnpj
    let razaoPj = cnpjData.nome;
    let atividadePj = cnpjData.atividade_principal[0].text;
    let logradouroPj = cnpjData.logradouro;
    let numPj = cnpjData.numero;
    let municipioPj = cnpjData.municipio;
    let bairroPj = cnpjData.bairro;
    let estadoPj = cnpjData.uf;
    let cepPj = cnpjData.cep;
    let situacaoPj = cnpjData.situacao;

  
  // Função para obter o nome fantasia da PJ -------------------------------------------------
  function obterNomeFantasia() {
    // Coleta o valor de dadosCnpj.fantasia
    let fantasiaPj = cnpjData.fantasia;

    // Verifica se o fantasiaPj é vazio ou nulo e ajusta o valor
    if (!fantasiaPj || fantasiaPj === "") {
      fantasiaPj = "não atribuído";
    } else {
      fantasiaPj = cnpjData.fantasia;
    }
     return fantasiaPj;
  } // Obtém o nome fantasia
  let fantasiaPj = obterNomeFantasia();

// Função para obtar o Telefone e E-mail da PJ--------------------------------------------------
  
  function obterTelefonePj () {
    let telefonePj = cnpjData.telefone;
    if (!telefonePj || telefonePj === "") {
      telefonePj = "não atribuído";
    } else {telefonePj = cnpjData.telefone;}
     return telefonePj;}
  let telefonePj = obterTelefonePj();
  
  function obterEmailPj () {
    let emailPj = cnpjData.email;
    if (!emailPj || emailPj === "") {
      emailPj = "não atribuído";
    } else {emailPj = cnpjData.email;}
     return emailPj;}
  let emailPj = obterEmailPj();
  
  function obterQsaPj () {
    let socioPj = cnpjData.qsa[0]
    if (!socioPj || socioPj === "") {
      socioPj = "não atribuído";
    } else {socioPj = cnpjData.qsa[0].nome;}
     return socioPj;}
  let socioPj = obterQsaPj();
  
  // -------------------------------------------------------------------------------  
    const listaDeDados = [
        `Serviço: ${STecSenai}`,
        `Nome: ${nome}`,
        `Data de Nacimento: ${nasc}`,
        `CPF: ${cpf}`,
        `Telefone: ${telefone}`,
        `E-mail cadastrado: ${email}`,
        `Endereço cadastrado: ${logradouroPf} - nº ${numPf}, ${bairroPf}, ${cidadePf} - ${estadoPf}, CEP: ${cep}`,
        `Data de Nacimento: ${nasc}`,
        `RAZÃO SOCIAL: ${razaoPj}`,
        `NOME FANTASIA: ${fantasiaPj}`,
        `ATIVIDADE PRINCIPAL: ${atividadePj}`,
        `SÓCIO: ${socioPj}`,
        `SITUAÇÃO: ${situacaoPj}`,
        `ENDEREÇO: ${logradouroPj} - nº ${numPj}, ${bairroPj}, ${municipioPj} - ${estadoPj}, CEP: ${cepPj}`,
    ];
  
  

    // Constrói o HTML da lista
    let futuroValorInnerHTML = "";
    for (let i = 0; i < listaDeDados.length; i++) {
        futuroValorInnerHTML += "<li>" + listaDeDados[i] + "</li>";
    }

    listaMontada.innerHTML = futuroValorInnerHTML;

    // Exibe o botão Gerar Contrato
    botaoGerarContrato.style.display = 'block';

//********** Salva os dados no localStorage  ******
//--------------------------------------------------------------------------------- 
  localStorage.setItem('dadosContrato', JSON.stringify({
    nome,
    cpf,
    nasc,
    logradouroPf,
    numPf,
    bairroPf,
    cidadePf,
    estadoPf,
    cep,
    telefone,
    email,
    STecSenai,
    cnpjPj,
    razaoPj,
    fantasiaPj,
    logradouroPj,
    numPj,
    bairroPj,
    municipioPj,
    estadoPj,
    cepPj,
    situacaoPj,
    telefonePj,
    emailPj,
    testemunhaSenai
  }));

// ---------------------------------------------------------------------------------- 

    // Envia os dados para o servidor
    const data = {
        nome: nome,
        cpf: cpf,
        email: email,
        tel: telefone,
        logradouroPj: cnpjPj
    };

    fetch('/addData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
        console.log('Resposta do servidor:', text);
        if (text.includes("Dados adicionados ao banco de dados")) {
            alert("Cadastro realizado com sucesso!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Erro ao realizar o cadastro: " + error.message);
    });
});

botaoLimparDados.addEventListener("click", function() {
    listaMontada.innerHTML = "";
    botaoGerarContrato.style.display = 'none'; // Oculta o botão quando a lista é limpa
});

botaoBuscarCadastro.addEventListener("click", function() {
    const senha = prompt("Digite a senha para acessar a busca de cadastro:");
    const senhaCorreta = "Sebrae@123";

    if (senha === senhaCorreta) {
        window.location.href = "buscaCadastro.html";
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
});

// Adiciona o evento de clique para o botão Gerar Contrato
botaoGerarContrato.addEventListener("click", function() {
    // Redireciona para a página de contrato
    window.location.href = "STecSenai-contrato.html";
});
