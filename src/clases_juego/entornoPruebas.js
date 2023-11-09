import Phaser from "phaser";
import { ajustarAreaColision, crearAnimacion, crearGrupoElementos } from "./manejadores/manejador_elementos_escena";
import { Manejador_Movimiento } from "./manejadores/manejador_movimientos";

export class Juego extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload () {
  }

  create () {
    this.Movimientos = new Manejador_Movimiento(this)

    let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }

    this.add.image(posicion.x, posicion.y, '_fondo_vegetacion').setDepth(-1)

    this.grupo1 = crearGrupoElementos(this, '_arbol_1')

    this.idle = this.physics.add.sprite(posicion.x * 0.6, posicion.y * 0.8, '_sprites_mujer').setImmovable().setScale(3)
    this._sprite_vendedor = this.physics.add.sprite(posicion.x * 1.6, posicion.y * 0.8, '_sprite_vendedor').setOrigin(0.48, 0.35).setScale(1.25, 1.25).setImmovable()
    this.player = this.physics.add.sprite(posicion.x, posicion.y, '_sprites_hombre')
    this.idle_dialogo = this.add.sprite(this._sprite_vendedor.x, this._sprite_vendedor.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)

    crearAnimacion(this, '_sprites_mujer', '_idle_mujer', 16, 19, { frecuencia_frames: 2.1 })

    // Ceación de animaciones de caminata
    crearAnimacion(this, '_sprites_hombre', 'walkDown', 0, 3);
    crearAnimacion(this, '_sprites_hombre', 'walkUp', 4, 7);
    crearAnimacion(this, '_sprites_hombre', 'walkLeft', 8, 11);
    crearAnimacion(this, '_sprites_hombre', 'walkRight', 12, 15);
    //Creación de animación Idle
    crearAnimacion(this, '_sprites_hombre', 'idleFront', 16, 19, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleBack', 20, 23, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleLeft', 24, 27, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleRight', 28, 31, { frecuencia_frames: 2.1 });

    crearAnimacion(this, '_sprite_vendedor', 'idle_vendedor_estandar', 0, 9, { frecuencia_frames: 5 });

    this._sprite_vendedor.anims.play('idle_vendedor_estandar')
    this.idle_dialogo.visible = false

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);

    this.physics.world.enable(this.grupo1)

    this.physics.add.collider(this.player, this.grupo1, () => { console.log(1) }, null, this)

    ajustarAreaColision(this.player, { sizeX: 0.28125, sizeY: 0.1875, offsetX: 0.375, offsetY: 0.578125 })
    ajustarAreaColision(this.idle, { sizeX: 0.28125, sizeY: 0.1875, offsetX: 0.375, offsetY: 0.578125 })

    this.g = false

    this.physics.add.overlap(this.player, this._sprite_vendedor, () => {
      this.g = true
    }, null, this)

    this.idle.anims.play('_idle_mujer')

    this.timer = this.time.addEvent({
      delay: 10,
      callback: () => {
        if (this.g) {
          if (!this.idle_dialogo.anims.isPlaying) {
            this.idle_dialogo.visible = true
            this.idle_dialogo.anims.play('idle_dialogo')
            this.g = false
          } else {
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

  update () {

    this.player.setVelocity(0);

    this.Movimientos.movimientoPersonaje(this.player)

    switch (true) {
      case this.confirmacion.isDown && this.g:
        console.log(1)
        break
      case this.confirmacion.isDown:
        console.log(34)
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

function manejadorMovimientoJugador (player, velocityX, velocityY, animationKey) {
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
  player.anims.play(animationKey, true);
}

function manejadorAnimacionIdle (player, animacionIdle) {
  player.anims.play(animacionIdle, true)
}

function manejarColision (player, obj) {
  console.log(player.y - obj.y)
}

function manejarColisionVendedor (player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_dialogo')
}

function manejarNoColisionVendedor (player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_estandar')
}