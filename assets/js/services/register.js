import { ManageAccount } from './firebase-auth.js';
// import {swal} from 'https://unpkg.com/sweetalert/dist/sweetalert.min.js';

document.getElementById("formulario-register").addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const checkbox = document.getElementById("flexCheckDefault")

    const user = {
        name: fullName,
        email: email,
        password: password
    }
    if(checkbox.checked === true){
        const account = new ManageAccount();
        account.register(email, password);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Acepta los terminos y condiciones',
          })
    }

    
});