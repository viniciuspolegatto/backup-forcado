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
                <table>
                    <thead>
                        <tr>
                            <th style="width: 050px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">ID_Contrato</th>
                            <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Nome</th>
                            <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">CPF</th>
                            <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Município</th>
                            <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Telefone</th>
                            <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Razão Social</th>
                            <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Nome Fantasia</th>
                            <th style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Município PJ</th>
                            <th style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">Telefone PJ</th>
                            <th style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">E-mail Pessoal</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                        <td style="width: 050px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.ID_Contrato}</td>                           
                        <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.NomePfSenaiST}</td>
                        <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.CpfPfSenaiST}</td>
                        <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.municipioPfSenaiST}</td>
                        <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.telefonePfSenaiST}</td>
                        <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.razaoPj}</td>
                        <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.fantasiaPj}</td>
                        <td style="width: 100px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.municipioPj}</td>
                        <td style="width: 120px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.telefonePj}</td>
                        <td style="width: 150px; max-height: 50px; text-align: left; word-wrap: break-word;white-space: pre-wrap; overflow: hidden;">${item.emailPfSenaiST}</td>
                    </tr>
                `;
            });
            html += `
                </tbody>
            </table>
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