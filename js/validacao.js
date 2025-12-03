document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email")
  const form = document.getElementById("contact-form-main")

  // Add CPF field after email if it doesn't exist
  if (!document.getElementById("cpf")) {
    const emailGroup = emailInput.closest(".form-group")
    const cpfGroup = document.createElement("div")
    cpfGroup.className = "form-group"
    cpfGroup.innerHTML = `
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="999.999.999-99" required>
        `
    emailGroup.parentNode.insertBefore(cpfGroup, emailGroup.nextSibling)
  }

  // Email validation function
  function validateEmail(email) {
    // Format: joao.silva@net.com
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@net\.com$/
    return emailRegex.test(email)
  }

  // CPF validation function
  function validateCPF(cpf) {
    // Format: 999.999.999-99
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    return cpfRegex.test(cpf)
  }

  // Email input validation
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#e74c3c"
        this.title = "E-mail deve estar no formato: nome.sobrenome@net.com"
      } else {
        this.style.borderColor = "#ecf0f1"
      }
    })
  }

  // CPF input validation
  const cpfInput = document.getElementById("cpf")
  if (cpfInput) {
    cpfInput.addEventListener("blur", function () {
      if (this.value && !validateCPF(this.value)) {
        this.style.borderColor = "#e74c3c"
        this.title = "CPF deve estar no formato: 999.999.999-99"
      } else {
        this.style.borderColor = "#ecf0f1"
      }
    })

    // Format CPF as user types
    cpfInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "")
      if (value.length > 11) value = value.slice(0, 11)

      if (value.length >= 3) {
        value = value.slice(0, 3) + "." + value.slice(3)
      }
      if (value.length >= 7) {
        value = value.slice(0, 7) + "." + value.slice(7)
      }
      if (value.length >= 11) {
        value = value.slice(0, 11) + "-" + value.slice(11)
      }
      this.value = value
    })
  }

  // Form submission validation
  if (form) {
    form.addEventListener("submit", (e) => {
      const email = emailInput.value
      const cpf = cpfInput ? cpfInput.value : ""

      if (email && !validateEmail(email)) {
        e.preventDefault()
        alert("E-mail inválido! Use o formato: nome.sobrenome@net.com")
        return false
      }

      if (cpf && !validateCPF(cpf)) {
        e.preventDefault()
        alert("CPF inválido! Use o formato: 999.999.999-99")
        return false
      }

      alert("Formulário enviado com sucesso!")
    })
  }
})
