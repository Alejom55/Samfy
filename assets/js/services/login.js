import { ManageAccount } from './firebase-auth.js';

document.getElementById("formulario-sesion").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;

  const account = new ManageAccount();
  account.authenticate(email, password);
  
});