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
let servPublicoSenaiSTVar
let servQhoraSenaiSTVar;
let servModalidadeSenaiSTVar;
let fantasiaPjVar;
let portePjVar;
let atividadePjVar;
let telefonePjVar;
let emailPjVar;
let socioPjVar;
let situacaoPjVar;
let logradouroPjVar;
let numeroPjVar;
let complementoPjVar;
let bairroPjVar;
let municipioPjVar;
let ServFamiliaSenaiSTVar;
let cepPfSenaiSTVar;
let logradouroPfSenaiSTVar
let numeroResidenciaPfSenaiSTVar;
let bairroPfSenaiSTVar;
let nascimentoPfSenaiSTVar;



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
      servPublicoSenaiSTVar = item.servPublicoSenaiST;
      servQhoraSenaiSTVar = item.servQhoraSenaiST;
      servModalidadeSenaiSTVar = item.servModalidadeSenaiST;
      
      cnpjPjVar = item.cnpjPj;
      razaoPjVar = item.razaoPj;
      fantasiaPjVar = item.fantasiaPj;
      portePjVar = item.VAR1;
      atividadePjVar = item.atividadePjVar = item.atividadePj;
      telefonePjVar = item.telefonePj
      emailPjVar = item.emailPj;
      socioPjVar = item.socioPj;
      situacaoPjVar = item.situacaoPj;
      logradouroPjVar = item.logradouroPj;
      numeroPjVar = item.numeroPj;
      complementoPjVar = item.complementoPj;
      bairroPjVar = item.bairroPj;
      municipioPjVar = item.municipioPj;
      ServFamiliaSenaiSTVar = item.ServFamiliaSenaiST;
      cepPfSenaiSTVar = item.cepPfSenaiST;
      logradouroPfSenaiSTVar = item.logradouroPfSenaiST;
      numeroResidenciaPfSenaiSTVar = item.numeroResidenciaPfSenaiST;
      bairroPfSenaiSTVar = item.bairroPfSenaiST;
      nascimentoPfSenaiSTVar = item.nascimentoPfSenaiST;
      
      
      // Exibir informações na página, se necessário
      let html = `
        <ul>
          <li>ID_Contrato: ${idContratoVar}</li>
          <li>CLIENTE: ${nomePfSenaiSTVar}</li>
          <li>CPF: ${CpfPfSenaiSTVar}</li>
          <li>TELEFONE PF: ${telefonePfSenaiSTVar}</li>
          <li>E-MAIL: ${emailPfSenaiSTVar}</li>
          <li>MUNICÍPIO: ${municipioPfSenaiSTVar}</li>     
          <li> --------------------------------------------------------------</li>
          <li>SERVIÇO: ${servTituloSenaiSTVar}</li>
          <li>TESTEMUNHA: ${testemunhaNomeSenaiSTVar}</li>
          <li>MODALIDADE: ${servModalidadeSenaiSTVar}</li>
          <li>CARGA HR.: ${servQhoraSenaiSTVar}</li>
          <li>RAE: ${servRaeSenaiSTVar}</li>
          <li>RM: ${servRMSenaiSTVar}</li>
          <li>VALOR: R$ ${servValorSenaiSTVar}</li>
          <li>PÚBLICO: ${servPublicoSenaiSTVar}</li> 
          <li>PARA PORTES: ${servTipoSenaiSTVar}</li>      
          <li> --------------------------------------------------------------</li>
          <li>CNPJ: ${cnpjPjVar}</li>
          <li>PORTE: ${portePjVar}</li>
          <li>RAZÃO SOCIAL: ${razaoPjVar}</li>
          <li>NOME FANTASIA: ${fantasiaPjVar}</li>
          <li>ATIVIDADE PRINCIPAL: ${atividadePjVar}</li>
        </ul>
      `;
      document.querySelector("#informacoes").innerHTML = html;
    } else {
      console.log("Nenhum dado encontrado para o ID_Contrato fornecido.");
      alert("Nenhum dado encontrado para o ID_Contrato fornecido.");
    }
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));


//***********************************************************************************

// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
document.getElementById('confirmarConsumo').addEventListener('click', async function() {
  let ID_Contrato = idContratoVar


// **** ENVIA OS DADOS PARA O SERVIDOR------------------------------------------------------------------------------- 

    const data = {
        info01: idContratoVar,
        info02: nomePfSenaiSTVar, 
        info03: CpfPfSenaiSTVar,
        info04: nascimentoPfSenaiSTVar,
        info05: telefonePfSenaiSTVar,
        info06: emailPfSenaiSTVar,
        info07: cepPfSenaiSTVar,
        info08: logradouroPfSenaiSTVar,
        info09: numeroResidenciaPfSenaiSTVar,
        info10: bairroPfSenaiSTVar,
        info11: municipioPfSenaiSTVar,

        info12: testemunhaNomeSenaiSTVar,
        info13: testemunhaCargoSenaiSTVar,
        info14: testemunhaCpfSenaiSTVar,

        info15: ServFamiliaSenaiSTVar,
        info16: servTituloSenaiSTVar,
        info17: servRaeSenaiSTVar,
        info18: servRMSenaiSTVar,
        info19: servValorSenaiSTVar,
        info20: servTipoSenaiSTVar,
        info21: servPublicoSenaiSTVar,
        info22: servQhoraSenaiSTVar,
        info23: servModalidadeSenaiSTVar,

        info24: cnpjPjVar,
        info25: razaoPjVar,
        info26: fantasiaPjVar,
        info27: atividadePjVar,
        info28: telefonePjVar,
        info29: emailPjVar,
        info30: socioPjVar,
        info31: situacaoPjVar,
        info32: logradouroPjVar,
        info33: numeroPjVar,
        info34: complementoPjVar,
        info35: bairroPjVar,
        info36: municipioPjVar,
        info37: "preencher",
        info38: "preencher",
        info39: "preencher"
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
