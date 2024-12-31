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

let sectionName = "cursor-1";
let sectionList = ["cursor-1"];
let cursorList = ["arrow-pointer"];

const root = document.querySelector(":root");

class ArrowPointer {
  constructor() {
    this.root = document.body;
    this.cursor = document.querySelector(".curzr-arrow-pointer");

    (this.position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    }),
      (this.previousPointerX = 0);
    this.previousPointerY = 0;
    this.angle = 0;
    this.previousAngle = 0;
    this.angleDisplace = 0;
    this.degrees = 57.296;
    this.cursorSize = 20;

    this.cursorStyle = {
      boxSizing: "border-box",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "2147483647",
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      transition: "100ms, transform 50ms",
      userSelect: "none",
      pointerEvents: "none",
    };

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.position.pointerX;
    this.previousPointerY = this.position.pointerY;
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.position.distanceX = this.previousPointerX - this.position.pointerX;
    this.position.distanceY = this.previousPointerY - this.position.pointerY;
    this.distance = Math.sqrt(
      this.position.distanceY ** 2 + this.position.distanceX ** 2
    );

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;

    if (this.distance > 1) {
      this.rotate(this.position);
    } else {
      this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;
    }
  }

  rotate(position) {
    let unsortedAngle =
      Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
      this.degrees;
    let modAngle;
    const style = this.cursor.style;
    this.previousAngle = this.angle;

    if (position.distanceX <= 0 && position.distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0;
    } else if (position.distanceX < 0 && position.distanceY < 0) {
      this.angle = unsortedAngle + 90;
    } else if (position.distanceX >= 0 && position.distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180;
    } else if (position.distanceX > 0 && position.distanceY > 0) {
      this.angle = unsortedAngle + 270;
    }

    if (isNaN(this.angle)) {
      this.angle = this.previousAngle;
    } else {
      if (this.angle - this.previousAngle <= -270) {
        this.angleDisplace += 360 + this.angle - this.previousAngle;
      } else if (this.angle - this.previousAngle >= 270) {
        this.angleDisplace += this.angle - this.previousAngle - 360;
      } else {
        this.angleDisplace += this.angle - this.previousAngle;
      }
    }
    style.left = `${-this.cursorSize / 2}px`;
    style.top = `${0}px`;
    style.transform += ` rotate(${this.angleDisplace}deg)`;
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

let cursor = new ArrowPointer();
document.onmousemove = function (event) {
  cursor.move(event);
};
document.ontouchmove = function (event) {
  cursor.move(event.touches[0]);
};
document.onclick = function () {
  if (typeof cursor.click === "function") {
    cursor.click();
  }
};

// Seleciona o caminho animado
const animatedPath = document.getElementById("animated-path");

// Calcula o comprimento total do caminho
const totalLength = animatedPath.getTotalLength();

// Define o comprimento visível da linha (tamanho da "estrela cadente")
const lineLength = 50; // Tamanho da linha visível

// Aplica propriedades dinâmicas ao caminho animado
animatedPath.style.strokeDasharray = `${lineLength} ${totalLength}`;
animatedPath.style.strokeDashoffset = totalLength;

// Animação usando JavaScript
const duration = 10000; // Duração da animação em milissegundos
animatedPath.animate(
  [{ strokeDashoffset: totalLength }, { strokeDashoffset: 0 }],
  {
    duration: duration,
    iterations: Infinity,
  }
);
