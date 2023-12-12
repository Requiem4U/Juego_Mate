import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearPersonaje, generarSalidaEscena, crearGrupoElementos } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena

export class Area_33 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_33' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 33')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_33').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, {
            escalaPersonaje: 1.25,
            esteY: posicion.y * 1.085,
            oesteY: posicion.y * 1.085
        }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_02', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.236,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_35', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y * 1.085,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.236,
            valoresSiguienteEscena: { entrada: 'der' },
        })

        //RabanosRojos
        this.rabanosRojos = crearGrupoElementos(this, '_rabano_rojo_1', {
            repeticiones: 6,
            width: 3,
            height: 2,
            cellWidth: 140, // espacio entre cada objeto
            cellHeight: 120,
            posicionX: posicion.x * 0.28, //posicion horizontal
            posicionY: posicion.y * 0.28, //posicion vertical
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        //Rabanos Blancos
        this.rabanosBlancos = crearGrupoElementos(this, '_rabano_blanco_1', {
            repeticiones: 6,
            width: 3,
            height: 2,
            cellWidth: 140, // espacio entre cada objeto
            cellHeight: 120,
            posicionX: posicion.x * 1.02, //posicion horizontal
            posicionY: posicion.y * 1.30, //posicion vertical
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(2)

        //Tomates
        this.tomates1 = crearGrupoElementos(this, '_tomates_1', {
            repeticiones: 2,
            width: 5,
            cellWidth: 170, // espacio entre cada objeto
            posicionX: posicion.x * 1.0, //posicion horizontal
            posicionY: posicion.y * 0.20, //posicion vertical
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        this.tomates2 = crearGrupoElementos(this, '_tomates_1', {
            repeticiones: 2,
            width: 5,
            cellWidth: 170,
            posicionX: posicion.x * 1.10,
            posicionY: posicion.y * 0.46,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        //Zanahoria
        this.zanahorias = crearGrupoElementos(this, '_zanahoria_1', {
            repeticiones: 6,
            width: 3,
            height: 2,
            cellWidth: 140, // espacio entre cada objeto
            cellHeight: 120,
            posicionX: posicion.x * 0.26, //posicion horizontal
            posicionY: posicion.y * 1.25, //posicion vertical
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(2)


        this.physics.world.enable([this.tomates1, this.tomates2, this.rabanosBlancos, this.rabanosRojos, this.zanahorias])

        this.tomates1.getChildren().forEach((tomate) => {
            tomate.body.immovable = true
        })
        this.tomates2.getChildren().forEach((tomate) => {
            tomate.body.immovable = true
        })

        this.rabanosBlancos.getChildren().forEach((rabano) => {
            rabano.body.immovable = true
        })
        this.rabanosRojos.getChildren().forEach((rabano) => {
            rabano.body.immovable = true
        })
        this.zanahorias.getChildren().forEach((zanahoria) => {
            zanahoria.body.immovable = true
        })

        this.CajaVerduras1 = this.physics.add.image(posicion.x * 1.75, posicion.y * 1.60, '_caja_verduras_1').setScale(0.7).setDepth(2).setImmovable()
        this.CajaVerduras1.setSize(this.CajaVerduras1.width * 0.65, this.CajaVerduras1.height * 0.4)
        this.CajaVerduras1.setOffset(0, this.CajaVerduras1.height * 0.6)

        this.CajaVerduras2 = this.physics.add.image(posicion.x * 1.70, posicion.y * 0.28, '_caja_verduras_1').setScale(0.7).setDepth(0).setImmovable()
        this.CajaVerduras2.setSize(this.CajaVerduras2.width * 0.65, this.CajaVerduras2.height * 0.4)
        this.CajaVerduras2.setOffset(0, this.CajaVerduras2.height * 0.6)

        this.CajaVerduras3 = this.physics.add.image(posicion.x * 1.85, posicion.y * 0.50, '_caja_verduras_1').setScale(0.7).setDepth(0).setImmovable()
        this.CajaVerduras3.setSize(this.CajaVerduras3.width * 0.65, this.CajaVerduras3.height * 0.4)
        this.CajaVerduras3.setOffset(0, this.CajaVerduras3.height * 0.6)

        this.physics.add.collider(this.player, [
            this.CajaVerduras1, this.CajaVerduras2, this.CajaVerduras3,
            this.rabanosBlancos, this.rabanosRojos, this.zanahorias, this.tomates1, this.tomates2
        ])
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)


        if (this.player.y < 180) {
            this.rabanosRojos.setDepth(2)
            this.tomates1.setDepth(2)
            this.tomates2.setDepth(2)
        } else if (this.player.y > 716) {
            this.rabanosBlancos.setDepth(0)
            this.zanahorias.setDepth(0)
        } else {
            this.rabanosRojos.setDepth(0)
            this.tomates1.setDepth(0)
            this.tomates2.setDepth(0)
            this.rabanosBlancos.setDepth(2)
            this.zanahorias.setDepth(2)
        }

        if (this.player.y < 170) {
            this.CajaVerduras3.setDepth(2)
        } else {
            this.CajaVerduras3.setDepth(0)
        }

        if (this.player.y < 82) {
            this.CajaVerduras2.setDepth(2)
        } else {
            this.CajaVerduras2.setDepth(0)
        }

        if (this.player.y < 605) {
            this.CajaVerduras1.setDepth(2)
        } else {
            this.CajaVerduras1.setDepth(0)
        }

    }
}