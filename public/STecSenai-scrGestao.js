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