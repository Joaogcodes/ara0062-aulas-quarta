<?php

// ... existing code up to operacao switch ...

switch($operacao) {
    case 'create':
        $data = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents('php://input'), true) : $_POST;
        $resposta = criarLivro($conexao, $data);
        break;
    case 'read':
        $resposta = lerLivros($conexao);
        break;
    case 'update':
        $data = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents('php://input'), true) : $_POST;
        $resposta = atualizarLivro($conexao, $data);
        break;
    case 'delete':
        $data = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents('php://input'), true) : $_POST;
        $resposta = deletarLivro($conexao, $data);
        break;
}

echo json_encode($resposta);
$conexao->close();

function criarLivro($conexao, $data) {
    $titulo = $conexao->real_escape_string($data['titulo'] ?? '');
    $autor = $conexao->real_escape_string($data['autor'] ?? '');
    $genero = $conexao->real_escape_string($data['genero'] ?? '');
    $ano_publicacao = intval($data['ano_publicacao'] ?? 0);
    $editora = $conexao->real_escape_string($data['editora'] ?? '');
    $isbn = $conexao->real_escape_string($data['isbn'] ?? '');

    if (!$titulo || !$autor) {
        return ['sucesso' => false, 'mensagem' => 'Título e autor são obrigatórios'];
    }

    $sql = "INSERT INTO livros (titulo, autor, genero, ano_publicacao, editora, isbn, disponivel) 
            VALUES ('$titulo', '$autor', '$genero', $ano_publicacao, '$editora', '$isbn', 1)";

    if ($conexao->query($sql)) {
        return ['sucesso' => true, 'mensagem' => 'Livro criado com sucesso', 'id' => $conexao->insert_id];
    } else {
        return ['sucesso' => false, 'mensagem' => 'Erro ao criar livro: ' . $conexao->error];
    }
}

function lerLivros($conexao) {
    $sql = "SELECT id_livro, titulo, autor, genero, ano_publicacao, editora FROM livros ORDER BY id_livro DESC";
    $resultado = $conexao->query($sql);

    if ($resultado) {
        $livros = [];
        while ($row = $resultado->fetch_assoc()) {
            $livros[] = $row;
        }
        return ['sucesso' => true, 'dados' => $livros];
    } else {
        return ['sucesso' => false, 'mensagem' => 'Erro ao ler livros: ' . $conexao->error];
    }
}

function atualizarLivro($conexao, $data) {
    $id_livro = intval($data['id_livro'] ?? $data['id-atualizar'] ?? 0);
    
    if (!$id_livro) {
        return ['sucesso' => false, 'mensagem' => 'ID do livro é obrigatório'];
    }

    $updates = [];
    
    if (!empty($data['titulo-atualizar'])) {
        $titulo = $conexao->real_escape_string($data['titulo-atualizar']);
        $updates[] = "titulo = '$titulo'";
    }
    if (!empty($data['autor-atualizar'])) {
        $autor = $conexao->real_escape_string($data['autor-atualizar']);
        $updates[] = "autor = '$autor'";
    }
    if (!empty($data['genero-atualizar'])) {
        $genero = $conexao->real_escape_string($data['genero-atualizar']);
        $updates[] = "genero = '$genero'";
    }

    if (empty($updates)) {
        return ['sucesso' => false, 'mensagem' => 'Nenhum campo para atualizar'];
    }

    $sql = "UPDATE livros SET " . implode(', ', $updates) . ", data_atualizacao = CURRENT_TIMESTAMP WHERE id_livro = $id_livro";

    if ($conexao->query($sql)) {
        return ['sucesso' => true, 'mensagem' => 'Livro atualizado com sucesso'];
    } else {
        return ['sucesso' => false, 'mensagem' => 'Erro ao atualizar livro: ' . $conexao->error];
    }
}

function deletarLivro($conexao, $data) {
    $id_livro = intval($data['id_livro'] ?? $data['id-deletar'] ?? 0);
    
    if (!$id_livro) {
        return ['sucesso' => false, 'mensagem' => 'ID do livro é obrigatório'];
    }

    $sql = "DELETE FROM livros WHERE id_livro = $id_livro";

    if ($conexao->query($sql)) {
        return ['sucesso' => true, 'mensagem' => 'Livro deletado com sucesso'];
    } else {
        return ['sucesso' => false, 'mensagem' => 'Erro ao deletar livro: ' . $conexao->error];
    }
}
?>
