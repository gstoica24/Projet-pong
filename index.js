/* je declare mes variable */

const ping = document.querySelector("#ping");
const pong = document.querySelector("#pong");
const ball = document.querySelector("i");
let pongX = (window.innerWidth / 20) * 19;
let pingX = window.innerWidth / 20;
let pingY = 400;
let pongY = 400;
let ballX = window.innerWidth / 2;
let ballY = window.innerHeight / 2;
let directionX = true;
let directionY = 0;
let gameEnded = false;
let width = window.innerWidth;
let height = window.innerHeight;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

/* je me a jour la position de barre */

pong.style.left = pongX + "px";
ping.style.left = pingX + "px";

function displayScore(scorePlayer1, scorePlayer2) {
  let scoreDisplay1 = document.querySelector(".score1");
  scoreDisplay1.innerHTML = scorePlayer1;
  let scoreDisplay2 = document.querySelector(".score2");
  scoreDisplay2.innerHTML = scorePlayer2;
}

function resetGame() {
  if (ballX > width) {
    setTimeout(() => {
      ballX = window.innerWidth / 2;
      ballY = window.innerHeight / 2;
    }, 2000);
  }
}

document.addEventListener("keydown", function (event) {
  // On récupère de notre event la clé et le code de la touche

  let name = event.key;
  let code = event.code;
  console.log(event.key, event.code);

  /* touche pour joue et faire bouge le div*/

  if (pingY > 9) {
    if (name == "z") {
      pingY = pingY - 20;
    }
  }
  if (pingY < height - 150) {
    if (name == "s") {
      pingY = pingY + 20;
    }

    ping.style.top = pingY + "px";
  }
  if (pongY > 9) {
    if (code == "ArrowUp") {
      pongY = pongY - 20;
    }
  }
  if (pongY < height - 150) {
    if (code == "ArrowDown") {
      pongY = pongY + 20;
    }

    pong.style.top = pongY + "px";
  }
});

function moveBall(directionX, directionY) {
  if (gameEnded == false && ballX < width) {
    /* on avance la ball vers la droit */

    if (directionX == true) {
      ballX = ballX + 10;
    } else {
      /* vers la gauche */

      ballX = ballX - 10;
    }

    /* direction vers le haut */

    if (directionY == 1) {
      ballY = ballY + 10;
    } else if (directionY == -1) {
      /* vers le bas */

      ballY = ballY - 10;
    }

    /* rebound de la ball de gauche a droite et la barre a ete coupe en trois partie */

    if (
      ballY > pingY &&
      ballY < pingY + 50 &&
      ballX > pingX &&
      ballX < pingX + 11
    ) {
      directionY = -1;
      directionX = true;
    } else if (
      ballY > pingY + 50 &&
      ballY < pingY + 100 &&
      ballX > pingX &&
      ballX < pingX + 11
    ) {
      directionX = true;
    } else if (
      ballY > pingY + 100 &&
      ballY < pingY + 150 &&
      ballX > pingX &&
      ballX < pingX + 11
    ) {
      directionY = 1;
      directionX = true;
    }

    /* coupe on trois partie la barre de droite, rebound de droit a gauchezzz */

    if (
      ballY > pongY &&
      ballY < pongY + 50 &&
      ballX > pongX &&
      ballX < pongX + 11
    ) {
      directionY = -1;
      directionX = false;
    } else if (
      ballY > pongY + 50 &&
      ballY < pongY + 100 &&
      ballX > pongX &&
      ballX < pongX + 11
    ) {
      directionX = false;
    } else if (
      ballY > pongY + 100 &&
      ballY < pongY + 150 &&
      ballX > pongX &&
      ballX < pongX + 11
    ) {
      directionY = 1;
      directionX = false;
    }

    if (ballY <= 0) {
      directionY = 1;
    } else if (ballY > height) {
      /* rebound de la ball de bas en haut */

      directionY = -1;
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    setTimeout(() => {
      moveBall(directionX, directionY);
    }, 20);
  } else {
    gameEnded = true;
    if (directionX == true && gameEnded == true) {
      scorePlayer1++;
    }
    if (directionX == false && gameEnded == true) {
      scorePlayer2++;
    }
    displayScore(scorePlayer1, scorePlayer2);
    resetGame();
  }
}

/* function qui actualise la page a chaque frame */

// Pour appeler votre fonction :
window.requestAnimationFrame(() => {
  moveBall(true, 0); // true comme valeur par défaut au lancement du jeu
});
