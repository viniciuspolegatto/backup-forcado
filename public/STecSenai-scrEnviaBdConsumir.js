// Função para obter os parâmetros da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Obtém o ID_Contrato da URL
const idContrato = getQueryParam("id_contrato");
console.log("Buscando detalhes para ID_Contrato:", idContrato);

// Variáveis para armazenar os dados
let idContratoVar;
let testemunhaNomeSenaiSTVar;
let servRaeSenaiSTVar;
let servTituloSenaiSTVar;
let nomePfSenaiSTVar;
let municipioPfSenaiSTVar;
let telefonePfSenaiSTVar;
let emailPfSenaiSTVar;
let cnpjPjVar;
let razaoPjVar;
let servRMSenaiSTVar;
let CpfPfSenaiSTVar;
let testemunhaCargoSenaiSTVar;
let testemunhaCpfSenaiSTVar;
let servValorSenaiSTVar;
let servTipoSenaiSTVar;
let servQhoraSenaiSTVar;
let fantasiaPjVar;


fetch(`/buscarPorIdContrato/${idContrato}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Detalhes recebidos:", data);

    // Armazenar dados nas variáveis
    if (data.length > 0) {
      const item = data[0]; // Considera o primeiro item (ou ajuste conforme a lógica desejada)

      idContratoVar = item.ID_Contrato;
      nomePfSenaiSTVar = item.NomePfSenaiST;
      CpfPfSenaiSTVar = item.CpfPfSenaiST;
      municipioPfSenaiSTVar = item.municipioPfSenaiST;
      telefonePfSenaiSTVar = item.telefonePfSenaiST;
      emailPfSenaiSTVar = item.emailPfSenaiST;
      
      testemunhaNomeSenaiSTVar = item.testemunhaNomeSenaiST;
      testemunhaCargoSenaiSTVar = item.testemunhaCargoSenaiST;
      testemunhaCpfSenaiSTVar = item.testemunhaCpfSenaiST;
      servTituloSenaiSTVar = item.servTituloSenaiST;      
      servRaeSenaiSTVar = item.servRaeSenaiST;
      servRMSenaiSTVar = item.servRMSenaiST;
      servValorSenaiSTVar = item.servValorSenaiST;
      servTipoSenaiSTVar = item.servTipoSenaiST;
      servQhoraSenaiSTVar = item.servQhoraSenaiST;
      
      cnpjPjVar = item.cnpjPj;
      razaoPjVar = item.razaoPj;
      fantasiaPjVar = item.fantasiaPj;
      
      
      // Exibir informações na página, se necessário
      let html = `
        <ul>
          <li>ID_Contrato: ${idContratoVar}</li>
          <li>TESTEMUNHA: ${testemunhaNomeSenaiSTVar}</li>
          <li>RAE: ${servRaeSenaiSTVar}</li>
          <li>SERVIÇO: ${servTituloSenaiSTVar}</li>
          <li>CLIENTE: ${nomePfSenaiSTVar}</li>
          <li>MUNICÍPIO: ${municipioPfSenaiSTVar}</li>
          <li>TELEFONE PF: ${telefonePfSenaiSTVar}</li>
          <li>E-MAIL: ${emailPfSenaiSTVar}</li>
          <li>CNPJ: ${cnpjPjVar}</li>
          <li>RAZÃO SOCIAL: ${razaoPjVar}</li>
        </ul>
      `;
      document.querySelector("#informacoes").innerHTML = html;
    } else {
      console.log("Nenhum dado encontrado para o ID_Contrato fornecido.");
    }
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));


//***********************************************************************************

// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
document.getElementById('confirmarConsumo').addEventListener('click', async function() {
  let ID_Contrato = idContratoVar




// **** ENVIA OS DADOS PARA O SERVIDOR------------------------------------------------------------------------------- 

    const data = {
        info01: nomePfSenaiSTVar, 
        info02: CpfPfSenaiSTVar,
        info03: "Teste", //nascimentoPfSenaiSTVar
        info04: telefonePfSenaiSTVar,
        info05: emailPfSenaiSTVar,
        info06: "Teste", //cepPfSenaiSTVar
        info07: "Teste", //logradouroPfSenaiSTVar
        info08: "Teste", //numeroResidenciaPfSenaiSTVar
        info09: "Teste", //bairroPfSenaiSTVar
        info10: municipioPfSenaiSTVar,

        info11: testemunhaNomeSenaiSTVar,
        info12: testemunhaCargoSenaiSTVar,
        info13: testemunhaCpfSenaiSTVar,

        info14: "Teste", //ServFamiliaSenaiSTVar
        info15: servTituloSenaiSTVar,
        info16: servRaeSenaiSTVar,
        info17: servRMSenaiSTVar,
        info18: servValorSenaiSTVar,
        info19: servTipoSenaiSTVar,
        info20: servQhoraSenaiSTVar,
        info21: "Teste", //servModalidadeSenaiSTVar

        info22: cnpjPjVar,
        info23: razaoPjVar,
        info24: fantasiaPjVar,
        info25: "Teste", //atividadePj
        info26: "Teste", //telefonePj
        info27: "Teste", //emailPj
        info28: "Teste", //socioPj
        info29: "Teste", //situacaoPj
        info30: "Teste", //logradouroPj
        info31: "Teste", //numeroPj
        info32: "Teste", //complementoPj
        info33: "Teste", //bairroPj
        info34: "Teste"  //municipioPj
    };

  
  
// *********** CONEXÃO COM O BANCO DE DADOS E RETORNO DO SERVIDOR **********
  
fetch('/addCliente', {
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
        // Use SweetAlert para mostrar a mensagem centralizada
        swal("Cadastro realizado com sucesso!", {
            icon: "success",
        }).then(() => {
            // Redireciona para a página index.html após o usuário clicar em OK
            window.location.href = "index.html";
        });
    }
})
.catch(error => {
    console.error('Error:', error);
    swal("Erro ao realizar o cadastro: " + error.message, {
        icon: "error",
    });
});

  
//-----------------------------------------------------------
}); // FIM DO ADD EVENT LISTENER
