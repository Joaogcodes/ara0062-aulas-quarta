document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Ler tema salvo (se não tiver, usa "light")
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);
  updateButtonText();

  // Quando clicar, alternar tema
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonText();
  });

  // Atualiza o texto do botão
  function updateButtonText() {
    themeToggle.textContent =
      html.getAttribute("data-theme") === "light"
        ? "🌙 Tema Escuro"
        : "☀️ Tema Claro";
  }
});
