/* scriptColetorDeDados.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir */

// Valores declarados em função dos botões existentes na STecSenai-dadosContrato.html
const botaoBuscarCadastro = document.querySelector("#botaoBuscarCadastro");
const botaoGerarContrato = document.querySelector("#botaoGerarContrato");


// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
document.getElementById('botaoImpressaoCnpj').addEventListener('click', async function() {
  let cepBruto = document.getElementById('cep').value;
  let cnpjBruto = document.getElementById('cnpj').value;
  const nomeCliente = document.getElementById('nomeClienteForm').value;
  const cpfBruto = document.getElementById('cpf').value;
  const numeroResidencia = document.getElementById('numeroResidencia').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const servicoSelecionado = document.getElementById('listaDeServicos').value;
  const testemunhaSelecionada = document.getElementById("listaDeTestemunhas");
  const testemunhaDados = testemunhaSelecionada.value; // Obtém o valor selecionado
  
  
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
  const servicoDetalhes = servicoSelecionado.split(" | "); // formato apresentado em STecSenai-scrApiProd.js
  const servicoFamilia = servicoDetalhes[0];
  const servicoTitulo = servicoDetalhes[1];  
  const servicoRae = servicoDetalhes[2];
  const servicoRM = servicoDetalhes[3];
  const servicoValor = servicoDetalhes[4];
  const servicoTipo = servicoDetalhes[5];
  const servicoQhora = servicoDetalhes[6];
  const servicoModalidade = servicoDetalhes[7];
  

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
    document.getElementById('empresa-logradouro').textContent = dataCnpj.logradouro;
    document.getElementById('empresa-municipio').textContent = dataCnpj.municipio;
    document.getElementById('empresa-situacao').textContent = dataCnpj.situacao;
    document.getElementById('telefone-td').textContent = telefonePj;
    document.getElementById('endereco-td').textContent = `${dataCep.logradouro}, ${dataCep.bairro}, ${dataCep.localidade} - ${dataCep.uf}`;
    document.getElementById('cep-td').textContent = dataCep.cep;
    document.getElementById('nome-cliente-td').textContent = nomeCliente;
    document.getElementById('cpf-td').textContent = cpf;
    document.getElementById('numero-residencia-td').textContent = numeroResidencia;
    document.getElementById('telefone-contato-td').textContent = telefone;
    document.getElementById('email-td').textContent = email;
    document.getElementById('servico-td').textContent = `${servicoTitulo} - ${servicoQhora} H - ${servicoModalidade}`;
    document.getElementById("testemunha-td").textContent = testemunhaNome;

    document.getElementById('data-table').style.display = 'block';

// Armazenar os dados no localStorage para ser usado na nova janela de contrato
    localStorage.setItem('dadosCnpj', JSON.stringify(dataCnpj));
    localStorage.setItem('cepDigitado', JSON.stringify(dataCep)); // Armazenar dados do CEP como JSON
    localStorage.setItem('nomeCliente', nomeCliente);
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('numeroResidencia', numeroResidencia);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('email', email);

    localStorage.setItem('complementoPj', complementoPj);
    localStorage.setItem('fantasiaPj',fantasiaPj);
    localStorage.setItem('telefonePj',telefonePj);
    localStorage.setItem('emailPj',emailPj);
    
    localStorage.setItem('servicoFamilia', servicoFamilia);
    localStorage.setItem('servicoTitulo', servicoTitulo);
    localStorage.setItem('servicoRae', servicoRae);
    localStorage.setItem('servicoRM', servicoRM);
    localStorage.setItem('servicoValor', servicoValor);
    localStorage.setItem('servicoTipo', servicoTipo);
    localStorage.setItem('servicoQhora', servicoQhora);
    localStorage.setItem('servicoModalidade', servicoModalidade);
    
    localStorage.setItem('testemunhaNome', testemunhaNome);
    localStorage.setItem('testemunhaCargo', testemunhaCargo);
    localStorage.setItem('testemunhaCpf', testemunhaCpf);
    

/*  
// **** ENVIA OS DADOS PARA O SERVIDOR------------------------------------------------------------------------------- 
CLIENTE: nomeCliente, cpf, nasc., cep, num., muni, bairro, telef, 
PRODUTO: RM, RAE, nomeProd, Valor, CHor,
GESTAO: numPasta, numProcStarTec, nomeTest, cpfTmunha, cargoTmunha, especialista, telEspec., Inicio
CNPJ: razSoc, nomFant, cepPj, numPj, muniPj, bairroPj, telPj */
       
 
    const data = {
        info01: nomeCliente,
        info02: cpf,
        info03: email,
        info04: dataCnpj.cnpj,
        info05: fantasiaPj
    };

// *********** CONEXÃO COM O BANCO DE DADOS E RETORNO DO SERVIDOR **********
  
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
  
  
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os dados. Por favor, verifique as informações digitadas e tente novamente.");
  }

//-----------------------------------------------------------
}); // FIM DO ADD EVENT LISTENER


botaoBuscarCadastro.addEventListener("click", function() {
    const senha = prompt("Digite a senha para acessar a busca de cadastro:");
    const senhaCorreta = "Sebrae@123";

    if (senha === senhaCorreta) {
        window.location.href = "STecSenai-consumir.html";
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
});

// Adiciona o evento de clique para o botão Gerar Contrato
botaoGerarContrato.addEventListener("click", function() {
    // Redireciona para a página de contrato
    window.location.href = "STecSenai-contrato.html";
});
