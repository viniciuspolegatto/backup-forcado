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
  const complementoPj = localStorage.getItem("complementoPj");
  const emailPj = localStorage.getItem("emailPj");
  const telefonePj = localStorage.getItem("telefonePj");
  
  const servicos2 = localStorage.getItem("servico2");
  const partesTestemunha = servicos2.split(" / ");
  const nomeTestemunhaSTecSenai = partesTestemunha[0];
  const cargoTestemunhaSTecSenai = partesTestemunha[1];
  const cpfTestemunhaSTecSenai = partesTestemunha[2];
  


  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = `
    <p style="text-align: justify;">
      ${dadosCnpj.nome}, nome fantasia ${fantasiaPj}, inscrita no CNPJ nº ${dadosCnpj.cnpj}, localizada na ${dadosCnpj.logradouro}, ${dadosCnpj.numero}${complementoPj},
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
    <p style="margin: 0.15em 0;">CONTRATANTE / EMPRESA</p>
    <p style="margin: 0.15em 0;">${nomeCliente}</p>
    <p style="margin: 0.15em 0;">${cpf}</p>
  `;

  const testemunhaAssinante = document.getElementById("testemunhaAssinante");
  testemunhaAssinante.innerHTML = `
     <p style="margin: 0.15em 0;">${nomeTestemunhaSTecSenai}</p>
      <p style="margin: 0.15em 0;">${cargoTestemunhaSTecSenai}</p>
      <p style="margin: 0.15em 0;">${cpfTestemunhaSTecSenai}</p>
  `;
  
  document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "/index.html";
  });
});
