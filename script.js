// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
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

// JavaScript to handle the check-in/check-out buttons
document.addEventListener("DOMContentLoaded", () => {
  const checkInButton = document.getElementById('checkInButton');
  const checkOutButton = document.getElementById('checkOutButton');
  const usernameInput = document.getElementById('username');
  const locationInput = document.getElementById('location');
  const messageElement = document.getElementById('message');
  const clockElement = document.getElementById('clock');

  if (!checkInButton) {
    console.error("Error: No se encontró el elemento con ID 'checkInButton'.");
  }
  if (!checkOutButton) {
    console.error("Error: No se encontró el elemento con ID 'checkOutButton'.");
  }
  if (!usernameInput) {
    console.error("Error: No se encontró el elemento con ID 'username'.");
  }
  if (!locationInput) {
    console.error("Error: No se encontró el elemento con ID 'location'.");
  }
  if (!messageElement) {
    console.error("Error: No se encontró el elemento con ID 'message'.");
  }
  if (!clockElement) {
    console.error("Error: No se encontró el elemento con ID 'clock'.");
  }

  if (!checkInButton || !checkOutButton || !usernameInput || !locationInput || !messageElement || !clockElement) {
    return;
  }

  // Update the clock in real time
  function updateClock() {
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  checkInButton.addEventListener('click', () => {
    getGPSLocation((gpsLocation) => {
      handleCheckInOrOut('Check-In', gpsLocation);
    });
  });

  checkOutButton.addEventListener('click', () => {
    getGPSLocation((gpsLocation) => {
      handleCheckInOrOut('Check-Out', gpsLocation);
    });
  });

  function handleCheckInOrOut(eventType, gpsLocation) {
    const username = usernameInput.value;
    const location = locationInput.value || "Unknown";
    const timestamp = new Date().toISOString();

    if (username.trim() === '') {
      messageElement.innerText = 'Por favor ingrese un nombre de usuario válido';
      console.warn("Nombre de usuario vacío");
      return;
    }

    console.log("Datos a registrar:", { username, eventType, timestamp, location, gpsLocation });

    // Reference to the 'events' node in Firebase
    try {
      const eventsRef = ref(database, 'events');
      const newEventRef = push(eventsRef);

      set(newEventRef, {
        username,
        eventType,
        timestamp,
        location,
        gpsLocation
      }).then(() => {
        console.log("Registro exitoso para:", username);
        messageElement.innerText = `${eventType} registrado correctamente para ${username}`;
      }).catch((error) => {
        console.error("Error al registrar el evento:", error);
        messageElement.innerText = `Error al registrar el evento: ${error.message}`;
      });
    } catch (error) {
      console.error("Error al crear la referencia o al intentar escribir en la base de datos:", error);
    }
  }

  function getGPSLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const gpsLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log("Ubicación GPS obtenida:", gpsLocation);
          callback(gpsLocation);
        },
        (error) => {
          console.error("Error al obtener la ubicación GPS:", error);
          callback(null);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
      callback(null);
    }
  }
});