const API_URL = "http://localhost/biblioteca-digital/api/livros.php"

function mostrarFormCriar() {
  esconderResultado()
  document.getElementById("form-criar").classList.remove("hidden")
  document.getElementById("form-atualizar").classList.add("hidden")
  document.getElementById("form-deletar").classList.add("hidden")
}

function mostrarFormAtualizar() {
  esconderResultado()
  document.getElementById("form-atualizar").classList.remove("hidden")
  document.getElementById("form-criar").classList.add("hidden")
  document.getElementById("form-deletar").classList.add("hidden")
}

function mostrarFormDeletar() {
  esconderResultado()
  document.getElementById("form-deletar").classList.remove("hidden")
  document.getElementById("form-criar").classList.add("hidden")
  document.getElementById("form-atualizar").classList.add("hidden")
}

function esconderForm(formId) {
  document.getElementById(formId).classList.add("hidden")
}

function esconderResultado() {
  document.getElementById("resultado").classList.add("hidden")
  document.getElementById("mensagem").classList.add("hidden")
}

function mostrarMensagem(mensagem, tipo) {
  const msgElement = document.getElementById("mensagem")
  msgElement.textContent = mensagem
  msgElement.className = "mensagem " + tipo
  msgElement.classList.remove("hidden")
}

async function criarLivro(event) {
  event.preventDefault()

  const formData = new FormData(document.getElementById("criar-livro-form"))
  const dados = Object.fromEntries(formData)
  dados.operacao = "create"

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })

    const resultado = await response.json()

    if (resultado.sucesso) {
      mostrarMensagem("✅ Livro adicionado com sucesso!", "sucesso")
      document.getElementById("criar-livro-form").reset()
      setTimeout(() => carregarLivros(), 1500)
    } else {
      mostrarMensagem("❌ Erro: " + resultado.mensagem, "erro")
    }
  } catch (error) {
    console.log("[v0] Erro ao criar livro:", error)
    mostrarMensagem("❌ Erro ao conectar com o servidor", "erro")
  }
}

async function carregarLivros() {
  try {
    const response = await fetch(API_URL + "?operacao=read")
    const resultado = await response.json()

    if (resultado.sucesso) {
      exibirLivros(resultado.dados)
    } else {
      mostrarMensagem("❌ Erro ao carregar livros: " + resultado.mensagem, "erro")
    }
  } catch (error) {
    console.log("[v0] Erro ao carregar livros:", error)
    mostrarMensagem("❌ Erro ao conectar com o servidor", "erro")
  }
}

function exibirLivros(livros) {
  const resultadoDiv = document.getElementById("resultado")

  if (livros.length === 0) {
    resultadoDiv.innerHTML = "<p>Nenhum livro encontrado.</p>"
  } else {
    let html =
      '<h3>Livros Cadastrados</h3><table class="tabela-livros"><thead><tr><th>ID</th><th>Título</th><th>Autor</th><th>Gênero</th><th>Ano</th><th>Editora</th></tr></thead><tbody>'

    livros.forEach((livro) => {
      html += `<tr>
                <td>${livro.id_livro}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>${livro.ano_publicacao}</td>
                <td>${livro.editora || "N/A"}</td>
            </tr>`
    })

    html += "</tbody></table>"
    resultadoDiv.innerHTML = html
  }

  resultadoDiv.classList.remove("hidden")
  document.getElementById("form-criar").classList.add("hidden")
  document.getElementById("form-atualizar").classList.add("hidden")
  document.getElementById("form-deletar").classList.add("hidden")
}

async function atualizarLivro(event) {
  event.preventDefault()

  const formData = new FormData(document.getElementById("atualizar-livro-form"))
  const dados = Object.fromEntries(formData)
  dados.operacao = "update"
  dados.id_livro = dados["id-atualizar"]

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })

    const resultado = await response.json()

    if (resultado.sucesso) {
      mostrarMensagem("✅ Livro atualizado com sucesso!", "sucesso")
      document.getElementById("atualizar-livro-form").reset()
      setTimeout(() => carregarLivros(), 1500)
    } else {
      mostrarMensagem("❌ Erro: " + resultado.mensagem, "erro")
    }
  } catch (error) {
    console.log("[v0] Erro ao atualizar livro:", error)
    mostrarMensagem("❌ Erro ao conectar com o servidor", "erro")
  }
}

async function deletarLivro(event) {
  event.preventDefault()

  const id = document.getElementById("id-deletar").value
  const dados = {
    operacao: "delete",
    id_livro: id,
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })

    const resultado = await response.json()

    if (resultado.sucesso) {
      mostrarMensagem("✅ Livro deletado com sucesso!", "sucesso")
      document.getElementById("deletar-livro-form").reset()
      setTimeout(() => carregarLivros(), 1500)
    } else {
      mostrarMensagem("❌ Erro: " + resultado.mensagem, "erro")
    }
  } catch (error) {
    console.log("[v0] Erro ao deletar livro:", error)
    mostrarMensagem("❌ Erro ao conectar com o servidor", "erro")
  }
}
