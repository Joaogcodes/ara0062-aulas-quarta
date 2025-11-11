document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  htmlElement.setAttribute("data-theme", currentTheme)

  if (themeToggle) {
    // Update button text based on current theme
    updateThemeButtonText()

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
      const theme = htmlElement.getAttribute("data-theme")
      const newTheme = theme === "light" ? "dark" : "light"

      htmlElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeButtonText()
    })
  }

  function updateThemeButtonText() {
    const theme = htmlElement.getAttribute("data-theme")
    if (themeToggle) {
      themeToggle.textContent = theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"
    }
  }
})
