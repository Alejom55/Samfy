import { ManageAccount } from './firebase-auth.js';
//import { ManageAccount } from './prueba.js';

document.getElementById("formulario-register").addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    const user = {
        name: fullName,
        email: email,
        password: password
    }

    const account = new ManageAccount();
    account.register(email, password);
    account.addData(user);

});