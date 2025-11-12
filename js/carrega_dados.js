document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  fetch("dados.json") // <- CORRETO, sem "../"
=======
  fetch("../dados.json") // se catalogo.html estiver dentro de uma pasta, ajuste o caminho
>>>>>>> 17723ac (Primeiro commit)
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById("tabela-livros");

      data.livros.forEach(livro => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
<<<<<<< HEAD
          <td><img src="${livro.capa}" alt="${livro.titulo}" class="capa-img" width="80"></td>
=======
          <td><img src="${livro.capa}" alt="${livro.titulo}" class="capa-img"></td>
>>>>>>> 17723ac (Primeiro commit)
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
