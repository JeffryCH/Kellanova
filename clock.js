document.addEventListener("DOMContentLoaded", () => {
  const clockElement = document.getElementById('clock');

  if (!clockElement) {
    console.error("Error: No se encontró el elemento con ID 'clock'.");
    return;
  }

  console.log("Elemento del reloj encontrado correctamente.");

  // Update the clock in real time
  function updateClock() {
    const now = new Date();
    clockElement.innerHTML = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log("Hora actualizada: ", clockElement.innerText);
  }
  setInterval(updateClock, 1000);
  updateClock();
});