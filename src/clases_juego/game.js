import Phaser from "phaser";
import backgroundImg from '../imagenes/fondo1.jpg'
import spritesheetP_M from '../imagenes/Mujer_Style_Sheets_128x128.png'

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.spritesheet('player_M', spritesheetP_M, { frameWidth: 128, frameHeight: 128 })
  }

  create() {
    const gameContainer = document.getElementById('contenedor_juego');

    this.player = this.physics.add.sprite(gameContainer.clientWidth / 2, gameContainer.clientHeight / 2, 'player_M')

    crearAnimacionCaminata(this,'player_M' , 'walkDown', 0, 3);
    crearAnimacionCaminata(this,'player_M' , 'walkUp', 4, 7);
    crearAnimacionCaminata(this,'player_M' , 'walkLeft', 8, 11);
    crearAnimacionCaminata(this,'player_M' , 'walkRight', 12, 15);

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

  this.player.setVelocity(0);

  if (cursors.right.isDown) {
    handlePlayerMovement(this.player, 160, 0, 'walkRight');
  } else if (cursors.left.isDown) {
    handlePlayerMovement(this.player, -160, 0, 'walkLeft');
  } else if (cursors.up.isDown) {
    handlePlayerMovement(this.player, 0, -160, 'walkUp');
  } else if (cursors.down.isDown) {
    handlePlayerMovement(this.player, 0, 160, 'walkDown');
  } else {
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