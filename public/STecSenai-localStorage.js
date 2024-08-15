document.addEventListener("DOMContentLoaded", function () {
  const dadosCnpj = JSON.parse(localStorage.getItem("dadosCnpj"));
  const cepDigitadoString = localStorage.getItem("cepDigitado");
  const cepDigitado = cepDigitadoString ? JSON.parse(cepDigitadoString) : null;
  const nomeCliente = localStorage.getItem("nomeCliente");
  const numeroResidencia = localStorage.getItem("numeroResidencia");
  const telefone = localStorage.getItem("telefone");
  const emailpessoal = localStorage.getItem("email");
  const cpf = localStorage.getItem("cpf");
  const servicos = localStorage.getItem("servico");
  
  // Função para obter o nome fantasia
  function obterNomeFantasia() {
    // Coleta o valor de dadosCnpj.fantasia
    let nomeFantasia = dadosCnpj.fantasia;
    
    // Verifica se o nomeFantasia é vazio ou nulo e ajusta o valor
    if (!nomeFantasia || nomeFantasia.trim() === "") {
      nomeFantasia = ", nome fantasia não atribuído";
    } else {
      nomeFantasia = ", nome fantasia " + dadosCnpj.fantasia;
    }
    
    return nomeFantasia;
  }

  // Obtém o nome fantasia
  const nomeFantasia = obterNomeFantasia();

   
   
  if (!dadosCnpj || !cepDigitado) {
    alert(
      "Verifique se o CNPJ ou o CEP são apenas números e se estão corretos. Por favor, volte e preencha os dados novamente."
    );
    window.location.href = "/index.html";
    return;
  }

  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <p style="text-align: justify;">
      ${dadosCnpj.nome}${nomeFantasia}, inscrita no CNPJ nº ${dadosCnpj.cnpj}, localizada na ${dadosCnpj.logradouro}, ${dadosCnpj.numero},
      bairro ${dadosCnpj.bairro}, no município de ${dadosCnpj.municipio} - SP, CEP: ${dadosCnpj.cep}, telefone(s) ${dadosCnpj.telefone},
      e-mail ${dadosCnpj.email}, empresa neste ato representada por ${nomeCliente}, brasileiro(a), Empresário(a)/Autônomo(a) com 
      inscrição no CPF nº ${cpf}, residente à ${cepDigitado.logradouro}, nº ${numeroResidencia}, bairro ${cepDigitado.bairro},
      CEP ${cepDigitado.cep}, na comarca de ${cepDigitado.localidade} - ${cepDigitado.uf}, telefone de contato ${telefone} e e-mail
      pessoal ${emailpessoal}, denominado(a) como <b>CONTRATANTE</b>
    </p>
  `;

  const reportProduto = document.getElementById("reportProduto");
  reportProduto.innerHTML = `
    <p style="text-align: justify;">
    Produto específico da prestação dos serviços: ${servicos}
    </p>
  `;
  
  const clienteAssinante = document.getElementById("clienteAssinante");
  clienteAssinante.innerHTML = `
    <h3 style="text-align: justify;">
    <b>CONTRATANTE / EMPRESA</b><br>
    <b>${nomeCliente}<b><br>
    <b>${cpf}<b>
    </p>
  `;

  
  
  document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});




/* /************************************************************************
// Função para gerar o texto do contrato com base nos dados do localStorage
/* ******************** OPÇÕES DE DADOS DO LOCAL STORAGE PARA FUNçÂO getItem ****
    
    nome,                estadoPf          estadoPj          cnpjPj              testemunhaSenai,
    cpf,                 cep               cepPj             razaoPj
    nasc,                telefone          situacaoPj        fantasiaPj
    logradouroPf,        email             telefonePj        logradouroPj
    numPf,               STecSenai         emailPj           numPj
    bairroPf,            cidadePf,         municipioPj       bairroPj
   
********************************************************* 



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