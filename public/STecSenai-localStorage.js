// STecSenai-localStorage.js

/* ******************** OPÇÕES DE DADOS DO LOCAL STORAGE PARA FUNçÂO getItem ****
    
    nome,                estadoPf          estadoPj          cnpjPj              testemunhaSenai,
    cpf,                 cep               cepPj             razaoPj
    nasc,                telefone          situacaoPj        fantasiaPj
    logradouroPf,        email             telefonePj        logradouroPj
    numPf,               STecSenai         emailPj           numPj
    bairroPf,            cidadePf,         municipioPj       bairroPj
   
********************************************************* */

document.addEventListener("DOMContentLoaded", function () {
  const cpf = localStorage.getItem("cpf");
  const nome = localStorage.getItem("nome");
  const telefone = localStorage.getItem("telefone");
  const email = localStorage.getItem("email");
  const logradouroPf = localStorage.getItem("logradouroPf");
  const numPf = localStorage.getItem("numPf");
  const bairroPf = localStorage.getItem("bairroPf");
  const cidadePf = localStorage.getItem("cidadePf");
  const estadoPf = localStorage.getItem("estadoPf");
  const cep = localStorage.getItem("cep");
  
  const cnpjPj = localStorage.getItem("cnpjPj");
  const razaoPj = localStorage.getItem("razaoPj");
  const fantasiaPj = localStorage.getItem("fantasiaPj");
  const cepPj = localStorage.getItem("cepPj");
  const telefonePj = localStorage.getItem("telefonePj");
  const emailPj = localStorage.getItem("emailPj");
  const logradouroPj = localStorage.getItem("logradouroPj");
  const numPj = localStorage.getItem("numPj");
  const bairroPj = localStorage.getItem("bairroPj");
  const municipioPj = localStorage.getItem("municipioPj");
  const estadoPj = localStorage.getItem("estadoPj");
 
 
  const STecSenai = localStorage.getItem("STecSenai");
  

  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <p style="text-align: justify;">
        ${razaoPj}, nome fantasia ${fantasiaPj}, inscrita no CNPJ nº ${cnpjPj}, localizada na
        , telefone(s) ${telefonePj}, e-mail ${emailPj}, empresa neste ato representada por ${nome}, brasileiro(a), Empresário(a)/Autônomo(a)
        com inscrição no CPF nº ${cpf}, residente à , telefone(s) de contato ${telefone} e e-mail ${email}
        , denominado(a) como <b>CONTRATANTE</b> </p>`;

  const reportProduto = document.getElementById("reportProduto");
  reportProduto.innerHTML = `
    <p style="text-align: justify;">
    Produto específico da prestação dos serviços: ${STecSenai}
    </p>`;
  
  const clienteAssinante = document.getElementById("clienteAssinante");
  clienteAssinante.innerHTML = `
    <h3 style="text-align: justify;">
    <b>CONTRATANTE / EMPRESA</b><br>
    <b>${nome}<b><br>
    <b>${cpf}<b>
    </p>`;


  
  document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});




/* /************************************************************************
// Função para gerar o texto do contrato com base nos dados do localStorage
function gerarTextoContrato() {
    const dados = obterDadosContrato();

    if (dados) {
      
      const razao = dados.razaoPj;
      const fantasia = dados.fantasiaPj;
      const cnpj = dados.cnpjPj;
      const enderecoPj = `${dados.logradouroPj} - nº ${dados.numPj}, bairro: ${dados.bairroPj}, no município de ${dados.municipioPj} - ${dados.estadoPj}, CEP: ${dados.cepPj}`;
      const telefonePj = dados.telefonePj;
      const emailPj = dados.emailPj;
      const nome = dados.nome;
      const cpf = dados.cpf;
      const enderecoPf = `${dados.logradouroPf} - nº ${dados.numPf}, ${dados.bairroPf}, ${dados.cidadePf} - ${dados.estadoPf}, CEP: ${dados.cep}`;
      const telefonePf = dados.telefone;
      const emailPf = dados.email;

      
      return `
        ${razao}, nome fantasia ${fantasia}, inscrita no CNPJ nº ${cnpj}, localizada na ${enderecoPj}
        , telefone(s) ${telefonePj}, e-mail ${emailPj}, empresa neste ato representada por ${nome}, brasileiro(a), Empresário(a)/Autônomo(a)
        com inscrição no CPF nº ${cpf}, residente à ${enderecoPf}, telefone(s) de contato ${telefonePf} e e-mail ${emailPf}
        , denominado(a) como <b>CONTRATANTE</b>`;
    } else {
        return 'Nenhum dado disponível para gerar o contrato.';
    }
}
// Expor a função para uso externo
export { gerarTextoContrato };


// ******************* Função para trazer o produto do contrato

function trazerSTecSenai() {
    const dados = obterDadosContrato();

    if (dados) {
      const sebraetecSenai = dados.STecSenai;
      return `
        PRODUTO OBJETO DO CONTRATO: ${sebraetecSenai}`;
    } else {
        return 'Nenhum dado disponível para gerar o contrato.';
    }
}
export { trazerSTecSenai };


// ******************** Função para trazer o assinante do contrato

function assinanteContratante() {
    const dados = obterDadosContrato();

    if (dados) {
      const assinanteCliente = dados.nome;
      const assinanteClienteCpf = dados.cpf;
      return `
        <strong>${assinanteCliente}</strong><p />
        <strong>CPF: ${assinanteClienteCpf}</strong>`;
    } else {
        return 'Nenhum dado disponível para gerar o contrato.';
    }
}
export { assinanteContratante };

// ******************* Trazendo as informações da testemunha *************

function testemunhaDoContratoSenai() {
    const dados = obterDadosContrato();
    if (dados){
      const testemunhaContrSenai = dados.testemunhaSenai;
      return `${testemunhaContrSenai}`;
    } else {
    return 'Testemunha não disponível para gerar o contrato.';
    }
}
export { testemunhaDoContratoSenai }
*/