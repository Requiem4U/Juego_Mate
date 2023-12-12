import Phaser from 'phaser'
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_14 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_14' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 14')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_14').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_08', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_17', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_13', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        //Decoraciones
        this.arbol1 = this.physics.add.image(posicion.x * 0.60, posicion.y * 0.20, '_arbol_5').setScale(0.82).setDepth(0).setImmovable()
        this.arbol2 = this.physics.add.image(posicion.x * 0.35, posicion.y * 1.44, '_arbol_5').setScale(0.82).setDepth(2).setImmovable()
        this.arbusto1 = this.physics.add.image(posicion.x * 0.20, posicion.y * 0.50, '_arbol_1').setScale(0.82).setDepth(0).setImmovable()
        this.arbusto2 = this.physics.add.image(posicion.x * 0.70, posicion.y * 1.65, '_arbol_1').setScale(0.82).setDepth(0).setImmovable()
        this.add.image(posicion.x * 1.27, posicion.y * 0.40, '_arbol_5').setScale(0.82).setDepth(1)
        this.add.image(posicion.x * 1.40, posicion.y * 1.74, '_arbol_1').setScale(0.82).setDepth(1)
        this.add.image(posicion.x * 1.80, posicion.y * 1.74, '_arbol_1').setScale(0.82).setDepth(1)

        this.arbol1.setSize(this.arbol1.width * 0.2, this.arbol1.height * 0.15)
        this.arbol1.setOffset(this.arbol1.width * 0.38, this.arbol1.height * 0.85)
        this.arbol2.setSize(this.arbol2.width * 0.2, this.arbol2.height * 0.15)
        this.arbol2.setOffset(this.arbol2.width * 0.38, this.arbol2.height * 0.85)

        this.arbusto1.setSize(this.arbusto1.width, this.arbusto1.height * 0.5)
        this.arbusto1.setOffset(0, this.arbusto1.height * 0.5)
        this.arbusto2.setSize(this.arbusto2.width, this.arbusto2.height * 0.5)
        this.arbusto2.setOffset(0, this.arbusto2.height * 0.5)

        this.r2 = this.add.rectangle(posicion.x * 1.58, posicion.y, posicion.x * 0.75, posicion.y * 2)

        this.physics.world.enable([this.r2])
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.arbol1, this.arbol2, this.arbusto1, this.arbusto2, this.r2
        ])

        this.input.keyboard.on('keydown', (event) => {
            if (event.key == 'Enter')
                console.log(this.player.y)
        })
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y > 287) {
            this.arbol1.setDepth(0)
            this.arbusto1.setDepth(0)
        } else {
            this.arbol1.setDepth(2)
            this.arbusto1.setDepth(2)
        }

        if (this.player.y > 748) {
            this.arbusto2.setDepth(0)
        } else {
            this.arbusto2.setDepth(2)
        }
    }
}