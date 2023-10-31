import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
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

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyASPm-tyYm-WGHIpLTfpVjZAmzeS-OpeM4",
    authDomain: "samfi-15d53.firebaseapp.com",
    projectId: "samfi-15d53",
    storageBucket: "samfi-15d53.appspot.com",
    messagingSenderId: "712391069645",
    appId: "1:712391069645:web:a6099e703ba073f82abe84",
    measurementId: "G-SDQ3C7DRYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
export class ManageAccount {
    async getAuthToken({ username, password }) {
        try {
            const userCredentialExist = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            return userCredentialExist;
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    username,
                    password
                );

                return userCredential;
            }
            console.log(err);
            return null;
        }
    }

    async loginFirebase(username, password) {
        // Busca el correo asociado al nombre de usuario
        const usersColRef = collection(db, "users");
        const q = query(
            usersColRef,
            where("username", "==", username),
            where("password", "==", password)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error("Username not found");
            return null;
        }

        const { password: secretPassword, ...rest } = querySnapshot.docs[0].data();

        try {
            const { user } = await getAuthToken({ username, password });
            if (user == null) {
                console.log("Somthing went wrong");
                return null;
            }
            console.log("User logged in:", user.uid);

            return {
                token: user.uid,
                ...rest,
            };
        } catch (error) {
            console.error("Error logging in:", error.message);
            return null;
        }
    }

    async getUser(username, password) {
        const usersColRef = collection(db, "users");
        const q = query(
            usersColRef,
            where("username", "==", username),
            where("password", "==", password)
        );
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => doc.data());
        console.log(users);
    }

    async addData(user) {
        const userDocRef = doc(db, "users", user.id);
        await setDoc(userDocRef, user);
    }
}





