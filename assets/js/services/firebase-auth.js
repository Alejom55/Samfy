import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyASPm-tyYm-WGHIpLTfpVjZAmzeS-OpeM4",
  authDomain: "samfi-15d53.firebaseapp.com",
  projectId: "samfi-15d53",
  storageBucket: "samfi-15d53.appspot.com",
  messagingSenderId: "712391069645",
  appId: "1:712391069645:web:a6099e703ba073f82abe84",
  measurementId: "G-SDQ3C7DRYB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export class ManageAccount {
  async register(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      // swal("Good job!", "You clicked the button!", "success");
      window.location.href = "/login";
    }
    catch (error) {
      console.error(error.message);
      console.error(error.code);
      // Mostrar alerta de error de registro
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario ya registrado',
        })
      }else if (error.code === 'auth/weak-password'){
        Swal.fire({
          icon: 'error',
          title: 'Contraseña debil',
          text: 'La contraseña debe tener por lo menos 6 caracteres',
        })
      }else if (error.code){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal',
        })
      }
    };
  }

  async authenticate(email, password) {
    try {
      const userCredencials = await signInWithEmailAndPassword(auth, email, password)
      window.location.href = "/";

    } catch (error) {
      // Mostrar alerta de error de inicio de sesión
      if(error.code === 'auth/invalid-login-credentials'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos',
        })
      }
    };
  }

  async signOut() {
    try {
      signOut(auth)
      window.location.href = "/";
    }
    catch (error) {
      console.error(error.message);
    };
  }
  async addData(user) {
    const userDocRef = doc(db, "users", user.email);
    await setDoc(userDocRef, user);
  }
}


