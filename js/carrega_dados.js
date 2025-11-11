const tabela = document.getElementById("tabela-livros");

fetch("js/dados.json")

  .then(response => response.json())
  .then(livros => {
    livros.forEach(livro => {
      const linha = document.createElement("tr");

      const celulaCapa = document.createElement("td");
      const img = document.createElement("img");
      img.src = "img/" + livro.capa; // <-- CAMINHO AJUSTADO
      img.width = 80;
      celulaCapa.appendChild(img);

      linha.innerHTML += `
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.genero}</td>
        <td>${livro.ano}</td>
      `;

      linha.prepend(celulaCapa);
      tabela.appendChild(linha);
    });
  });
