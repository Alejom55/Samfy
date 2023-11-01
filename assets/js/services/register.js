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
        console.log(account.addData(user))
    }else{
        console.log("Hola")
        swal("Hello world!");
    }

    
});