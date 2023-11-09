import Phaser from "phaser";

import { ajustarAreaColision, crearGrupoElementos, generarSalidaEscena } from "../manejadores/manejador_elementos_escena";
import { Manejador_Movimiento } from "../manejadores/manejador_movimientos";

let colisionCasa = []
let entrada_a_escena = ''

export class Area_32 extends Phaser.Scene {
    constructor() {
        super({ key: 'area_32' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {
        console.log('area 32')

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
        this.add.image(posicion.x, posicion.y, '_fondo_exterior_casa_juan').setScale(0.8, 0.735).setDepth(-1)

        this.arbolesGrupo1 = crearGrupoElementos(this, '_arbol_1', {
            repeticiones: 8,
            width: 8,
            cellWidth: 190,
            cellHeight: 120,
            posicionX: 15,
            posicionY: 10,
            escalaElemento: 0.65,
            origenX: 0.75,
            sizeWidth: 180,
        })

        this.arbolesGrupo2 = crearGrupoElementos(this, '_arbol_1', {
            repeticiones: 8,
            height: 8,
            cellWidth: 190,
            cellHeight: 120,
            posicionX: -5,
            posicionY: 130,
            escalaElemento: 0.65,
            origenX: 0.75,
            sizeWidth: 180,
        })

        this.arbolesGrupo3 = crearGrupoElementos(this, '_arbol_1', {
            repeticiones: 8,
            height: 8,
            cellWidth: 190,
            cellHeight: 120,
            posicionX: 1460,
            posicionY: 130,
            escalaElemento: 0.65,
            origenX: 0.75,
            sizeWidth: 180,
        })
        this.arbolesGrupo4 = crearGrupoElementos(this, '_arbol_1', {
            repeticiones: 3,
            width: 3,
            cellWidth: 190,
            cellHeight: 120,
            posicionX: 90,
            posicionY: 750,
            escalaElemento: 0.65,
            origenX: 0.75,
            sizeWidth: 180,
        })
        this.arbolesGrupo5 = crearGrupoElementos(this, '_arbol_1', {
            repeticiones: 3,
            width: 3,
            cellWidth: 190,
            cellHeight: 120,
            posicionX: 890,
            posicionY: 750,
            escalaElemento: 0.65,
            origenX: 0.75,
            sizeWidth: 180,
        })

        colisionCasa.push(this.add.rectangle(posicion.x * 0.62, posicion.y * 0.92, posicion.x * 0.5, posicion.y * 0.95, 0x00ffff, 0))
        colisionCasa.push(this.add.rectangle(posicion.x * 1.35, posicion.y * 0.92, posicion.x * 0.5, posicion.y * 0.95, 0x00ffff, 0))
        this.limitesCasa = this.physics.add.group(colisionCasa)
        this.limitesCasa.children.iterate(obj => { obj.body.immovable = true })
        this.physics.world.enable(this.limitesCasa)

        this.add.image(posicion.x * 0.985, posicion.y * 0.699, '_casa_juan').setScale(0.8)
        this.cubeta = this.physics.add.image(posicion.x * 1.88, posicion.y * 1.12, '_cubeta_1').setScale(0.65).setImmovable(true)
        this.pozo = this.physics.add.image(posicion.x * 1.8, posicion.y * 1.18, '_pozo_1').setScale(0.8).setImmovable(true)

        if (entrada_a_escena === 'casa') {
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.35, '_sprites_juan_cupul').setScale(1.25)
        } else {
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.85, '_sprites_juan_cupul').setScale(1.25)
        }
        this.player.setCollideWorldBounds(true);

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        this.physics.world.enable([this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4, this.arbolesGrupo5])

        this.physics.add.collider(this.player, [this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4,
        this.arbolesGrupo5, this.limitesCasa, this.pozo, this.cubeta], null, null, this)

        // Salida Escenario
        this.salidaEscena = generarSalidaEscena(this, this.player, 'area_04', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 2.05,
            altoSalida: posicion.y * 0.15,
            anchoSalida: posicion.x * 0.35,
            valoresSiguienteEscena: { entrada: 'arriba' },
            funcionesExtra: () => {
                if (this.timer) this.timer.remove()
            }
        })

        // Entrada a casa
        this.puerta = generarSalidaEscena(this, this.player, 'area_32_interior', {
            posicionX: posicion.x * 0.985,
            posicionY: posicion.y * 1.08,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.4,
            valoresSiguienteEscena: { entradaPuerta: true }
        })

    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)
    }
}

function manejadorMovimientoJugador (player, velocityX, velocityY, animationKey) {
    player.setVelocityX(velocityX);
    player.setVelocityY(velocityY);
    player.anims.play(animationKey, true);
}