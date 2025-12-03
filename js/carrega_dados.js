document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".books-table tbody")

  if (table) {
    fetch("js/dados.json")
      .then((response) => response.json())
      .then((data) => {
        // Clear existing table rows
        table.innerHTML = ""

        // Load each book from JSON
        data.livros.forEach((livro) => {
          const row = document.createElement("tr")
          row.innerHTML = `
                        <td><img src="${livro.capa}" alt="Capa do livro ${livro.titulo}" class="book-cover"></td>
                        <td>${livro.titulo}</td>
                        <td>${livro.autor}</td>
                        <td>${livro.genero}</td>
                        <td>${livro.ano}</td>
                    `
          table.appendChild(row)
        })
      })
      .catch((error) => console.error("Erro ao carregar dados:", error))
  }
})
