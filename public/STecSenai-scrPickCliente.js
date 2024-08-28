// Script STecSenai-scrPickCliente.js para listar os CPF's cadastrados

// Função para obter os parâmetros da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const cpf = getQueryParam("cpf");


fetch(`/buscarPorCpf/${cpf}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Detalhes recebidos:", data);
    let html = "<ul>";
    data.forEach((item) => {
      html += `
      <li>ID_Contrato: ${item.ID_Contrato} <b>||</b> TESTEMUNHA: ${item.testemunhaNomeSenaiST} <b>||</b> RAE: ${item.servRaeSenaiST}
      <br><b>||</b> SERVIÇO: ${item.servTituloSenaiST}
      <br><b>||</b> CLIENTE: ${item.NomePfSenaiST} <b>||</b> MUNICIPIO: ${item.municipioPfSenaiST} <b>||</b> TELEFONE PF: ${item.telefonePfSenaiST} <b>||</b> E-MAIL: ${item.emailPfSenaiST}
      <br><b>||</b> CNPJ: ${item.cnpjPj} <b>||</b> RAZÃO SOC. ${item.razaoPj}  <p /> </li>`;
    });
    html += "</ul>";
    document.querySelector("#resultados").innerHTML = html;
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));



document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const idContrato = document.querySelector("#consumirSTecSenai").value;
  
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
});



/*
document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const id_consumir = document.querySelector("#consumirSTecSenai").value;
    console.log("Pesquisando ID do contrato a consumir:", id_consumir);
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_consumir=${id_consumir}`;


  
<!--  NomePfSenaiST, CpfPfSenaiST, nascimentoPfSenaiST, telefonePfSenaiST, emailPfSenaiST, cepPfSenaiST, logradouroPfSenaiST, numeroResidenciaPfSenaiST, 
  bairroPfSenaiST, , , testemunhaCargoSenaiST, testemunhaCpfSenaiST, ServFamiliaSenaiST, , 
  , servRMSenaiST, servValorSenaiST, servTipoSenaiST, servQhoraSenaiST, servModalidadeSenaiST, , , fantasiaPj, atividadePj, 
  telefonePj, emailPj, socioPj, situacaoPj, logradouroPj, numeroPj, complementoPj, bairroPj, municipioPj -->
  
  */