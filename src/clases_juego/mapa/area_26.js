import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_26 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_26' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 26')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_26').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_22', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_30', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        //Decoraciones
        this.arbol1 = this.physics.add.image(posicion.x * 0.60, posicion.y * 0.40, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol2 = this.physics.add.image(posicion.x * 1.70, posicion.y * 0.20, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol3 = this.physics.add.image(posicion.x * 1.85, posicion.y * 1.20, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol4 = this.physics.add.image(posicion.x * 0.20, posicion.y * 1.0, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol5 = this.physics.add.image(posicion.x * 1.40, posicion.y * 1.45, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.arbol6 = this.physics.add.image(posicion.x * 0.60, posicion.y * 1.45, '_arbol_7').setScale(0.82).setDepth(2).setImmovable()
        this.letrero1 = this.physics.add.image(posicion.x * 1.34, posicion.y * 0.45, '_letrero_1').setScale(0.55).setDepth(2).setImmovable()

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
        this.arbol6.setSize(this.arbol6.width * 0.2, this.arbol6.height * 0.15)
        this.arbol6.setOffset(this.arbol6.width * 0.38, this.arbol6.height * 0.85)

        this.letrero1.setSize(this.letrero1.width * 0.3, this.letrero1.height * 0.55)
        this.letrero1.setOffset(this.letrero1.width * 0.38, this.letrero1.height * 0.45)

        this.r1 = this.add.rectangle(posicion.x * 0.05, posicion.y, 100, posicion.y * 2)
        this.r2 = this.add.rectangle(posicion.x * 1.97, posicion.y, 100, posicion.y * 2)

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.arbol1, this.arbol2, this.arbol3, this.arbol4, this.arbol5,
            this.arbol6, this.letrero1, this.r1, this.r2
        ])
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y < 191) {
            this.arbol2.setDepth(2)
        } else {
            this.arbol2.setDepth(0)
        }

        if (this.player.y < 193) {
            this.letrero1.setDepth(2)
        } else {
            this.letrero1.setDepth(0)
        }

        if (this.player.y < 270) {
            this.arbol1.setDepth(2)
        } else {
            this.arbol1.setDepth(0)
        }

        if (this.player.y < 508) {
            this.arbol4.setDepth(2)
        } else {
            this.arbol4.setDepth(0)
        }

        if (this.player.y < 587) {
            this.arbol3.setDepth(2)
        } else {
            this.arbol3.setDepth(0)
        }
    }
}