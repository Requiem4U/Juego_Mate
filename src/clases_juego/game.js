import Phaser from "phaser";
import backgroundImg from '../imagenes/fondo1.jpg'
import spritesheetP_M from '../imagenes/Mujer_Style_Sheets_128x128.png'

const v_m_personaje = 160

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.spritesheet('player_M', spritesheetP_M, { frameWidth: 128, frameHeight: 128 })
  }

  create() {
    const gameContainer = document.getElementById('contenedor_juego');

    this.player = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'player_M')

    crearAnimacionCaminata(this, 'player_M', 'walkDown', 0, 3);
    crearAnimacionCaminata(this, 'player_M', 'walkUp', 4, 7);
    crearAnimacionCaminata(this, 'player_M', 'walkLeft', 8, 11);
    crearAnimacionCaminata(this, 'player_M', 'walkRight', 12, 15);

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    this.player.setVelocity(0);

    // Ajustar la velocidad diagonal
    const diagonalVelocity = v_m_personaje * Math.sqrt(0.5);

    // Evaluación de los distinos casos en los que se precionan los botones de movimiento
    switch (true) {
      case cursors.up.isDown && cursors.left.isDown: // Teclas arriba e izquierda
        handlePlayerMovement(this.player, -diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;
    
      case cursors.up.isDown && cursors.right.isDown: // Teclas arriba y derecha
        handlePlayerMovement(this.player, diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;
    
      case cursors.down.isDown && cursors.left.isDown: // Teclas abajo e izquierda
        handlePlayerMovement(this.player, -diagonalVelocity, diagonalVelocity, 'walkDown');
        break;
    
      case cursors.down.isDown && cursors.right.isDown: // Teclas abajo y derecha
        handlePlayerMovement(this.player, diagonalVelocity, diagonalVelocity, 'walkDown');
        break;
    
      case cursors.right.isDown: // Tecla derecha
        handlePlayerMovement(this.player, v_m_personaje, 0, 'walkRight');
        break;
    
      case cursors.left.isDown: // Tecla izquierda
        handlePlayerMovement(this.player, -v_m_personaje, 0, 'walkLeft');
        break;
    
      case cursors.down.isDown: // Tecla abajo
        handlePlayerMovement(this.player, 0, v_m_personaje, 'walkDown');
        break;
    
      case cursors.up.isDown: // Tecla arriba
        handlePlayerMovement(this.player, 0, -v_m_personaje, 'walkUp');
        break;
    
      default: // Ninguna tecla
        this.player.anims.stop();
    }
    
  }
}

function crearAnimacionCaminata(scene, player, key, startFrame, endFrame) {
  scene.anims.create({
    key: key,
    frames: scene.anims.generateFrameNumbers(player, { start: startFrame, end: endFrame }),
    frameRate: 8,
    repeat: -1
  });
}

function handlePlayerMovement(player, velocityX, velocityY, animationKey) {
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
  player.anims.play(animationKey, true);
}