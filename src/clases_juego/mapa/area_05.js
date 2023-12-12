import Phaser from "phaser"
import { ajustarAreaColision, crearGrupoElementos, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'


let entrada_a_escena

export class Area_05 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_05' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 05')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_05').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, {
            escalaPersonaje: 1.25,
            esteY: posicion.y * 1.55
        }).setDepth(2)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125,
        })

        // Salida este
        generarSalidaEscena(this, this.player, 'area_06', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.55,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Salida oeste
        generarSalidaEscena(this, this.player, 'area_04', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        this.grupo1 = crearGrupoElementos(this, '_arbol_2', {
            width: 2,
            repeticiones: 2,
            posicionX: posicion.x * 0.05,
            posicionY: posicion.y * 0.08,
            cellWidth: 350,
            escalaElemento: 0.8,
            sizeWidth: 50,
            sizeHeight: 60,
            origenX: 0.6,
            origenY: 1.07
        })

        this.grupo2 = crearGrupoElementos(this, '_arbol_2', {
            width: 2,
            repeticiones: 2,
            posicionX: posicion.x * 1.03,
            posicionY: posicion.y * 0.6,
            cellWidth: 350,
            escalaElemento: 0.8,
            sizeWidth: 50,
            sizeHeight: 60,
            origenX: 0.6,
            origenY: 1.07
        })

        this.grupo1.setDepth(1)
        this.grupo2.setDepth(1)

        this.add.image(posicion.x * 0.2, posicion.y * 1.5, '_arbol_5').setScale(0.8).setDepth(3)
        this.add.image(posicion.x * 0.6, posicion.y * 1.7, '_arbol_5').setScale(0.8).setDepth(3)

        this.r1 = this.add.rectangle(posicion.x, posicion.y * 1.98, posicion.x * 2, posicion.y * 0.2)
        this.r2 = this.add.rectangle(posicion.x, posicion.y * 0.3, posicion.x * 2, posicion.y * 0.2)

        this.physics.world.enable([this.grupo1, this.grupo2, this.r1, this.r2])

        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.physics.add.collider(this.player, [this.grupo1, this.grupo2, this.r1, this.r2], null)

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)
    }
}