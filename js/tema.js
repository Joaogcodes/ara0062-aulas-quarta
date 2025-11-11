document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  const saved = localStorage.getItem("theme") || "light";
  html.dataset.theme = saved;

  updateButton();

  themeToggle.addEventListener("click", () => {
    const newTheme = html.dataset.theme === "light" ? "dark" : "light";
    html.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    updateButton();
  });

  function updateButton() {
    themeToggle.textContent =
      html.dataset.theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro";
  }
});
