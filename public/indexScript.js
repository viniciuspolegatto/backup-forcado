function carregarDados() {
  console.log("Carregando dados cadastrados...");

  fetch("/buscarCadastroClientes")
    .then((response) => response.json())
    .then((data) => {
      // Filtra os dados e conta cada item desejado lá no banco de dados
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
    
      // Do contador é substituído o saldo inicial
      let total42567 = 40 - contador42567;
      let total42568 = 10 - contador42568;
      let total40864 = 10 - contador40864;
      let total40865 = 0 - contador40865;
      let total40866 = 10 - contador40866;
      let total42569 = 10 - contador42569;

    
      // Atualiza os elementos HTML ou armazena em variáveis conforme necessário
      document.querySelector("#contadorNome42567").textContent = total42567;
      document.querySelector("#contadorNome42568").textContent = total42568;
      document.querySelector("#contadorNome40864").textContent = total40864;
      document.querySelector("#contadorNome40865").textContent = total40865;
      document.querySelector("#contadorNome40866").textContent = total40866;
      document.querySelector("#contadorNome42569").textContent = total42569;

 
      // Armazenar os dados no localStorage para ser usado na nova janela de contrato
      localStorage.setItem('total42567', total42567);
      localStorage.setItem('total42568', total42568);
      localStorage.setItem('total40864', total40864);
      localStorage.setItem('total40865', total40865);
      localStorage.setItem('total40866', total40866);
      localStorage.setItem('total42569', total42569);
  

    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}

// Chama a função para carregar os dados ao iniciar a página
carregarDados();
