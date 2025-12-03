-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS biblioteca_digital;
USE biblioteca_digital;

-- Criar tabela de livros
CREATE TABLE IF NOT EXISTS livros (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL UNIQUE,
    autor VARCHAR(150) NOT NULL,
    genero VARCHAR(100),
    ano_publicacao YEAR,
    editora VARCHAR(150),
    isbn VARCHAR(20) UNIQUE,
    disponivel BOOLEAN DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Inserir os livros do catálogo
INSERT IGNORE INTO livros (titulo, autor, genero, ano_publicacao, editora, isbn) VALUES
('Dom Casmurro', 'Machado de Assis', 'Romance', 1899, 'Clássicos em HD', '978-8535929126'),
('O Cortiço', 'Aluísio Azevedo', 'Naturalismo', 1890, 'Martin Claret', '978-8535928655'),
('Iracema', 'José de Alencar', 'Romance Indianista', 1865, 'Penguin Clássicos', '978-8525060895'),
('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Romance', 1881, 'Editora 34', '978-8526005722'),
('O Guarani', 'José de Alencar', 'Romance Indianista', 1857, 'Companhia das Letras', '978-8535928938');
