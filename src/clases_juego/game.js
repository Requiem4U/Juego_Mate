import Phaser from "phaser";
import { crearAnimacion } from "./manejadores/manejador_animaciones";
import backgroundImg from '../imagenes/Fondos/Fondo_Seleccionar_Personaje.jpg'
import spritesheetP from '../imagenes/Personajes/Mujer_Style_Sheets_128x128.png'
import idleP from '../imagenes/Personajes/Mujer_Style_Sheet_Idle.png'
import spritesheetP_2 from '../imagenes/Personajes/Hombre_Style_Sheets_128x128.png'
import sprite_vendedor from '../imagenes/Personajes/Vendedor_Style_Sheet_128x128.png'
import spriteDialogo from '../imagenes/Personajes/GloboDialogo.png'

import arbol_1 from "../imagenes/Objetos/Decoracion/Arbol_1.png"

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5);
// Animacion Idle por defecto
let animacionIdle = 'idleFront'
let cursors = { flechas: undefined, letras: undefined }

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.spritesheet('player', spritesheetP_2, { frameWidth: 128, frameHeight: 128 })
    this.load.spritesheet('idle_P', idleP, { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet('sprite_vendedor', sprite_vendedor, { frameWidth: 128, frameHeight: 128 })
    this.load.spritesheet('sprite_dialogo', spriteDialogo, { frameWidth: 128, frameHeight: 128 })

    this.load.image('background', backgroundImg)
    
    this.load.image('arbol_1', arbol_1)
  }

  create() {
    cursors.flechas = this.input.keyboard.createCursorKeys();
    cursors.letras = this.input.keyboard.addKeys('W,A,S,D');


    let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }

    this.add.image(posicion.x, posicion.y, 'background').setDepth(-1)

    this.grupo1 = this.physics.add.staticGroup({
      key: 'arbol_1', 
      frameQuantity: 5,
      gridAlign: { 
        width: 4, 
        height: 4, 
        cellWidth: 130, 
        cellHeight: 130, 
        x: 500, 
        y: 100,
      }
    })
    this.grupo1.children.iterate((arbol)=>{
      arbol.setScale(0.5)
      arbol.setOrigin(1)
      arbol.setSize(125,125)
    })

    this.idle = this.physics.add.sprite(posicion.x * 0.6, posicion.y * 0.8, 'idle_P').setImmovable()
    this.sprite_vendedor = this.physics.add.sprite(posicion.x * 1.6, posicion.y * 0.8, 'sprite_vendedor').setOrigin(0.48, 0.35).setScale(1.25, 1.25).setImmovable()
    this.player = this.physics.add.sprite(posicion.x, posicion.y, 'player')
    this.idle_dialogo = this.add.sprite(this.sprite_vendedor.x, this.sprite_vendedor.y, 'sprite_dialogo').setOrigin(0.5, 1).setScale(0.8)

    crearAnimacion(this, 'idle_P', 'idle_P', 0, 3, 2.1)

    // Ceación de animaciones de caminata
    crearAnimacion(this, 'player', 'walkDown', 0, 3);
    crearAnimacion(this, 'player', 'walkUp', 4, 7);
    crearAnimacion(this, 'player', 'walkLeft', 8, 11);
    crearAnimacion(this, 'player', 'walkRight', 12, 15);
    //Creación de animación Idle
    crearAnimacion(this, 'player', 'idleFront', 16, 19, 2.1);
    crearAnimacion(this, 'player', 'idleBack', 20, 23, 2.1);
    crearAnimacion(this, 'player', 'idleLeft', 24, 27, 2.1);
    crearAnimacion(this, 'player', 'idleRight', 28, 31, 2.1);

    crearAnimacion(this, 'sprite_vendedor', 'idle_vendedor_estandar', 0, 9, 5);
    crearAnimacion(this, 'sprite_dialogo', 'idle_dialogo', 0, 4, 5.5, 0);

    this.sprite_vendedor.anims.play('idle_vendedor_estandar')
    this.idle_dialogo.visible = false

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);

    this.physics.world.enable(this.grupo1)

    this.physics.add.collider(this.player, this.grupo1, ()=>{console.log(1)}, null, this)

    let idleSize = { width: this.idle.width, height: this.idle.height }
    let playerSize = { width: this.player.width, height: this.player.height }

    this.player.setSize(playerSize.width * 0.28125, playerSize.height * 0.1875)
    this.player.setOffset(playerSize.width * 0.375, playerSize.height * 0.578125)

    this.idle.setSize(idleSize.width * 0.28125, idleSize.height * 0.1875)
    this.idle.setOffset(idleSize.width * 0.375, idleSize.height * 0.578125)

    this.g = false

    this.isColision = this.physics.add.overlap(this.player, this.sprite_vendedor, (player, obj) => {
      this.g = true
    }, null, this)

    this.idle.anims.play('idle_P')

    this.timer = this.time.addEvent({
      delay: 10,
      callback: () => {
        if (this.g) {
          if (!this.idle_dialogo.anims.isPlaying) {
            this.idle_dialogo.visible = true
            this.idle_dialogo.anims.play('idle_dialogo')
            this.g = false
          }else{
            this.g = false
          }
        } else {
          if (!this.idle_dialogo.anims.isPlaying) {
            this.idle_dialogo.visible = false
          this.idle_dialogo.anims.stop()
          }
        }
      },
      callbackScope: this,
      loop: true
    })

    this.confirmacion = this.input.keyboard.addKey('F')

  }

  update() {

    this.player.setVelocity(0);


    // Evaluación de los distinos casos en los que se precionan los botones de movimiento (Flechas del teclado)
    switch (true) {
      // Teclas arriba e izquierda  ||  Teclas W  A
      case (cursors.flechas.up.isDown && cursors.flechas.left.isDown) || (cursors.letras.W.isDown && cursors.letras.A.isDown):
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, -diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;

      // Teclas arriba y derecha    ||  Teclas W  D
      case (cursors.flechas.up.isDown && cursors.flechas.right.isDown) || (cursors.letras.W.isDown && cursors.letras.D.isDown):
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, diagonalVelocity, -diagonalVelocity, 'walkUp');
        break;

      // Teclas abajo e izquierda   ||  Teclas S  A
      case (cursors.flechas.down.isDown && cursors.flechas.left.isDown) || (cursors.letras.S.isDown && cursors.letras.A.isDown):
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, -diagonalVelocity, diagonalVelocity, 'walkDown');
        break;

      // Teclas abajo y derecha    ||  Teclas S  D
      case (cursors.flechas.down.isDown && cursors.flechas.right.isDown) || (cursors.letras.S.isDown && cursors.letras.D.isDown):
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, diagonalVelocity, diagonalVelocity, 'walkDown');
        break;

      // Tecla derecha    ||  Tecla D
      case cursors.flechas.right.isDown || cursors.letras.D.isDown:
        animacionIdle = 'idleRight'
        manejadorMovimientoJugador(this.player, v_m_personaje, 0, 'walkRight');
        break;

      // Tecla izquierda  ||  Tecla A
      case cursors.flechas.left.isDown || cursors.letras.A.isDown:
        animacionIdle = 'idleLeft'
        manejadorMovimientoJugador(this.player, -v_m_personaje, 0, 'walkLeft');
        break;

      // Tecla abajo      ||  Tecla S
      case cursors.flechas.down.isDown || cursors.letras.S.isDown:
        animacionIdle = 'idleFront'
        manejadorMovimientoJugador(this.player, 0, v_m_personaje, 'walkDown');
        break;

      // Tecla arriba     ||  Tecla W
      case cursors.flechas.up.isDown || cursors.letras.W.isDown:
        animacionIdle = 'idleBack'
        manejadorMovimientoJugador(this.player, 0, -v_m_personaje, 'walkUp');
        break;

      case this.confirmacion.isDown && this.g:
        this.scene.start('vendedor_pantalla_principal');
        break;

      default: // Ninguna tecla
        manejadorAnimacionIdle(this.player, animacionIdle)
    }

    if (this.player.y > this.idle.y) {
      this.player.setDepth(1)
      this.idle.setDepth(0)
    } else {
      this.player.setDepth(0)
      this.idle.setDepth(1)
    }

  }
}

function manejadorMovimientoJugador(player, velocityX, velocityY, animationKey) {
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
  player.anims.play(animationKey, true);
}

function manejadorAnimacionIdle(player, animacionIdle) {
  player.anims.play(animacionIdle, true)
}

function manejarColision(player, obj) {
  console.log(player.y - obj.y)
}

function manejarColisionVendedor(player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_dialogo')
}

function manejarNoColisionVendedor(player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_estandar')
}