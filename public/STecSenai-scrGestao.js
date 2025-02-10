document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/auth", { credentials: "include" });
        const data = await response.json();

        if (!data.authenticated) {
            sessionStorage.removeItem("authenticatedUser"); // Remove qualquer dado de sessão
            window.location.href = "login.html"; // Redireciona para login
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        window.location.href = "login.html";
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Garante que os cookies de sessão sejam enviados
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem("authenticatedUser", username); // Salva no navegador
                alert("Login bem-sucedido!");
                window.location.href = "STecSenai-gestao.html";
            } else {
                alert("Usuário ou senha incorretos");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar ao servidor");
        }
    });
});


document.getElementById("logout").addEventListener("click", async () => {
    try {
        const response = await fetch("/logout", { method: "POST", credentials: "include" });

        if (response.ok) {
            sessionStorage.removeItem("authenticatedUser"); // Remove do sessionStorage
            document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "index.html";
        } else {
            alert("Erro ao realizar logout");
        }
    } catch (error) {
        console.error("Erro ao processar logout:", error);
    }
});





// Carregar dados ao iniciar a página
carregarDados();

// Função para carregar dados existentes
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarCadastroClientes")
        .then((response) => response.json())
        .then((data) => {
            console.log("Dados recebidos:", data);
      
          // Ordena os dados em ordem decrescente de ID
            data.sort((a, b) => b.ID - a.ID);
      
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

            // Exibe o corpo da página após carregar os dados
            document.body.style.display = 'block';

        })
        .catch((error) => console.error("Error ao carregar dados:", error));
}

// Função para atualizar informações do cliente
document.getElementById("AtualizarClienteStatus").addEventListener("click", () => {
    const idCliente = document.getElementById("UpdateId").value;
    const numeroProcesso = document.getElementById("UpdateNoProcessoStartec").value;
    const numeroPasta = document.getElementById("UpdatePastaServidor").value;
    const status = document.getElementById("UpdateStatusStartec").value;

    if (!idCliente) {
        swal("Erro", "O ID do Cliente precisa ser informado para atualizar as informações.", "error");
        return;
    }

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

    fetch('/atualizarCliente', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (response.ok) {
            swal("Atualização realizada com sucesso!", {
                icon: "success",
            }).then(() => {
                window.location.href = "STecSenai-gestao.html";
            });
        } else {
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
