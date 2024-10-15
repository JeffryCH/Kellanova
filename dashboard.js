// JavaScript for handling Dashboard interactions

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve username from local storage and display it
    const username = localStorage.getItem("username");
  
    if (!username) {
      // Si no hay un usuario autenticado, redirigimos al inicio de sesión
      window.location.href = "https://jeffrych.github.io/Kellanova/index.html";
      return;
    }
  
    // Display welcome message and username if elements exist
    const welcomeMessageElement = document.getElementById("welcomeMessage");
    const usernameDisplayElement = document.getElementById("usernameDisplay");
  
    if (welcomeMessageElement) {
      welcomeMessageElement.innerText = `Bienvenido, ${username}`;
    }
  
    if (usernameDisplayElement) {
      usernameDisplayElement.innerText = username;
    }
  
    // Add logout functionality if button exists
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "https://jeffrych.github.io/Kellanova/index.html";
      });
    }
  
    // Add menu links interactions if menu links exist
    const menuLinks = document.querySelectorAll(".menu a");
    if (menuLinks.length > 0) {
      menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
          // La redirección se realiza automáticamente gracias al atributo href del enlace
          console.log(`Navegando a: ${link.getAttribute("href")}`);
        });
      });
    }
  });
  