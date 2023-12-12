import Phaser from "phaser"
import { ajustarAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_23 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_23' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 23')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_23').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_17', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_24', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        //Decoraciones
        this.CasaPueblo = this.physics.add.image(posicion.x * 1.60, posicion.y * 0.0, '_casa_pueblo').setScale(0.82).setDepth(0).setImmovable()
        this.Maseta1 = this.physics.add.image(posicion.x * 1.34, posicion.y * 0.55, '_meceta_1').setScale(0.82).setDepth(0).setImmovable()
        this.Maseta2 = this.physics.add.image(posicion.x * 1.86, posicion.y * 0.55, '_meceta_1').setScale(0.82).setDepth(0).setImmovable()

        this.Maseta1.setSize(this.Maseta1.width, this.Maseta1.height * 0.8)
        this.Maseta1.setOffset(0, 0)
        this.Maseta2.setSize(this.Maseta2.width, this.Maseta2.height * 0.8)
        this.Maseta2.setOffset(0, 0)

        this.r1 = this.add.rectangle(posicion.x * 0.79, posicion.y, 100, posicion.y * 2)
        this.r2 = this.add.rectangle(posicion.x * 1.25, posicion.y * 1.4, posicion.x * 1.5, 100)

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [this.CasaPueblo, this.Maseta1, this.Maseta2, this.r1, this.r2])
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)
    }
}