// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
