function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado
      const contador42567 = data.filter(
        (item) => item.servRMSenaiST === "42567"
      ).length;

      const contador42568 = data.filter(
        (item) => item.servRMSenaiST === "42568"
      ).length;

      const contador40864 = data.filter(
        (item) => item.servRMSenaiST === "40864"
      ).length;

      const contador40865 = data.filter(
        (item) => item.servRMSenaiST === "40865"
      ).length;

      const contador40866 = data.filter(
        (item) => item.servRMSenaiST === "40866"
      ).length;

      const contador42569 = data.filter(
        (item) => item.servRMSenaiST === "42569"
      ).length;

      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome42567").textContent = 40 - contador42567;
      document.querySelector("#contadorNome42568").textContent = 1 - contador42568;
      document.querySelector("#contadorNome40864").textContent = 10 - contador40864;
      document.querySelector("#contadorNome40865").textContent = 0 - contador40865;
      document.querySelector("#contadorNome40866").textContent = 10 - contador40866;
      document.querySelector("#contadorNome42569").textContent = 10 - contador42569;

      // Armazena em variáveis para uso posterior
      // Exemplo:
      // const total4722 = contador4722;
      // const total4727 = contador4727;
      // E assim por diante...

    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}

// Chama a função para carregar os dados ao iniciar a página
carregarDados();
