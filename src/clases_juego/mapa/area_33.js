import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_33 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_33' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 33')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_33').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, {
            escalaPersonaje: 1.25,
            esteY: posicion.y * 1.085,
            oesteY: posicion.y * 1.085
        })

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_02', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.236,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_35', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.236,
            valoresSiguienteEscena: { entrada: 'der' },
        })

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

    }
}