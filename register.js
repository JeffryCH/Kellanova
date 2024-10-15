// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDavujclRlYnq3_PiUrDwdni1y-26iaYK0",
  authDomain: "kellogg-s-d6006.firebaseapp.com",
  projectId: "kellogg-s-d6006",
  storageBucket: "kellogg-s-d6006.appspot.com",
  messagingSenderId: "882591600958",
  appId: "1:882591600958:web:359b0eb7e54e8592c19c6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("registerButton");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const registerMessage = document.getElementById("registerMessage");

  registerButton.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
      registerMessage.innerText = "Por favor ingrese un correo electrónico y contraseña válidos.";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        registerMessage.innerText = "Registro exitoso. Ahora puedes iniciar sesión.";
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        registerMessage.innerText = `Error: ${error.message}`;
      });
  });
});