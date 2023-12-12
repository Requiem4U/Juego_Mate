import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_30 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_30' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 30')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_30').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, {
            escalaPersonaje: 1.25,
            surX: posicion.x * 0.28
        }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_26', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_34', {
            posicionX: posicion.x * 0.28,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        //Decoraciones
        this.arbusto1 = this.physics.add.image(posicion.x * 0.35, posicion.y * 0.45, '_arbol_8').setScale(0.82).setDepth(2).setImmovable()
        this.arbusto2 = this.physics.add.image(posicion.x * 1.15, posicion.y * 1.4, '_arbol_8').setScale(0.82).setDepth(2).setImmovable()
        this.arbusto3 = this.physics.add.image(posicion.x * 1.65, posicion.y * 1.05, '_arbol_8').setScale(0.82).setDepth(2).setImmovable()
        this.arbol1 = this.physics.add.image(posicion.x * 0.60, posicion.y * 0.10, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol2 = this.physics.add.image(posicion.x * 0.10, posicion.y * 0.50, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol3 = this.physics.add.image(posicion.x * 1.80, posicion.y * 0.20, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol4 = this.physics.add.image(posicion.x * 1.30, posicion.y * 0.70, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol5 = this.physics.add.image(posicion.x * 0.80, posicion.y * 1.60, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.add.image(posicion.x * 1.60, posicion.y * 1.90, '_arbol_7').setScale(0.82).setDepth(2)

        this.arbol1.setSize(this.arbol1.width * 0.2, this.arbol1.height * 0.15)
        this.arbol1.setOffset(this.arbol1.width * 0.38, this.arbol1.height * 0.85)
        this.arbol2.setSize(this.arbol2.width * 0.2, this.arbol2.height * 0.15)
        this.arbol2.setOffset(this.arbol2.width * 0.38, this.arbol2.height * 0.85)
        this.arbol3.setSize(this.arbol3.width * 0.2, this.arbol3.height * 0.15)
        this.arbol3.setOffset(this.arbol3.width * 0.38, this.arbol3.height * 0.85)
        this.arbol4.setSize(this.arbol4.width * 0.2, this.arbol4.height * 0.15)
        this.arbol4.setOffset(this.arbol4.width * 0.38, this.arbol4.height * 0.85)
        this.arbol5.setSize(this.arbol5.width * 0.2, this.arbol5.height * 0.15)
        this.arbol5.setOffset(this.arbol5.width * 0.38, this.arbol5.height * 0.85)

        this.arbusto1.setSize(this.arbusto1.width, this.arbusto1.height * 0.5)
        this.arbusto1.setOffset(0, this.arbusto1.height * 0.5)
        this.arbusto2.setSize(this.arbusto2.width, this.arbusto2.height * 0.5)
        this.arbusto2.setOffset(0, this.arbusto2.height * 0.5)
        this.arbusto3.setSize(this.arbusto3.width, this.arbusto3.height * 0.5)
        this.arbusto3.setOffset(0, this.arbusto3.height * 0.5)

        this.r1 = this.add.rectangle(posicion.x * 0.05, posicion.y, 100, posicion.y * 2)
        this.r2 = this.add.rectangle(posicion.x * 1.97, posicion.y, 100, posicion.y * 2)

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.arbol1, this.arbol2, this.arbol3, this.arbol4, this.arbol5,
            this.arbusto1, this.arbusto2, this.arbusto3,
            this.r1, this.r2
        ])

        this.input.keyboard.on('keydown', (event) => {
            if (event.key == 'Enter')
                console.log(this.player.y)
        })
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y < 151) {
            this.arbol1.setDepth(2)
            this.arbusto1.setDepth(2)
        } else {
            this.arbol1.setDepth(0)
            this.arbusto1.setDepth(0)
        }

        if (this.player.y < 191) {
            this.arbol3.setDepth(2)
        } else {
            this.arbol3.setDepth(0)
        }

        if (this.player.y < 310) {
            this.arbol2.setDepth(2)
        } else {
            this.arbol2.setDepth(0)
        }

        if (this.player.y < 376) {
            this.arbusto3.setDepth(2)
        } else {
            this.arbusto3.setDepth(0)
        }

        if (this.player.y < 389) {
            this.arbol4.setDepth(2)
        } else {
            this.arbol4.setDepth(0)
        }

        if (this.player.y < 611) {
            this.arbusto2.setDepth(2)
        } else {
            this.arbusto2.setDepth(0)
        }
    }
}