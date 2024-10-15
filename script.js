// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase inicializado correctamente");
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

let database;
try {
  database = getDatabase(app);
  console.log("Conexión con la base de datos establecida");
} catch (error) {
  console.error("Error al conectar con la base de datos:", error);
}

let auth;
try {
  auth = getAuth(app);
  console.log("Autenticación de Firebase inicializada correctamente");
} catch (error) {
  console.error("Error al inicializar la autenticación de Firebase:", error);
}

// JavaScript to handle user authentication
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Inicio de sesión exitoso para:", user.email);
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        document.getElementById('loginMessage').innerText = "Usuario o contraseña incorrectos.";
      });
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registered
        const user = userCredential.user;
        console.log("Registro exitoso para:", user.email);
        document.getElementById('registerMessage').innerText = "Usuario registrado exitosamente.";
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error);
        document.getElementById('registerMessage').innerText = "Error al registrar usuario: " + error.message;
      });
  });
}

// JavaScript to display records in records.html
document.addEventListener("DOMContentLoaded", () => {
  const eventsTableBody = document.getElementById("eventsTable")?.getElementsByTagName("tbody")[0];
  if (!eventsTableBody) {
    console.error("Error: No se encontró el elemento de la tabla para mostrar los registros.");
    return;
  }

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
});