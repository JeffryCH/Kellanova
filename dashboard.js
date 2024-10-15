// JavaScript for handling Dashboard interactions

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve username from local storage and display it
    const username = localStorage.getItem("username");
  
    if (!username) {
      // Si no hay un usuario autenticado, redirigimos al inicio de sesión
      window.location.href = "https://jeffrych.github.io/Kellanova/index.html";
      return;
    }
  
    const welcomeMessageElement = document.getElementById("welcomeMessage");
    const usernameDisplayElement = document.getElementById("usernameDisplay");
  
    if (welcomeMessageElement && usernameDisplayElement) {
      welcomeMessageElement.innerText = `Bienvenido, ${username}`;
      usernameDisplayElement.innerText = username;
    }
  
    // Add logout functionality
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "https://jeffrych.github.io/Kellanova/index.html";
      });
    }
  
    // Menu options interactions
    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // La redirección se realiza automáticamente gracias al atributo href del enlace
        console.log(`Navegando a: ${link.getAttribute("href")}`);
      });
    });
  });
  