// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDavujclRlYnq3_PiUrDwdni1y-26iaYK0",
  authDomain: "kellogg-s-d6006.firebaseapp.com",
  databaseURL: "https://kellogg-s-d6006-default-rtdb.firebaseio.com",
  projectId: "kellogg-s-d6006",
  storageBucket: "kellogg-s-d6006.appspot.com",
  messagingSenderId: "882591600958",
  appId: "1:882591600958:web:359b0eb7e54e8592c19c6f",
  measurementId: "G-00Y9G2LR0R"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageElement = document.getElementById("loginMessage");

  if (loginButton && emailInput && passwordInput && messageElement) {
    loginButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      messageElement.innerText = ""; // Limpiar el mensaje anterior

      if (email === "" || password === "") {
        messageElement.innerText = "Por favor ingrese un correo electrónico y contraseña válidos.";
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          messageElement.style.color = "green";
          messageElement.innerText = "Inicio de sesión exitoso. Redirigiendo...";
          window.location.href = "https://jeffrych.github.io/Kellanova/dashboard.html";
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          messageElement.style.color = "red";
          switch (error.code) {
            case "auth/wrong-password":
              messageElement.innerText = "La contraseña es incorrecta.";
              break;
            case "auth/user-not-found":
              messageElement.innerText = "No se encontró un usuario con ese correo.";
              break;
            case "auth/invalid-email":
              messageElement.innerText = "El correo electrónico no es válido.";
              break;
            default:
              messageElement.innerText = `Error: ${error.message}`;
          }
        });
    });
  }

  if (registerButton && emailInput && passwordInput && messageElement) {
    registerButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      messageElement.innerText = ""; // Limpiar el mensaje anterior

      if (email === "" || password === "") {
        messageElement.innerText = "Por favor ingrese un correo electrónico y contraseña válidos.";
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          messageElement.style.color = "green";
          messageElement.innerText = "Registro exitoso. Ahora puedes iniciar sesión.";
        })
        .catch((error) => {
          console.error("Error al registrar el usuario:", error);
          messageElement.style.color = "red";
          switch (error.code) {
            case "auth/email-already-in-use":
              messageElement.innerText = "El correo electrónico ya está en uso.";
              break;
            case "auth/weak-password":
              messageElement.innerText = "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
              break;
            case "auth/invalid-email":
              messageElement.innerText = "El correo electrónico no es válido.";
              break;
            default:
              messageElement.innerText = `Error: ${error.message}`;
          }
        });
    });
  }
});
