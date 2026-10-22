let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // RegEx corectat pentru email-ul de e-uvt (ex: prenume.nume11@e-uvt.ro)
  const emailRegex = /^[a-z]+\.[a-z]+\d+@e-uvt\.ro$/;
  
  // RegEx parola (minim 7 caractere, litera mica, litera mare, cifra, caracter special)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

  if (!emailRegex.test(email)) {
    alert("Email invalid! Exemplu valid: nume.prenume12@e-uvt.ro");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Parolă invalidă! Trebuie să aibă minim 7 caractere, o literă mare, o literă mică, o cifră și un caracter special.");
    return;
  }

  alert("Login reușit!");
  window.location.href = "home.html"; 
});