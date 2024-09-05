// Função para verificar a senha antes de acessar o conteúdo
function verificarSenha() {
    const senhaCorreta = "Sebrae@123";
    let senhaDigitada = prompt("Digite a senha para acessar:");

    if (senhaDigitada === senhaCorreta) {
        document.querySelector("body").style.display = "block";
    } else {
        // Redireciona para lounge se a senha estiver incorreta
        alert("Senha incorreta!");
        window.location.href = "/STecSenai-lounge.html";
    }
}

// Oculta o conteúdo da página até que a senha seja verificada
document.querySelector("body").style.display = "none";
verificarSenha();

// Função para carregar dados existentes (mantenha o restante do código existente aqui)
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarCadastroClientes")
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados recebidos:", data);
            let html = `
              <div class="table-container">
                <table>
                    <thead>
                        <tr>
                          <th>ID CLIENTE</th>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>CNPJ</th>
                          <th>Razão Social</th>
                          <th>Serviço Contratado</th>
                          <th>Testemunha Contrato</th>
                          <th>STARTEC Nº</th>
                          <th>Nº PASTA</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                      <th>${item.ID}</td>
                      <th>${item.NomePfSenaiST}</td>
                      <th>${item.CpfPfSenaiST}</td>
                      <th>${item.cnpjPj}</td>
                      <th>${item.razaoPj}</td>
                      <th>${item.servTituloSenaiST}</td>
                      <th>${item.testemunhaNomeSenaiST}</td>
                      <th>${item.procStarTec}</td>
                      <th>${item.numeroPasta}</td>
                      <th>${item.statusSTecSenai}</td>
                    </tr>
                `;
            });
            html += `
                    </tbody>
                </table>
              </div>
            `;
            document.querySelector("#listaClientes").innerHTML = html;

        })
        .catch((error) => console.error("Error ao carregar dados:", error));
}

// Carregar dados ao iniciar a página
carregarDados();

document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;

    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
});





/* *********************************************************************************************
// Função para carregar dados existentes
function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      console.log("Dados recebidos:", data);
      let html = `
                        <table>
                            <thead>
                                <tr>
                                  <th style="width: 050px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">ID_CLIENTE</th>
                                  <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Nome</th>
                                  <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">CPF</th>
                                  <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">CNPJ</th>
                                  <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Serviço Contratado</th>
                                  <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Código RAE</th>
                                  <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Testemunha Contrato</th>
                                  <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Telefone</th>
                                  <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Razão Social</th>
                                  <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Nome Fantasia</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
      data.forEach((item) => {
        html += `
                            <tr>
                                <td style="width: 050px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.ID}</td>                           
                                <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.NomePfSenaiST}</td>
                                <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.CpfPfSenaiST}</td>
                                <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.cnpjPj}</td>
                                <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.servTituloSenaiST}</td>
                                <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.servRaeSenaiST}</td>
                                <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.testemunhaNomeSenaiST}</td>
                                <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.telefonePfSenaiST}</td>
                                <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.razaoPj}</td>
                                <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.fantasiaPj}</td>
                            </tr>
                        `;
      });
      html += `
                            </tbody>
                        </table>
                    `;
      document.querySelector("#listaClientes").innerHTML = html;


    })
    .catch((error) => console.error("Error ao carregar dados:", error));
}

// Carregar dados ao iniciar a página
carregarDados();

document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;
  
    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
  });
*************************************************************************************************************** */