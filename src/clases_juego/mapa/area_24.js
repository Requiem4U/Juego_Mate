import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_24 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_24' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 24')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_24').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_31', {
            posicionX: posicion.x,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        // Salida Sur
        generarSalidaEscena(this, this.player, 'area_28', {
            posicionX: posicion.x,
            posicionY: posicion.y * 2.05,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'arriba' },
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_25', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_23', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        //Decoraciones
        this.arbolCentro = this.physics.add.image(posicion.x * 1.0, posicion.y * 0.92, '_arbol_centro').setScale(0.82).setDepth(2).setImmovable()

        this.arbolCentro.setSize(this.arbolCentro.width * 0.46, this.arbolCentro.height * 0.272)
        this.arbolCentro.setOffset(this.arbolCentro.width * 0.265, this.arbolCentro.height * 0.52)

        this.c1 = this.add.circle(posicion.x * 0.495, posicion.y * 1.08, 50)
        this.c2 = this.add.circle(posicion.x * 1.336, posicion.y * 1.08, 50)

        this.physics.world.enable([this.c1, this.c2])
        this.c1.body.immovable = true
        this.c1.body.setCircle(115)
        this.c2.body.immovable = true
        this.c2.body.setCircle(115)

        this.physics.add.collider(this.player, [this.arbolCentro, this.c1, this.c2])

        this.input.keyboard.on('keydown', (event) => {
            if (event.key == 'Enter')
                console.log(this.player.y)
        })
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (this.player.y < 428) {
            this.arbolCentro.setDepth(2)
        } else {
            this.arbolCentro.setDepth(0)
        }
    }
}