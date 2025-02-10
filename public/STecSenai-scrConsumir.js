// ********************* Verificação de autenticação *****************
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

// ******************************** FIM LOGIN ************************


carregarDados(); // Carregar os dados depois que a senha for verificada

// Função para carregar dados existentes
function carregarDados() {
    console.log("Carregando dados cadastrados...");

    fetch("/buscarContrato")
        .then((response) => response.json())
        .then((data) => {
  
      // Ordena os dados em ordem decrescente do ID_Contrato
            data.sort((a, b) => b.ID_Contrato - a.ID_Contrato);      
      
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
                          <th style="width: 200px;">Telefone PJ</th>
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
                      <td style="width: 200px;">${item.telefonePj}</td>
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
