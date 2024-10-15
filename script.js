// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDavujclRlYnq3_PiUrDwdni1y-26iaYK0",
  authDomain: "kellogg-s-d6006.firebaseapp.com",
  databaseURL: "https://kellogg-s-d6006-default-rtdb.firebaseio.com",
  projectId: "kellogg-s-d6006",
  storageBucket: "kellogg-s-d6006.appspot.com",
  messagingSenderId: "882591600958",
  appId: "1:882591600958:web:359b0eb7e54e8592c19c6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// JavaScript to handle user authentication
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const loginMessage = document.getElementById("loginMessage");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Iniciar Sesión
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email === "" || password === "") {
        loginMessage.style.color = "red";
        loginMessage.innerText = "Por favor ingrese un correo electrónico y contraseña válidos.";
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Inicio de sesión exitoso para:", user.email);
          loginMessage.style.color = "green";
          loginMessage.innerText = "Inicio de sesión exitoso.";
          window.location.href = "https://jeffrych.github.io/Kellanova/dashboard.html";
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          loginMessage.style.color = "red";
          loginMessage.innerText = `Error: ${error.message}`;
        });
    });
  }

  // Registro de Usuario
  if (registerButton) {
    registerButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email === "" || password === "") {
        loginMessage.style.color = "red";
        loginMessage.innerText = "Por favor ingrese un correo electrónico y contraseña válidos.";
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Registro exitoso para:", user.email);
          loginMessage.style.color = "green";
          loginMessage.innerText = "Registro exitoso. Ahora puedes iniciar sesión.";
        })
        .catch((error) => {
          console.error("Error al registrar el usuario:", error);
          loginMessage.style.color = "red";
          loginMessage.innerText = `Error al registrar usuario: ${error.message}`;
        });
    });
  }
});

// JavaScript to display records in records.html
document.addEventListener("DOMContentLoaded", () => {
  const eventsTableBody = document.getElementById("eventsTable")?.getElementsByTagName("tbody")[0];
  if (eventsTableBody) {
    try {
      const eventsRef = ref(database, "events");

      onValue(eventsRef, (snapshot) => {
        eventsTableBody.innerHTML = "";
        if (!snapshot.exists()) {
          console.warn("No hay registros disponibles en la base de datos.");
          return;
        }

        snapshot.forEach((childSnapshot) => {
          const event = childSnapshot.val();
          console.log("Registro encontrado:", event);
          const row = eventsTableBody.insertRow();

          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);
          const cell4 = row.insertCell(3);

          cell1.textContent = event.eventType;
          cell2.textContent = new Date(event.timestamp).toLocaleString();
          cell3.textContent = event.location;
          if (event.gpsLocation) {
            const gpsLink = document.createElement("a");
            gpsLink.href = `https://www.google.com/maps?q=${event.gpsLocation.latitude},${event.gpsLocation.longitude}`;
            gpsLink.target = "_blank";
            gpsLink.textContent = `${event.gpsLocation.latitude}, ${event.gpsLocation.longitude}`;
            gpsLink.classList.add("gps-link");
            cell4.appendChild(gpsLink);
          } else {
            cell4.textContent = "No disponible";
          }
        });
      }, (error) => {
        console.error("Error al obtener los registros:", error);
      });
    } catch (error) {
      console.error("Error al intentar leer los registros de la base de datos:", error);
    }
  }
});
