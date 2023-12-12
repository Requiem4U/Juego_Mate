import Phaser from 'phaser'
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_16 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_16' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 16')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_16').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_13', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_22', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_17', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        this.arbol1 = this.physics.add.image(posicion.x * 1.322, posicion.y * 0.145, '_arbol_5').setScale(0.82).setDepth(2).setImmovable()
        this.cuveta1 = this.physics.add.image(posicion.x * 1.37, posicion.y * 0.70, '_cubeta_2').setScale(0.82).setDepth(2).setImmovable()

        this.arbol1.setSize(this.arbol1.width * 0.2, this.arbol1.height * 0.15)
        this.arbol1.setOffset(this.arbol1.width * 0.38, this.arbol1.height * 0.85)

        this.r1 = this.add.rectangle(posicion.x * 0.425, posicion.y * 0.57, posicion.x * 0.85, posicion.y)
        this.r2 = this.add.rectangle(posicion.x * 0.46, posicion.y * 1.601, posicion.x * 0.85, posicion.y * 0.8)

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.r1, this.r2, this.arbol1, this.cuveta1
        ])

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y > 265) {
            this.arbol1.setDepth(0)
            this.cuveta1.setDepth(0)
        } else {
            this.arbol1.setDepth(2)
            this.cuveta1.setDepth(2)
        }
    }
}