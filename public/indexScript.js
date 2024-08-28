function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado
      const contador4722 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4722"
      ).length;

      const contador4727 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4727"
      ).length;

      const contador4724 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4724"
      ).length;

      const contador4725 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4725"
      ).length;

      const contador4780 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4780"
      ).length;

      const contador4790 = data.filter(
        (item) => item.nascimentoPfSenaiST === "4790"
      ).length;

      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome4722").textContent = 40 - contador4722;
      document.querySelector("#contadorNome4727").textContent = 1 - contador4727;
      document.querySelector("#contadorNome4724").textContent = 10 - contador4724;
      document.querySelector("#contadorNome4725").textContent = 0 - contador4725;
      document.querySelector("#contadorNome4780").textContent = 10 - contador4780;
      document.querySelector("#contadorNome4790").textContent = 10 - contador4790;

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
