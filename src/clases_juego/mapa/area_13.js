import Phaser from "phaser"
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_13 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_13' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 13')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_13').setScale(0.855, 0.785).setDepth(-1)
        //this.add.image(posicion.x, posicion.y, '_casa_pueblo').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_16', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_14', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Decoraciones
        this.CasaPueblo = this.physics.add.image(posicion.x * 0.41, posicion.y * 0.51, '_casa_pueblo').setScale(0.82).setDepth(0).setImmovable()
        this.arbol1 = this.physics.add.image(posicion.x * 0.08, posicion.y * 1.00, '_arbol_5').setScale(0.82).setDepth(1).setImmovable()
        this.arbol2 = this.physics.add.image(posicion.x * 1.70, posicion.y * 1.50, '_arbol_5').setScale(0.82).setDepth(1).setImmovable()
        this.cuveta1 = this.physics.add.image(posicion.x * 1.40, posicion.y * 1.70, '_cubeta_2').setScale(0.82).setDepth(1).setImmovable()
        this.pozo1 = this.physics.add.image(posicion.x * 1.25, posicion.y * 1.65, '_pozo_1').setScale(0.82).setDepth(1).setImmovable()
        this.lavadero1 = this.physics.add.image(posicion.x * 0.25, posicion.y * 1.80, '_lavadero_1').setScale(0.82).setDepth(1).setImmovable()

        this.arbol1.setSize(this.arbol1.width * 0.2, this.arbol1.height * 0.25)
        this.arbol1.setOffset(this.arbol1.width * 0.38, this.arbol1.height * 0.75)
        this.arbol2.setSize(this.arbol2.width * 0.2, this.arbol2.height * 0.25)
        this.arbol2.setOffset(this.arbol2.width * 0.38, this.arbol2.height * 0.75)

        this.pozo1.setSize(this.pozo1.width, this.pozo1.height * 0.45)
        this.pozo1.setOffset(0, this.pozo1.height * 0.35)

        this.r2 = this.add.rectangle(posicion.x * 1.225, posicion.y * 0.4, posicion.x, posicion.y * 0.8)

        this.physics.world.enable([this.r2])
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [
            this.CasaPueblo, this.arbol1, this.lavadero1,
            this.cuveta1, this.arbol2, this.pozo1, this.r2
        ])

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y > 696) {
            this.pozo1.setDepth(0)
            this.cuveta1.setDepth(0)
        } else {
            this.pozo1.setDepth(2)
            this.cuveta1.setDepth(2)
        }
    }
}