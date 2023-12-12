import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_31 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_31' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 31')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_31').setScale(0.855, 0.785).setDepth(-1)

        this.add.image(posicion.x * 0.35, posicion.y * 0.6, '_arbol_2').setScale(0.6).setDepth(-1)
        this.add.image(posicion.x * 1.65, posicion.y, '_arbol_2').setScale(0.6).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, })

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_24', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })


        this.r1 = this.add.rectangle(posicion.x * 0.48, posicion.y * 1.8, 200, 200)
        this.r2 = this.add.rectangle(posicion.x * 1.55, posicion.y * 1.8, 200, 200)
        this.r3 = this.add.rectangle(posicion.x * 0.69, posicion.y * 1.92, posicion.x * 0.4, 50)
        this.r4 = this.add.rectangle(posicion.x * 1.335, posicion.y * 1.92, posicion.x * 0.45, 50)
        this.r5 = this.add.rectangle(posicion.x * 0.69, posicion.y * 1.65, posicion.x * 0.4, 50)
        this.r6 = this.add.rectangle(posicion.x * 1.335, posicion.y * 1.65, posicion.x * 0.45, 50)
        this.entradaIglesia = this.add.rectangle(posicion.x, posicion.y * 1.62, posicion.x * 0.25, 50)

        this.physics.world.enable([this.r1, this.r2, this.r3, this.r4, this.r5, this.r6, this.entradaIglesia])
        this.r1.body.immovable = true
        this.r2.body.immovable = true
        this.r3.body.immovable = true
        this.r4.body.immovable = true
        this.r5.body.immovable = true
        this.r6.body.immovable = true
        this.entradaIglesia.body.immovable = true

        this.physics.add.collider(this.player, [this.r1, this.r2, this.r3, this.r4, this.r5, this.r6])
        this.physics.add.collider(this.player, this.entradaIglesia)
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

    }
}