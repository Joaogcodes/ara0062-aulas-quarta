<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato - Biblioteca Digital</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="styles-dark.css">
</head>

<body>
    <nav class="navbar">
        <div class="nav-container">
            <h1 class="nav-logo">📚 Biblioteca Digital</h1>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Início</a></li>
                <li><a href="catalogo.html" class="nav-link">Catálogo</a></li>
                <li><a href="contato.html" class="nav-link active">Contato</a></li>
                <li><a href="equipe.html" class="nav-link">Equipe</a></li>
                <li><button id="theme-toggle" class="theme-toggle-btn">🌙 Tema Escuro</button></li>
            </ul>
        </div>
    </nav>

    <main class="main-content">
        <section class="contact">
            <div class="container">
                <h1>Entre em Contato</h1>
                <p>Tem alguma dúvida ou sugestão? Envie-nos uma mensagem!</p>
                
                <form class="contact-form" id="contact-form-main" action="#" method="post">

                    <!-- Nome -->
                    <div class="form-group">
                        <label for="nome">Nome Completo:</label>
                        <input type="text" id="nome" name="nome" required>
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                        <label for="email">E-mail:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="exemplo@dominio.com"
                            required>
                    </div>

                    <!-- CPF com máscara automática -->
                    <div class="form-group">
                        <label for="cpf">CPF:</label>
                        <input 
                            type="text" 
                            id="cpf" 
                            name="cpf" 
                            placeholder="000.000.000-00" 
                            maxlength="14"
                            required>
                    </div>

                    <!-- Assunto -->
                    <div class="form-group">
                        <label for="assunto">Assunto:</label>
                        <input type="text" id="assunto" name="assunto" required>
                    </div>
                    
                    <!-- Mensagem -->
                    <div class="form-group">
                        <label for="mensagem">Mensagem:</label>
                        <textarea 
                            id="mensagem" 
                            name="mensagem" 
                            rows="6" 
                            placeholder="Digite sua mensagem aqui..." 
                            required></textarea>
                    </div>

                    <button type="submit" class="submit-btn">Enviar</button>
                </form>

                <!-- Info -->
                <div class="contact-info">
                    <h3>Outras formas de contato:</h3>
                    <p>📧 Email: contato@bibliotecadigital.com</p>
                    <p>📞 Telefone: (11) 1234-5678</p>
                    <p>📍 Endereço: Rua dos Livros, 123 - São Paulo, SP</p>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2024 Biblioteca Digital. Desenvolvido pela nossa equipe acadêmica.</p>
    </footer>

    <!-- Scripts -->
    <script>
        // Máscara automática para o CPF
        const cpfInput = document.getElementById('cpf');

        cpfInput.addEventListener('input', () => {
            let cpf = cpfInput.value;

            // Remove tudo que não é número
            cpf = cpf.replace(/\D/g, '');

            // Aplica a máscara: 000.000.000-00
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            cpfInput.value = cpf;
        });
    </script>

    <script src="js/tema.js"></script>
</body>
</html>

