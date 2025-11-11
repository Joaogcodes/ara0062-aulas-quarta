document.addEventListener("DOMContentLoaded", () => {
    fetch("js/dados.json")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector(".books-table tbody");
            tabela.innerHTML = "";

            data.livros.forEach(livro => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td><img src="${livro.capa}" class="capa-livro" alt="${livro.titulo}"></td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.genero}</td>
                    <td>${livro.ano}</td>
                `;

                tabela.appendChild(row);
            });
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
});
