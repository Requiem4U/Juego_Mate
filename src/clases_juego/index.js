import { Game } from './game.js';

const gameContainer = document.getElementById('contenedor_juego');

const config = {
  type: Phaser.AUTO,
  width: gameContainer.clientWidth,
  height: gameContainer.clientHeight,
  parent: 'contenedor_juego',
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  }
}

var game = new Phaser.Game(config);

function resizeGame() {
  const newWidth = gameContainer.clientWidth;
  const newHeight = gameContainer.clientHeight;

  game.renderer.resize(newWidth, newHeight);
  console.log(1)
}

window.addEventListener('resize', resizeGame);