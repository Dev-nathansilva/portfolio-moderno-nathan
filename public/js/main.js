// // // PRELOADER
// window.addEventListener("load", () => {
//   const preloader = document.getElementById("preloader");
//   const content = document.getElementById("content");

//   if (preloader) {
//     setTimeout(() => {
//       preloader.style.display = "none"; // Esconde o preloader após 2 segundos
//       content.style.display = "flex"; // Mostra o conteúdo
//     }, 1500); // 2000ms = 2 segundos
//   }
// });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o comportamento padrão do link

    const targetId = this.getAttribute("href").substring(1); // Obtém o ID do destino
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 100; // Ajuste o valor do offset aqui (50px neste exemplo)
      const targetPosition = targetElement.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth", // Rolagem suave
      });
    }
  });
});

const checkbox = document.getElementById("check");
const menuContainer = document.getElementById("menu");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    menuContainer.classList.add("active");
  } else {
    menuContainer.classList.remove("active");
  }
});

// PRELOADER

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".container-preloader");
  const mainContent = document.querySelector(".global");
  const progressCounter = document.getElementById("progress-counter");

  const duration = 5000;
  let progress = 0;

  const interval = setInterval(() => {
    progress += 1.31;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressCounter.textContent = `${Math.floor(progress)}%`;
  }, 60);

  setTimeout(() => {
    preloader.style.display = "none"; // Oculta o preloader
    mainContent.style.display = "block"; // Exibe o conteúdo principal
    document.body.style.overflow = "auto"; // Libera o scroll
  }, duration);
});
