import Phaser from 'phaser'
import { ajustarAreaColision, crearGrupoElementos, crearPersonaje, generarSalidaEscena, crearAreaColision } from '../manejadores/manejador_elementos_escena'

import { Manejador_Movimiento } from '../manejadores/manejador_movimientos'

let entrada_a_escena
let posicion

let texto
let dialogos = {
    filberto1: undefined,
    filberto2: undefined,
}
let desplazamientoDialogo
let partesDialogo

let cursors = {
    acciones: { interactuar: undefined, pasarDialogo: undefined }
}

let mostrarSegundoDialogoFilberto = false
let dialogoHistoriaTerminado = false
let primerDialogoFilbertoTerminado = false
let qteMostrado = false
let qteTerminado = false

export class Area_35 extends Phaser.Scene {

    constructor() {
        super({ key: 'area_35' })
    }

    init (data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload () { }

    create () {

        console.log('area 35')

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

        posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, '_fondo_area_35').setScale(0.855, 0.785).setDepth(-1)

        this.player = crearPersonaje(this, '_sprites_juan_cupul', entrada_a_escena, { escalaPersonaje: 1.25, }).setDepth(2)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        // Salida Este
        generarSalidaEscena(this, this.player, 'area_33', {
            posicionX: posicion.x * 2.015,
            posicionY: posicion.y,
            anchoSalida: posicion.y * 0.15,
            altoSalida: posicion.x * 0.236,
            valoresSiguienteEscena: { entrada: 'izq' },
        })

        //Maiz Arriba
        crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.78,
            posicionY: posicion.y * 0.1,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        this.grupoMaiz2 = crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.67,
            posicionY: posicion.y * 0.18,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.78,
            posicionY: posicion.y * 0.36,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(0)

        // Maiz abajo
        crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.78,
            posicionY: posicion.y * 1.1,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(4)

        crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.67,
            posicionY: posicion.y * 1.28,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(4)

        crearGrupoElementos(this, '_maiz_1', {
            repeticiones: 5,
            width: 5,
            cellWidth: 169,
            posicionX: posicion.x * 0.78,
            posicionY: posicion.y * 1.46,
            escalaElemento: 0.8,
            origenX: 0.6,
            origenY: 0.85
        }).setDepth(4)

        this.r1 = this.add.rectangle(posicion.x * 0.67, 0, posicion.x * 1.2, posicion.y * 0.75, 0X000000, 0).setOrigin(0)
        this.r2 = this.add.rectangle(posicion.x * 0.67, posicion.y * 1.26, posicion.x * 1.2, posicion.y * 0.7, 0X000000, 0).setOrigin(0)

        this.casa = this.physics.add.image(posicion.x * 0.318, posicion.y * 0.85, '_casa_milpa').setScale(0.82).setDepth(1).setImmovable()
        this.casa.setSize(this.casa.width, this.casa.height * 0.75)
        this.casa.setOffset(0, this.casa.height * 0.25)

        this.saco = this.physics.add.image(posicion.x * 0.5, posicion.y * 1.45, '_saco_1').setScale(0.82).setDepth(2).setImmovable()
        this.caja = this.physics.add.image(posicion.x * 0.37, posicion.y * 1.455, '_caja_verduras_2').setScale(0.75).setDepth(2).setImmovable()
        this.lenia = this.physics.add.image(posicion.x * 0.2, posicion.y * 1.48, '_lenia_1').setScale(0.7).setDepth(2).setImmovable()
        this.herramientas = this.physics.add.image(posicion.x * 0.24, posicion.y * 1.8, '_herramientas_1').setScale(0.75).setDepth(2).setImmovable()

        this.physics.world.enable([this.r1, this.r2])
        this.r1.body.immovable = true
        this.r2.body.immovable = true

        this.bomba = this.physics.add.image(posicion.x * 0.8, posicion.y, '_bomba_1').setDepth(0).setScale(0.75).setImmovable()
        this.bomba.setSize(this.bomba.width, this.bomba.height * 0.5)
        this.bomba.setOffset(0, this.bomba.height * 0.5)

        this.physics.add.collider(this.player, [
            this.r1, this.r2, this.casa, this.saco, this.caja, this.lenia, this.herramientas,
            this.bomba
        ])

        cursors.acciones.interactuar = this.input.keyboard.addKey('F')
        cursors.acciones.pasarDialogo = this.input.keyboard.addKey('SPACE')

        if (!dialogoHistoriaTerminado) {
            this.crearPersonajeFilberto()
        }

        dialogos.filberto1 = [
            'Juan Cupul:\n\n¿Qué haces?',
            'Filiberto Tun:\n\nEstaba checando la bomba para ver si estaba lista.',
            'Juan Cupul:\n\n¿En serio?, ¿Y entonces cómo está?',
            'Filiberto Tun:\n\nSupongo que bien...',
            'Filiberto Tun:\n\nOye necesito tu ayuda con algo.',
        ]
        //dialogos.filberto1 = ['Filiberto Tun:\n\nBuenos días, Juan, te traigo buenas noticias o tal vez no tan buenas para ti.',]
        dialogos.filberto2 = [
            'Filiberto Tun:\n\nVaya esa respuesta fue rápida, ¿qué hiciste?',
            'Juan Cupul:\n\nSimplemente pensé en el problema, me surgieron diferentes respuestas y escogí la correcta.',
            'Filiberto Tun:\n\nVaya eso es increíble.',
            'Juan Cupul:\n\nEso no es nada.',
            'Filiberto Tun:\n\nBueno necesito irme, regresare más tarde.',
            'Juan Cupul:\n\nEntiendo, entonces te estaré esperando.'
        ]

        partesDialogo = dialogos.filberto1.length
        desplazamientoDialogo = 0

        this.indexTexto = 0
        this.movimientoLimitado = false
        this.teclaPrecionada = false

        this.timer2 = this.time.addEvent({})
        this.permitirCambio = false
        this.contrlesEnPantalla = false
        this.interaccionFilberto = false
    }

    update () {

        this.player.setVelocity(0)

        if (!this.movimientoLimitado) {
            this.Movimientos.movimientoPersonaje(this.player)
        }

        if (cursors.acciones.interactuar.isDown) {
            if (!dialogoHistoriaTerminado) {
                if (this.interaccionFilberto) {
                    if (!this.bannerTxt && !this.finTexto) {
                        this.movimientoLimitado = true
                        this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.72, '_banner_dialogos').setScale(0.8, 0.9).setDepth(5)
                    }

                    if (!texto && !this.finTexto) {
                        if (!primerDialogoFilbertoTerminado) {
                            texto = this.add.text(posicion.x * 0.20, posicion.y * 1.55, dialogos.filberto1[this.indexTexto++], {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                color: '#ffffff',
                                align: 'left'
                            }).setOrigin(0).setDepth(5)
                            this.time.delayedCall(3000, () => { this.permitirCambio = true })
                        } else {
                            texto = this.add.text(posicion.x * 0.20, posicion.y * 1.55, dialogos.filberto2[this.indexTexto++], {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                color: '#ffffff',
                                align: 'left',
                                wordWrap: { width: posicion.x * 1.7, useAdvancedWrap: true }
                            }).setOrigin(0).setDepth(5)
                            this.time.delayedCall(3000, () => { this.permitirCambio = true })
                        }
                    }
                }
            }
        }

        if (cursors.acciones.pasarDialogo.isDown) {

            if (this.finTexto) {
                this.finTexto = false
                if (texto)
                    texto.destroy()
                if (this.bannerTxt)
                    this.bannerTxt.destroy()
                if (!primerDialogoFilbertoTerminado) {
                    primerDialogoFilbertoTerminado = true
                    /*this.movimientoLimitado = true
                    this.time.delayedCall(400, () => {
                        this.tweens.add({
                            targets: this.filberto,
                            x: posicion.x * 1.015,
                            y: posicion.y * 1.55,
                            duration: 800,
                            onComplete: () => {
                                this.time.delayedCall(150, () => {
                                    this.tweens.add({
                                        targets: this.filberto,
                                        x: posicion.x * 1.015,
                                        y: posicion.y * 2,
                                        duration: 800,
                                        onComplete: () => {
                                            this.filberto.destroy()
                                            this.areaFilberto.destroy()
                                            this.crearPersonajeNovia()
                                        }
                                    });
                                    this.filberto.anims.play('walkDown_filberto');
                                });
                                this.filberto.anims.play('idleFront_filberto')
                            }
                        });
                        this.filberto.anims.play('walkLeft_filberto');
                    }, [], this)*/
                }
                if (mostrarSegundoDialogoFilberto) {
                    console.log('HT')
                    dialogoHistoriaTerminado = true
                }
                this.time.delayedCall(800, () => {
                    partesDialogo = dialogos.filberto2.length
                    if (!mostrarSegundoDialogoFilberto) {
                        mostrarSegundoDialogoFilberto = true
                        texto = undefined
                        this.bannerTxt = undefined
                        this.indexTexto = 0
                        desplazamientoDialogo = 0
                        this.permitirCambio = false
                    } else {
                        this.movimientoLimitado = false
                    }
                }, [], this)

            } else if (texto && this.permitirCambio) {
                this.permitirCambio = false
                if (mostrarSegundoDialogoFilberto) {
                    texto.text = dialogos.filberto2[this.indexTexto++]
                } else {
                    texto.text = dialogos.filberto1[this.indexTexto++]
                }
                this.time.delayedCall(3000, () => { this.permitirCambio = true })
            }
        }

        this.indexTexto <= partesDialogo ? this.finTexto = false : this.finTexto = true

        if (this.player.y > 577) {
            this.player.setDepth(3)
            this.casa.setDepth(1)
        } else {
            this.player.setDepth(1)
            this.casa.setDepth(2)
        }

        if (this.filberto && this.player.y < this.filberto.y) {
            this.filberto.setDepth(2)
        } else if (this.filberto) {
            this.filberto.setDepth(0)
        }

        if (this.player.y < this.bomba.y) {
            this.bomba.setDepth(2)
        } else {
            this.bomba.setDepth(0)
        }

        if (primerDialogoFilbertoTerminado) {
            if (!qteMostrado) {
                qteMostrado = true
                console.log(1)
            }
        }
    }

    crearPersonajeFilberto () {
        this.filberto = this.physics.add.sprite(posicion.x, posicion.y, '_sprites_filberto').setScale(1.25)
        this.filberto.anims.play('idleLeft_filberto')
        this.idle_dialogo = this.add.sprite(this.filberto.x, this.filberto.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8).setDepth(5)
        this.idle_dialogo.visible = false
        this.areaFilberto = crearAreaColision(this, this.filberto, {
            ancho: this.filberto.width * 0.8,
            alto: this.filberto.height * 0.4,
        })

        this.physics.add.overlap(this.player, this.filberto, () => {
            this.idle_dialogo.x = this.filberto.x
            this.idle_dialogo.y = this.filberto.y * 0.93
            this.areaFilberto.x = this.filberto.x
            this.areaFilberto.y = this.filberto.y + this.filberto.width * 0.3
            this.interaccionFilberto = true
        }, null, this)

        this.physics.add.collider(this.player, this.areaFilberto)

        this.timerInteraccion = this.time.addEvent({
            delay: 10,
            callback: () => {
                if (this.interaccionFilberto) {
                    if (!this.idle_dialogo.anims.isPlaying) {
                        this.idle_dialogo.visible = true
                        this.idle_dialogo.anims.play('idle_dialogo')
                        this.interaccionFilberto = false
                    } else {
                        this.interaccionFilberto = false
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
}