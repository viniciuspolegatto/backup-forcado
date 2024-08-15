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
  const fantasiaPj = localStorage.getItem("fantasiaPj");
  const emailPj = localStorage.getItem("emailPj");
  const telefonePj = localStorage.getItem("telefonePj");


  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <p style="text-align: justify;">
      ${dadosCnpj.nome}, nome fantasia ${fantasiaPj}, inscrita no CNPJ nº ${dadosCnpj.cnpj}, localizada na ${dadosCnpj.logradouro}, ${dadosCnpj.numero},
      bairro ${dadosCnpj.bairro}, no município de ${dadosCnpj.municipio} - SP, CEP: ${dadosCnpj.cep}, telefone(s) ${telefonePj},
      e-mail ${emailPj}, empresa neste ato representada por ${nomeCliente}, brasileiro(a), Empresário(a)/Autônomo(a) com 
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
*/
