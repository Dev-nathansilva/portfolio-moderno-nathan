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
