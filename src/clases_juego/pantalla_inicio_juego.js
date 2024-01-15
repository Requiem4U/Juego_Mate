import Phaser from "phaser";
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

        this.add.image(posicion.x * 0.99, posicion.y * 0.975, '_fondo_pantalla_incio').setScale(0.8)
        this.minijuego = this.physics.add.sprite(posicion.x * 1.0325, posicion.y * 0.476, 'minijuego_incio').setScale(0.65)

        this.minijuego.anims.play('animacion_minijuego_inicio')

        this.player = this.physics.add.sprite(posicion.x * 1.0325, posicion.y * 0.7, '_sprites_juan_cupul').setScale(0.8)
        this.player.anims.play('walkRight_juan')

        this.add.image(posicion.x, posicion.y, '_vidrio').setScale(0.8)

        this.btn_jugar = this.add.circle(posicion.x * 1.18, posicion.y * 1.38, 45, 0x000000, 0)
        this.physics.world.enable(this.btn_jugar)
        this.btn_jugar.body.setCircle(35)
        this.btn_jugar.setInteractive()
        this.btn_jugar.on('pointerdown', function (pointer) {
            this.scene.start('area_32_interior')
        }, this);

        this.btn_salir = this.add.circle(posicion.x * 1.345, posicion.y * 1.245, 45, 0x000000, 0)
        this.physics.world.enable(this.btn_salir)
        this.btn_salir.body.setCircle(35)
        this.btn_salir.setInteractive()
        this.btn_salir.on('pointerdown', function (pointer) {
            this.scene.start('LoginScene')
        }, this);


        this.add.text(800, 385, 'Usa el mouse para seleccionar', {
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

    }

    update () {

    }
}