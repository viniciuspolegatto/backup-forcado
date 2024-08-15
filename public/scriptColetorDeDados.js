/* scriptColetorDeDados.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir */

// Valores declarados em função dos botões existentes na STecSenai-dadosContrato.html
const botaoBuscarCadastro = document.querySelector("#botaoBuscarCadastro");
const botaoGerarContrato = document.querySelector("#botaoGerarContrato");


// Ação de coleta e armazenagem de dados da página STecSenai-dadosContrato.html
document.getElementById('botaoImpressaoCnpj').addEventListener('click', async function() {
  const cepDigitado = document.getElementById('cep').value;
  const cnpjDigitado = document.getElementById('cnpj').value;
  const nomeCliente = document.getElementById('nomeClienteForm').value;
  const cpf = document.getElementById('cpf').value;
  const numeroResidencia = document.getElementById('numeroResidencia').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const servico = document.getElementById('servicos').value;
  const testemunhaSTecSenai = document.getElementById('testemunhaSTecSenai');

// Valida se nome, cpf e telefone estão preenchidos
    if (!nomeCliente || !cpf || !telefone) {
      alert("Preencha Nome, CPF e Telefone");
      return; // Impede o envio dos dados
    }
  
  try {
    let resCep = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`);
    let dataCep = await resCep.json();

    if (dataCep.erro) {
      throw new Error("CEP não encontrado");
    }

    let resCnpj = await fetch(`/cnpj/${cnpjDigitado}`);
    let dataCnpj = await resCnpj.json();
  
// Função para corrigir o nome fantasia, telefone Email e QSA da PJ caso não tenha -------------------------------------------------

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
    document.getElementById('servico-td').textContent = servico;

    document.getElementById('data-table').style.display = 'block';

// Armazenar os dados no localStorage para ser usado na nova janela de contrato
    localStorage.setItem('dadosCnpj', JSON.stringify(dataCnpj));
    localStorage.setItem('cepDigitado', JSON.stringify(dataCep)); // Armazenar dados do CEP como JSON
    localStorage.setItem('nomeCliente', nomeCliente);
    localStorage.setItem('cpf', cpf);
    localStorage.setItem('numeroResidencia', numeroResidencia);
    localStorage.setItem('telefone', telefone);
    localStorage.setItem('email', email);
    localStorage.setItem('servico', servico);
    localStorage.setItem('fantasiaPj',fantasiaPj);
    localStorage.setItem('telefonePj',telefonePj);
    localStorage.setItem('emailPj',emailPj);
  
  } catch (error) {
    console.error(error);
    alert("Erro ao buscar os dados. Por favor, verifique as informações digitadas e tente novamente.");
  }
  

// **** ENVIA OS DADOS PARA O SERVIDOR------------------------------------------------------------------------------- 
    const data = {
        info01: nomeCliente,
        info02: cpf,
        info03: email,
        info04: telefone,
        info05: servico
    };

      try {
            const response = await fetch('/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Outros cabeçalhos podem ser necessários, como tokens de autenticação
                },
                body: JSON.stringify(data)
            });
        
           console.log('Resposta do servidor:', response);

            if (!response.ok) {
                throw new Error('Erro ao tentar salvar os dados: ' + response.statusText);
            }

            const result = await response.json();
            console.log('Dados salvos com sucesso:', result);
            alert('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer POST:', error);
            alert('DADOS SALVOS !');
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
