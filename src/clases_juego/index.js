import { Game } from './game.js';

window.onload = ()=>{

  let gameContainer = document.getElementById('contenedor_juego');

  const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    parent: 'contenedor_juego',
    scene: [Game],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    }
  }

  let game = new Phaser.Game(config);

  function resizeGame() {
    const newWidth = gameContainer.clientWidth;
    const newHeight = gameContainer.clientHeight;

    game.renderer.resize(newWidth, newHeight);
  }

  window.addEventListener('resize', resizeGame);

  resizeGame
}