import Phaser from "phaser";
import backgroundImg from '../imagenes/fondo1.jpg'

const gameContainer = document.getElementById('contenedor_juego');

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }
  
    preload() {
      this.load.image('background', backgroundImg);
    }
  
    create() {
      this.add.image(gameContainer.clientWidth/2, gameContainer.clientHeight/2, 'background');
      
    }
  
  }