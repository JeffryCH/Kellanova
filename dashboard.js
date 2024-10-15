// JavaScript for handling Dashboard interactions

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve username from local storage and display it
    const username = localStorage.getItem("username") || "Usuario";
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
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        window.location.href = href;
      });
    });
  });