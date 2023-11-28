import Phaser from 'phaser'
import { ajustarAreaColision, crearAnimacion, crearAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'


let cursors = {
    acciones: { confirmar: undefined }
}

let datosEscena = {
    key: 'area_04', posicion: {
        x: 0,
        y: 0
    }, entrada_a_escena: undefined
}

export class Area_04 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_04' })
    }

    init (data) {
        if (data) {
            datosEscena.entrada_a_escena = data.entrada

            if (data.posicion)
                datosEscena.posicion = data.posicion
        }
    }

    preload () { }

    create () {

        console.log('area 04')

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

        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, '_fondo_exterior_casa_juan').setScale(0.8, 0.735).setRotation(3.141593).setDepth(-1)

        this.sprite_vendedor = this.physics.add.sprite(posicion.x * 1.6, posicion.y * 0.8, '_sprite_vendedor').setOrigin(0.48, 0.35).setScale(1.5)
        this.idle_dialogo = this.add.sprite(this.sprite_vendedor.x, this.sprite_vendedor.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', datosEscena.entrada_a_escena, {
            escalaPersonaje: 1.25,
            xPersonaje: datosEscena.posicion.x,
            yPersonaje: datosEscena.posicion.y
        })

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_32', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'camino' },
            funcionesExtra: () => {
                if (this.timer) this.timer.remove()
            }
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_05', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'izq' },
            funcionesExtra: () => {
                if (this.timer) this.timer.remove()
            }
        })

        // Salida Oeste
        generarSalidaEscena(this, this.player, 'area_03', {
            posicionX: 0 - posicion.x * 0.015,
            posicionY: posicion.y,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.25,
            valoresSiguienteEscena: { entrada: 'der' },
            funcionesExtra: () => {
                if (this.timer) this.timer.remove()
            }
        })

        this.sprite_vendedor.anims.play('idle_vendedor')
        this.sprite_vendedor.setSize(this.sprite_vendedor.width * 0.9, this.sprite_vendedor.height * 0.7)
        this.sprite_vendedor.setOffset(this.sprite_vendedor.width * 0.025, this.sprite_vendedor.height * 0.35)
        this.idle_dialogo.visible = false

        this.interaccionVendedor = false

        this.physics.add.overlap(this.player, this.sprite_vendedor, () => {
            this.interaccionVendedor = true
        }, null, this)

        this.colisionVendedor = crearAreaColision(this, this.sprite_vendedor, {
            ancho: this.sprite_vendedor.width * 0.65,
            alto: this.sprite_vendedor.height * 0.45,
            posicionX: this.sprite_vendedor.x * 0.998,
            posicionY: this.sprite_vendedor.y * 1.18
        })
        this.physics.add.collider(this.player, this.colisionVendedor, null, null, this)

        this.timer = this.time.addEvent({
            delay: 10,
            callback: () => {
                if (this.interaccionVendedor) {
                    if (!this.idle_dialogo.anims.isPlaying) {
                        this.idle_dialogo.visible = true
                        this.idle_dialogo.anims.play('idle_dialogo')
                        this.interaccionVendedor = false
                    } else {
                        this.interaccionVendedor = false
                    }
                } else {
                    if (!this.idle_dialogo.anims.isPlaying) {
                        this.idle_dialogo.visible = false
                        this.idle_dialogo.anims.stop()
                    }
                }
            },
            callbackScope: this,
            loop: true
        })


    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (cursors.acciones.confirmar.isDown && this.interaccionVendedor) {
            this.scene.start('vendedor_pantalla_principal', {
                key: 'area_04', posicion: {
                    x: this.player.x,
                    y: this.player.y
                }
            });
        }
    }
}