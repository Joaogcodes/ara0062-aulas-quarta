document.addEventListener("DOMContentLoaded", () => {
  fetch("js/dados.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar dados.json");
      }
      return response.json();
    })
    .then(data => {
      const tabela = document.getElementById("tabela-livros");

      data.livros.forEach(livro => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td><img src="${livro.capa}" alt="Capa do livro" class="capa-img" width="80"></td>
          <td>${livro.titulo}</td>
          <td>${livro.autor}</td>
          <td>${livro.genero}</td>
          <td>${livro.ano}</td>
        `;

        tabela.appendChild(linha);
      });
    })
    .catch(error => console.error(error));
});
