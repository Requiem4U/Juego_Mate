import Phaser from "phaser"
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_22 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_22' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {
        console.log('area 22')

        this.Movimientos = new Manejador_Movimiento(this)
        this.Movimientos.definirAnimaciones({
            idleFront: 'idleFront_juan',
            idleBack: 'idleBack_juan',
            idleLeft: 'idleLeft_juan',
            idleRight: 'idleRight_juan',
            walkUp: 'walkUp_juan',
            walkDown: 'walkDown_juan',
            walkLeft: 'walkLeft_juan',
            walkRight: 'walkRight_juan'
        })

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, '_fondo_exterior_casa_juan').setScale(0.8, 0.735).setRotation(3.141593).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, })

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_16', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_26', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)
    }
}