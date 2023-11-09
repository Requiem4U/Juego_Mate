import Phaser from "phaser";
import { crearAnimacion } from "./manejadores/manejador_elementos_escena";
import { Manejador_Movimiento } from "./manejadores/manejador_movimientos";

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5)


let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

export class Pantalla_Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'pantalla_inicio' })
    }

    preload () {
    }

    create () {
        this.Movimientos = new Manejador_Movimiento(this)

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }

        this.add.image(posicion.x * 0.99, posicion.y * 0.975, '_fondo_pantalla_incio').setScale(0.77)
        this.minijuego = this.physics.add.sprite(posicion.x * 0.994, posicion.y * 0.991, 'minijuego_incio').setScale(1.0125, 1.0016)

        crearAnimacion(this, '_sprite_minijuego_pantalla_inicio', 'animacion_minijuego_inicio', 0, 18, { frecuencia_frames: 6 })
        this.minijuego.anims.play('animacion_minijuego_inicio')

        this.player = this.physics.add.sprite(posicion.x, posicion.y * 1.4, '_sprites_juan_cupul').setScale(0.8)
        this.player.anims.play('walkRight_juan')

        this.btn_jugar = this.add.circle(posicion.x * 1.625, posicion.y * 1.44, 45, 0x000000, 0)
        this.physics.world.enable(this.btn_jugar)
        this.btn_jugar.setInteractive()
        this.btn_jugar.on('pointerdown', function (pointer) {
            this.scene.start('seleccion_personaje')
        }, this);

    }

    update () {

    }
}