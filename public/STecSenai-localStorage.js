// STecSenai-localStorage.js

// Função para obter os dados do localStorage lá no scriptColetorDeDados.js (Stringfy)
function obterDadosContrato() {
    const dados = localStorage.getItem('dadosContrato');
    return dados ? JSON.parse(dados) : null;
}

/* ******************** OPÇÕES DE DADOS DA STRING dados ****
    
    nome,                estadoPf          estadoPj          cnpjPj              testemunhaSenai,
    cpf,                 cep               cepPj             razaoPj
    nasc,                telefone          situacaoPj        fantasiaPj
    logradouroPf,        email             telefonePj        logradouroPj
    numPf,               STecSenai         emailPj           numPj
    bairroPf,            cidadePf,         municipioPj       bairroPj
   
********************************************************* */

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
