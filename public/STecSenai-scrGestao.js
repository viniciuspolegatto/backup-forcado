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
                          <th>Serviço Contratado</th>
                          <th>STARTEC Nº</th>
                          <th>Nº PASTA</th>
                          <th>STATUS</th>
                          <th>CPF</th>
                          <th>CNPJ</th>
                          <th>Razão Social</th>
                          <th>Testemunha Contrato</th>
                        </tr>
                      </thead>
                    <tbody>
            `;
            data.forEach((item) => {
                html += `
                    <tr>
                      <th>${item.ID}</td>
                      <th>${item.NomePfSenaiST}</td>
                      <th>${item.servTituloSenaiST}</td>
                      <th>${item.procStarTec}</td>
                      <th>${item.numeroPasta}</td>
                      <th>${item.statusSTecSenai}</td>
                      <th>${item.CpfPfSenaiST}</td>
                      <th>${item.cnpjPj}</td>
                      <th>${item.razaoPj}</td>
                      <th>${item.testemunhaNomeSenaiST}</td>
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


// Função para atualizar informações do cliente
document.getElementById("AtualizarClienteStatus").addEventListener("click", () => {
    const idCliente = document.getElementById("UpdateId").value;
    const numeroProcesso = document.getElementById("UpdateNoProcessoStartec").value;
    const numeroPasta = document.getElementById("UpdatePastaServidor").value;
    const status = document.getElementById("UpdateStatusStartec").value;

    // Verificação: se o idCliente não foi informado, exibe uma mensagem de erro e interrompe a função
    if (!idCliente) {
        swal("Erro", "O ID do Cliente precisa ser informado para atualizar as informações.", "error");
        return;
    }

    // Cria um objeto de atualização e só adiciona propriedades com valores preenchidos
    const updateData = { idCliente };

    if (numeroProcesso) {
        updateData.numeroProcesso = numeroProcesso;
    }
    if (numeroPasta) {
        updateData.numeroPasta = numeroPasta;
    }
    if (status) {
        updateData.status = status;
    }

    // Envia a solicitação de atualização com apenas os campos preenchidos
    fetch('/atualizarCliente', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (response.ok) {
            // Exibe mensagem de sucesso e redireciona
            swal("Atualização realizada com sucesso!", {
                icon: "success",
            }).then(() => {
                window.location.href = "STecSenai-gestao.html";
            });
        } else {
            // Exibe mensagem de erro
            swal("Erro", "Erro ao atualizar informações.", "error");
        }
    })
    .catch(error => console.error("Erro ao enviar solicitação:", error));
});




//** EXEMPLO ****************** FUNÇÃO PARA PESQUISAR E ABRIR NOVA PÁGINA *********************
document.querySelector("#botaoPesquisar").addEventListener("click", function () {
    const cpf = document.querySelector("#cpfBusca").value;

    window.location.href = `/STecSenai-pickCliente.html?cpf=${cpf}`;
});

