import Phaser from 'phaser'
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_17 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_17' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 17')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_17').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_14', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_23', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_16', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        //Decoraciones
        this.arbol1 = this.physics.add.image(posicion.x * 1.65, posicion.y * 1.44, '_arbol_5').setScale(0.82).setDepth(1).setImmovable()
        this.arbol2 = this.physics.add.image(posicion.x * 1.343, posicion.y * 0.14, '_arbol_2').setScale(0.9, 0.82).setDepth(1).setImmovable()
        this.arbol3 = this.physics.add.image(posicion.x * 1.926, posicion.y * 0.137, '_arbol_2').setScale(0.9, 0.82).setDepth(1).setImmovable()
        this.caja = this.physics.add.image(posicion.x * 1.28, posicion.y * 1.74, '_caja_naranjas_1').setScale(0.82).setDepth(1).setImmovable()

        this.arbol1.setSize(this.arbol1.width * 0.2, this.arbol1.height * 0.15)
        this.arbol1.setOffset(this.arbol1.width * 0.38, this.arbol1.height * 0.85)
        this.arbol2.setSize(this.arbol2.width * 0.2, this.arbol2.height * 0.15)
        this.arbol2.setOffset(this.arbol2.width * 0.38, this.arbol2.height * 0.85)
        this.arbol3.setSize(this.arbol3.width * 0.2, this.arbol3.height * 0.15)
        this.arbol3.setOffset(this.arbol3.width * 0.38, this.arbol3.height * 0.85)

        this.caja.setSize(this.caja.width, this.caja.height * 0.7)
        this.caja.setOffset(0, this.caja.height * 0.15)

        this.r1 = this.add.rectangle(posicion.x * 0.425, posicion.y * 0.32, posicion.x * 0.85, posicion.y * 0.7)
        this.r2 = this.add.rectangle(posicion.x * 1.625, posicion.y * 0.65, posicion.x * 0.485, posicion.y * 0.35)

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.arbol1, this.arbol2, this.arbol3, this.caja, this.r1, this.r2
        ])

        this.input.keyboard.on('keydown', (event) => {
            if (event.key == 'Enter')
                console.log(this.player.y)
        })
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y > 295) {
            this.arbol2.setDepth(0)
            this.arbol3.setDepth(0)
        } else {
            this.arbol2.setDepth(2)
            this.arbol3.setDepth(2)
        }

        if (this.player.y < 600) {
            this.caja.setDepth(2)
        } else {
            this.caja.setDepth(0)
        }
    }
}