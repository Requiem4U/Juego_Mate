import Phaser from "phaser";
import backgroundImg from '../imagenes/fondo1.jpg'
import spritesheetP_M from '../imagenes/Mujer_Style_Sheets_128x128.png'

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5);
// Animacion Idle por defecto
let animacionIdle = 'idleFront'

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

    crearAnimacion(this, 'player_M', 'walkDown', 0, 3);
    crearAnimacion(this, 'player_M', 'walkUp', 4, 7);
    crearAnimacion(this, 'player_M', 'walkLeft', 8, 11);
    crearAnimacion(this, 'player_M', 'walkRight', 12, 15);
    crearAnimacion(this, 'player_M', 'idleFront', 16, 19, 2.1);
    crearAnimacion(this, 'player_M', 'idleBack', 20, 23, 2.1);
    crearAnimacion(this, 'player_M', 'idleLeft', 24, 27, 2.1);
    crearAnimacion(this, 'player_M', 'idleRight', 28, 31, 2.1);

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    this.player.setVelocity(0);

    // Evaluación de los distinos casos en los que se precionan los botones de movimiento
    switch (true) {
      case cursors.up.isDown && cursors.left.isDown: // Teclas arriba e izquierda
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, -diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;

      case cursors.up.isDown && cursors.right.isDown: // Teclas arriba y derecha
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;

      case cursors.down.isDown && cursors.left.isDown: // Teclas abajo e izquierda
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, -diagonalVelocity, diagonalVelocity, 'walkDown');
        break;

      case cursors.down.isDown && cursors.right.isDown: // Teclas abajo y derecha
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, diagonalVelocity, diagonalVelocity, 'walkDown');
        break;

      case cursors.right.isDown: // Tecla derecha
        animacionIdle = 'idleRight'
        manejadorMovimientoJugador(this.player, v_m_personaje, 0, 'walkRight');
        break;

      case cursors.left.isDown: // Tecla izquierda
        animacionIdle = 'idleLeft'
        manejadorMovimientoJugador(this.player, -v_m_personaje, 0, 'walkLeft');
        break;

      case cursors.down.isDown: // Tecla abajo
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, 0, v_m_personaje, 'walkDown');
        break;

      case cursors.up.isDown: // Tecla arriba
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, 0, -v_m_personaje, 'walkUp');
        break;

      default: // Ninguna tecla
        manejadorAnimacionIdle(this.player, animacionIdle)
    }

  }
}

function crearAnimacion(scene, player, key, startFrame, endFrame, frame_rate = 8) {
  scene.anims.create({
    key: key,
    frames: scene.anims.generateFrameNumbers(player, { start: startFrame, end: endFrame }),
    frameRate: frame_rate,
    repeat: -1
  });
}

function manejadorMovimientoJugador(player, velocityX, velocityY, animationKey) {
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
  player.anims.play(animationKey, true);
}

function manejadorAnimacionIdle(player, animacionIdle) {
  player.anims.play(animacionIdle, true)
}