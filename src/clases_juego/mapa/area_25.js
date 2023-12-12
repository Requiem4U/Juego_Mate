import Phaser from "phaser"
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_25 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_25' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 25')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_25').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25 }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_24', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        //Decoraciones
        this.arbusto1 = this.physics.add.image(posicion.x * 0.40, posicion.y * 0.50, '_arbol_1').setScale(0.82).setDepth(0).setImmovable()
        this.arbusto2 = this.physics.add.image(posicion.x * 0.40, posicion.y * 1.60, '_arbol_1').setScale(0.82).setDepth(2).setImmovable()
        this.add.image(posicion.x * 1.85, posicion.y * 1.60, '_arbol_1').setScale(0.82)
        this.add.image(posicion.x * 1.85, posicion.y * 0.25, '_arbol_1').setScale(0.82)
        this.add.image(posicion.x * 1.20, posicion.y * 1.70, '_arbol_1').setScale(0.82)
        this.add.image(posicion.x * 1.20, posicion.y * 0.15, '_arbol_1').setScale(0.82)

        this.arbusto1.setSize(this.arbusto1.width, this.arbusto1.height * 0.5)
        this.arbusto1.setOffset(0, this.arbusto1.height * 0.5)
        this.arbusto2.setSize(this.arbusto2.width, this.arbusto2.height * 0.5)
        this.arbusto2.setOffset(0, this.arbusto2.height * 0.5)

        this.r2 = this.add.rectangle(posicion.x * 1.1, posicion.y, 100, posicion.y * 2)
        this.c1 = this.add.circle(posicion.x * 0.98, posicion.y * 1.05, 275)

        this.physics.world.enable([this.r2, this.c1])
        this.r2.body.immovable = true
        this.c1.body.immovable = true
        this.c1.body.setCircle(275)

        this.physics.add.collider(this.player, [
            this.arbusto1, this.arbusto2, this.r2, this.c1
        ])

        this.input.keyboard.on('keydown', (event) => {
            if (event.key == 'Enter')
                console.log(this.player.y)
        })
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y < 156) {
            this.arbusto1.setDepth(2)
        } else {
            this.arbusto1.setDepth(0)
        }

        if (this.player.y < 592) {
            this.arbusto2.setDepth(2)
        } else {
            this.arbusto2.setDepth(0)
        }
    }
}