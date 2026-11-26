let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  const emailRegex = /^[a-z]+\.[a-z]+\d+@e-uvt\.ro$/;
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

  if (!emailRegex.test(email)) {
    alert("Email invalid! Exemplu valid: nume.prenume00@e-uvt.ro");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Parolă invalida!");
    return;
  }

  alert("Login reusit!");
  window.location.href = "home.html"; 
});