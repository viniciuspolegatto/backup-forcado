// Função para verificar a senha antes de acessar o conteúdo
function verificarSenha() {
    const senhaCorreta = "Sebrae@123";
    let senhaDigitada = prompt("Digite a senha para acessar:");

    if (senhaDigitada === senhaCorreta) {
        document.getElementById("conteudo").style.display = "block";
        document.getElementById("mensagem").style.display = "none";
        carregarDados(); // Carregar os dados depois que a senha for verificada
    } else {
        alert("Senha incorreta!");
        window.location.href = "/STecSenai-lounge.html";
    }
}

// Função para carregar dados existentes
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarContrato")
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados recebidos:", data);
            let html = `
              <div class="table-container">
                <table>
                    <thead>
                        <tr>
                          <th>ID Contrato</th>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Município</th>
                          <th>Telefone</th>
                          <th>Razão Social</th>
                          <th>Nome Fantasia</th>
                          <th>Município PJ</th>
                          <th>Telefone PJ</th>
                          <th>E-mail Pessoal</th>                        

                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                      <td>${item.ID_Contrato}</td>
                      <td>${item.NomePfSenaiST}</td>
                      <td>${item.CpfPfSenaiST}</td>
                      <td>${item.municipioPfSenaiST}</td>
                      <td>${item.telefonePfSenaiST}</td>
                      <td>${item.razaoPj}</td>
                      <td>${item.fantasiaPj}</td>
                      <td>${item.municipioPj}</td>
                      <td>${item.telefonePj}</td>
                      <td>${item.emailPfSenaiST}</td>
                     </tr>
                `;
            });
            html += `
                </tbody>
            </table>
            </div>
            `;
            document.querySelector("#listaDados").innerHTML = html;
        })
        .catch((error) => console.error("Error ao carregar dados:", error));
}

// Verifica a senha e exibe o conteúdo ao carregar o script
verificarSenha();

// Adiciona o evento de clique no botão de pesquisa
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const nomeCliente = document.querySelector("#nomeBusca").value;

    // Verifica se o comprimento do nomeCliente é pelo menos 3 caracteres
    if (nomeCliente.length < 3) {
        alert("A busca deve conter pelo menos 3 caracteres.");
        return; // Impede a navegação para a nova página
    }

    // Caso o nomeCliente tenha 3 ou mais caracteres, continua com a navegação
    window.location.href = `/STecSenai-pickCliente.html?nomeCliente=${encodeURIComponent(nomeCliente)}`;
});



/* *********************** Rota para buscar por CPF - Edite no Server.js e no STecSenai - scrPickCliente.js também ***********
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;
  
    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
  });

***************************************************************************************************************** */