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
      // Mostrar alerta de error de registro
      alert("Error al registrar: " + error.message);
    };
  }

  async authenticate(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      window.location.href = "/";

    } catch (error) {
      console.error(error.message);
      // Mostrar alerta de error de inicio de sesión
      alert("Error al iniciar sesión: " + error.message);
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


