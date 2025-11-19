document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const form = document.getElementById("contact-form-main");

  // Adiciona o campo CPF apenas se não existir
  if (!document.getElementById("cpf")) {
    const emailGroup = emailInput.closest(".form-group");
    const cpfGroup = document.createElement("div");
    cpfGroup.className = "form-group";
    cpfGroup.innerHTML = `
      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required>
    `;
    emailGroup.parentNode.insertBefore(cpfGroup, emailGroup.nextSibling);
  }

  // Referências
  const cpfInput = document.getElementById("cpf");

  // ===========================
  //   VALIDAÇÃO DO E-MAIL
  // ===========================
  function validateEmail(email) {
    // aceita: nome.sobrenome@net.com
    const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*@net\.com$/;
    return emailRegex.test(email);
  }

  // ===========================
  //   VALIDAÇÃO DO CPF
  // ===========================
  function validateCPF(cpf) {
    // valida exatamente o formato 000.000.000-00
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  }

  // ===========================
  //   VALIDAÇÃO DO EMAIL (blur)
  // ===========================
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#e74c3c";
        this.title = "E-mail deve estar no formato: nome.sobrenome@net.com";
      } else {
        this.style.borderColor = "#ecf0f1";
      }
    });
  }

  // ===========================
  //   VALIDAÇÃO DO CPF (blur)
  // ===========================
  if (cpfInput) {
    cpfInput.addEventListener("blur", function () {
      if (this.value && !validateCPF(this.value)) {
        this.style.borderColor = "#e74c3c";
        this.title = "CPF deve estar no formato: 000.000.000-00";
      } else {
        this.style.borderColor = "#ecf0f1";
      }
    });

    // ===========================
    //   MÁSCARA AUTOMÁTICA CPF
    // ===========================
    cpfInput.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");

      if (v.length > 11) v = v.slice(0, 11);

      if (v.length >= 3) v = v.replace(/(\d{3})(\d)/, "$1.$2");
      if (v.length >= 6) v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      if (v.length >= 9)
        v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

      this.value = v;
    });
  }

  // ===========================
  //   VALIDAÇÃO FINAL DO FORM
  // ===========================
  if (form) {
    form.addEventListener("submit", (e) => {
      const email = emailInput.value.trim();
      const cpf = cpfInput ? cpfInput.value.trim() : "";

      if (email && !validateEmail(email)) {
        e.preventDefault();
        alert("E-mail inválido! Use o formato: nome.sobrenome@net.com");
        return false;
      }

      if (cpf && !validateCPF(cpf)) {
        e.preventDefault();
        alert("CPF inválido! Use o formato: 000.000.000-00");
        return false;
      }

      alert("Formulário enviado com sucesso!");
    });
  }
});
