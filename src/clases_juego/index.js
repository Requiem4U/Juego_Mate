import { Game } from './game.js';

const gameContainer = document.getElementById('contenedor_juego');

const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
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

let game = new Phaser.Game(config);

function resizeGame() {
  const newWidth = gameContainer.clientWidth;
  const newHeight = gameContainer.clientHeight;

  game.renderer.resize(newWidth, newHeight);
  console.log(newWidth + '\n' + newHeight)
}

window.addEventListener('resize', resizeGame);