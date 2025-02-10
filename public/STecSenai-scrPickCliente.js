// Script STecSenai-scrPickCliente.js para listar os CPF's cadastrados

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



// Função para obter os parâmetros da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const nomeCliente = getQueryParam("nomeCliente");


fetch(`/buscarPorNome/${nomeCliente}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Detalhes recebidos:", data);
    let html = "<ul>";
    data.forEach((item) => {
      html += `
      <li>ID_Contrato: ${item.ID_Contrato} <b>||</b> TESTEMUNHA: ${item.testemunhaNomeSenaiST} <b>||</b> RAE: ${item.servRaeSenaiST}
      <br><b>||</b> SERVIÇO: ${item.servTituloSenaiST}
      <br><b>||</b> CLIENTE: ${item.NomePfSenaiST} <b>||</b> MUNICIPIO: ${item.municipioPfSenaiST} <b>||</b> TELEFONE PF: ${item.telefonePfSenaiST} <b>||</b> E-MAIL: ${item.emailPfSenaiST}
      <br><b>||</b> CNPJ: ${item.cnpjPj} <b>||</b> RAZÃO SOC. ${item.razaoPj}  <p /> </li>`;
    });
    html += "</ul>";
    document.querySelector("#resultados").innerHTML = html;
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));



document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const idContrato = document.querySelector("#consumirSTecSenai").value;
  
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
});



/* *********************************** Versão para buscar por CPF ** - Edite no Server.js e no STecSenai - scrConsumir.js
const cpf = getQueryParam("cpf");

fetch(`/buscarPorCpf/${cpf}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Detalhes recebidos:", data);
    let html = "<ul>";
    data.forEach((item) => {
      html += `
      <li>ID_Contrato: ${item.ID_Contrato} <b>||</b> TESTEMUNHA: ${item.testemunhaNomeSenaiST} <b>||</b> RAE: ${item.servRaeSenaiST}
      <br><b>||</b> SERVIÇO: ${item.servTituloSenaiST}
      <br><b>||</b> CLIENTE: ${item.NomePfSenaiST} <b>||</b> MUNICIPIO: ${item.municipioPfSenaiST} <b>||</b> TELEFONE PF: ${item.telefonePfSenaiST} <b>||</b> E-MAIL: ${item.emailPfSenaiST}
      <br><b>||</b> CNPJ: ${item.cnpjPj} <b>||</b> RAZÃO SOC. ${item.razaoPj}  <p /> </li>`;
    });
    html += "</ul>";
    document.querySelector("#resultados").innerHTML = html;
  })
  .catch((error) => console.error("Error ao buscar detalhes:", error));

document.querySelector("#consumirPickCliente").addEventListener("click", function () {
    const idContrato = document.querySelector("#consumirSTecSenai").value;
  
    window.location.href = `/STecSenai-enviaBdConsumir.html?id_contrato=${idContrato}`;
});
******************************************************************************************************************** */