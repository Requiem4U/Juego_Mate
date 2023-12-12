import Phaser from "phaser"
import { ajustarAreaColision, crearGrupoElementos, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_03 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_03' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 03')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_03').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(2)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_04', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_02', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
            funcionesExtra: () => {
                if (this.timer) this.timer.remove()
            }
        })

        this.grupo1 = crearGrupoElementos(this, '_arbol_6', {
            width: 4,
            repeticiones: 4,
            posicionX: posicion.x * 0.15,
            posicionY: posicion.y * 1.5,
            cellWidth: 350,
            escalaElemento: 0.75,
            sizeWidth: 450,
            sizeHeight: 100,
            origenX: 0.65,
            origenY: 1.1
        })
        this.grupo2 = crearGrupoElementos(this, '_arbol_6', {
            width: 4,
            repeticiones: 4,
            posicionX: posicion.x * 0.15,
            posicionY: posicion.y * 0.2,
            cellWidth: 350,
            escalaElemento: 0.75,
            sizeWidth: 50,
            sizeHeight: 60,
            origenX: 0.65,
            origenY: 1.1
        })

        this.grupo1.setDepth(3)
        this.grupo2.setDepth(1)

        this.r2 = this.add.rectangle(posicion.x, posicion.y * 0.3, posicion.x * 2, posicion.y * 0.2)

        this.physics.world.enable([this.grupo1, this.grupo2, this.r2])
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [this.grupo1, this.grupo2, this.r2])

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)
    }
}