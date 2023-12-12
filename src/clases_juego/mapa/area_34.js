import Phaser from 'phaser'
import { ajustarAreaColision, crearAreaColision, crearPersonaje, generarSalidaEscena } from '../manejadores/manejador_elementos_escena'

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
export class Area_34 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_34' })
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

        console.log('area 34')

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_34').setScale(0.854, 0.78).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', datosEscena.entrada_a_escena, {
            escalaPersonaje: 1.25,
            xPersonaje: datosEscena.posicion.x,
            yPersonaje: datosEscena.posicion.y,
            norteX: posicion.x * 0.28,
        }).setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Norte
        generarSalidaEscena(this, this.player, 'area_30', {
            posicionX: posicion.x * 0.28,
            posicionY: posicion.y * 0.02,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'abajo' },
        })

        this.sprite_vendedor = this.physics.add.sprite(posicion.x * 1.35, posicion.y * 1.2, '_sprite_vendedor').setOrigin(0.48, 0.35).setScale(2)
        this.idle_dialogo = this.add.sprite(this.sprite_vendedor.x, this.sprite_vendedor.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)

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

        this.piedra1 = this.physics.add.image(posicion.x * 0.13, posicion.y * 1.7, '_piedra_3').setOrigin(0.5).setScale(0.8).setImmovable()
        this.piedra2 = this.physics.add.image(posicion.x * 0.655, posicion.y * 1.111, '_piedra_2').setOrigin(0.5).setScale(0.8).setImmovable()
        this.piedra3 = this.physics.add.image(posicion.x * 1.805, posicion.y * 1.72, '_piedra_1').setOrigin(0.5).setScale(0.8).setImmovable()

        this.physics.world.enable(this.piedra1)
        this.physics.world.enable(this.piedra2)
        this.physics.world.enable(this.piedra3)

        this.vela1 = this.physics.add.sprite(posicion.x * 0.08, posicion.y * 0.65, '_vela_1').setOrigin(0.5).setScale(0.75).setImmovable()
        this.vela1.anims.play('idle_vela_1')
        this.vela1.setSize(this.vela1.width * 0.95, this.vela1.height * 0.5)
        this.vela1.setOffset(0, this.vela1.height * 0.4)

        this.vela2 = this.physics.add.sprite(posicion.x * 0.67, posicion.y * 0.89, '_vela_1').setOrigin(0.5).setScale(0.8)
        this.vela2.anims.play('idle_vela_1')

        this.vela3 = this.physics.add.sprite(posicion.x * 0.13, posicion.y * 1.51, '_vela_1').setOrigin(0.5).setScale(0.8)
        this.vela3.anims.play('idle_vela_1')

        this.vela4 = this.physics.add.sprite(posicion.x * 1.58, posicion.y * 1.61, '_vela_1').setOrigin(0.5).setScale(0.8).setImmovable()
        this.vela4.anims.play('idle_vela_1')

        this.vela5 = this.physics.add.sprite(posicion.x * 1.015, posicion.y * 1.6, '_vela_1').setOrigin(0.5).setScale(0.8).setImmovable()
        this.vela5.anims.play('idle_vela_1')

        this.vela6 = this.physics.add.sprite(posicion.x * 1.85, posicion.y * 1.5, '_craneo_1').setOrigin(0.5).setScale(0.8)
        this.vela6.anims.play('idle_craneo_1')


        this.r1 = this.add.rectangle(posicion.x * 1.3, posicion.y * 1.25, posicion.x * 0.8, posicion.y * 0.4)
        this.r2 = this.add.rectangle(posicion.x * 0.75, posicion.y * 0.53, posicion.x * 0.4, posicion.y)
        this.r3 = this.add.rectangle(posicion.x * 0.85, posicion.y * 1.4, posicion.x * 0.3, posicion.y * 0.5)
        this.r4 = this.add.rectangle(posicion.x * 0.02, posicion.y, 40, posicion.y * 2)
        this.r5 = this.add.rectangle(posicion.x, posicion.y * 1.98, posicion.x * 2, 40)

        this.physics.world.enable([this.r1, this.r2, this.r3, this.r4, this.r5])
        this.r1.body.immovable = true
        this.r2.body.immovable = true
        this.r3.body.immovable = true
        this.r4.body.immovable = true
        this.r5.body.immovable = true

        this.physics.add.collider(this.player, [
            this.piedra1, this.piedra2, this.piedra3, this.vela1,
            this.vela4, this.vela5, this.r1, this.r2, this.r3, this.r4, this.r5
        ])
    }

    update () {

        this.player.setVelocity(0)

        this.Movimientos.movimientoPersonaje(this.player)

        if (cursors.acciones.confirmar.isDown && this.interaccionVendedor) {
            this.scene.start('vendedor_pantalla_principal', {
                key: 'area_34', posicion: {
                    x: this.player.x,
                    y: this.player.y
                }
            });
        }

        if (this.player.y < 202) {
            this.vela1.setDepth(2)
        } else {
            this.vela1.setDepth(0)
        }

        if (this.player.y < 586) {
            this.vela3.setDepth(2)
            this.piedra1.setDepth(2)
        } else {
            this.vela3.setDepth(0)
            this.piedra1.setDepth(0)
        }
    }
}