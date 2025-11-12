document.addEventListener("DOMContentLoaded", () => {
  fetch("dados.json") 
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById("tabela-livros");

      data.livros.forEach(livro => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td><img src="${livro.capa}" alt="${livro.titulo}" class="capa-img"></td>
          <td>${livro.titulo}</td>
          <td>${livro.autor}</td>
          <td>${livro.genero}</td>
          <td>${livro.ano}</td>
        `;
        tabela.appendChild(linha);
      });
    })
    .catch(error => console.error("Erro ao carregar os livros:", error));
});
