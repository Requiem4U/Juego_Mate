import Phaser from "phaser";

import { ajustarAreaColision, crearAreaColision, crearGrupoElementos, generarSalidaEscena } from "../manejadores/manejador_elementos_escena";
import { Manejador_Movimiento } from "../manejadores/manejador_movimientos";

let colisionCasa = []
let entrada_a_this = ''
let dialogoFilbertoTerminado = false
let posicion

let texto
let dialogos = {
    novia: undefined,
    filberto: undefined
}
let desplazamientoDialogo
let partesDialogo

let cursors = {
    acciones: { interactuar: undefined, pasarDialogo: undefined }
}

let mostrarDialogoNovia = false
let dialogoHistoriaTerminado = false

export class Area_32 extends Phaser.Scene {
    constructor() {
        super({ key: 'area_32' })
    }

    init (data) {
        if (data) {
            entrada_a_this = data.entrada
        }
    }

    preload () { }

    create () {
        console.log('area 32')

        cursors.acciones.interactuar = this.input.keyboard.addKey('F')
        cursors.acciones.pasarDialogo = this.input.keyboard.addKey('SPACE')

        dialogos.filberto = [
            'Filiberto Tun:\n\nBuenos días, Juan, te traigo buenas noticias o tal vez no tan buenas para ti.',
            'Juan Cupul:\n\nBuenos días, Filiberto, que quieres decirme con eso.',
            'Filiberto Tun:\n\nEl plan se llevará a cabo pronto, pero para tu mala suerte será mañana y se'
            + '\ndecidió que cuidarías de la bomba esta noche.',
            'Juan Cupul:\n\n¡¡En serio!! ... Pero mañana es mi boda… ',
            'Filiberto Tun:\n\nYa lo se ... Lo siento ',
            'Juan Cupul:\n\nNo te preocupes entiendo la importancia de esto y por eso lo hare, solo necesito'
            + '\nexplicarle esto a mi novia.',
            'Filiberto Tun:\n\nEntiendo, me adelantaré. Te veo en la milpa del Oeste.',
            'Juan Cupul:\n\nAhí estaré.'
        ]
        dialogos.filberto = [
            'Filiberto Tun:\n\nBuenos días, Juan, te traigo buenas noticias o tal vez no tan buenas para ti.',
        ]
        dialogos.novia = [
            `${agregarTabs(40)}Juan le explica a Dolores lo que sucede...`,
            'María Dolores:\n\nYa veo, entonces eso es lo que paso.',
            'Juan Cupul:\n\nLo siento, mañana se supone que sería importante.',
            'María Dolores:\n\nNo te preocupes, se lo importante que es esto, te estaré esperando aquí.',
            'Juan Cupul:\n\n¡¡Gracias!!',
            'Filiberto Tun:\n\nJeJe cuando te sientas cansado puedes volver aquí, te diré lo que necesites.',
            'Juan Cupul:\n\nNos vemos luego. Regresare.',
            'Juan Cupul:\n\nTe lo prometo.',
            'María Dolores:\n\nNos vemos.',
            `${agregarTabs(40)}Ve a la casa de la milpa que está al Oeste`
        ]
        partesDialogo = dialogos.filberto.length
        desplazamientoDialogo = 0

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
        this.add.image(posicion.x, posicion.y, '_fondo_area_32').setScale(0.8, 0.735).setDepth(-1)

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

        if (entrada_a_this === 'casa') {
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.35, '_sprites_juan_cupul').setScale(1.25)
        } else {
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.85, '_sprites_juan_cupul').setScale(1.25)
        }
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1)

        ajustarAreaColision(this.player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        this.physics.world.enable([this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4, this.arbolesGrupo5])

        this.physics.add.collider(this.player, [this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4,
        this.arbolesGrupo5, this.limitesCasa, this.pozo, this.cubeta], null, null, this)

        // Salida 
        this.salidathis = generarSalidaEscena(this, this.player, 'area_04', {
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

        if (!dialogoHistoriaTerminado) {
            crearPersonaje(this, { x: posicion.x * 1.3, y: posicion.y * 1.55 })
        }

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
                if (this.interaccionFilberto || this.interaccionNoviaJuan) {
                    if (!this.bannerTxt && !this.finTexto) {
                        this.movimientoLimitado = true
                        this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.72, '_banner_dialogos').setScale(0.8, 0.9).setDepth(5)
                    }

                    if (!texto && !this.finTexto) {
                        if (!dialogoFilbertoTerminado) {
                            texto = this.add.text(posicion.x * 0.20, posicion.y * 1.55, dialogos.filberto[this.indexTexto++], {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                color: '#ffffff',
                                align: 'left'
                            }).setOrigin(0).setDepth(5)
                            this.time.delayedCall(3000, () => { this.permitirCambio = true })
                        } else {
                            texto = this.add.text(posicion.x * 0.20, posicion.y * 1.55, dialogos.novia[this.indexTexto++], {
                                fontFamily: 'Arial',
                                fontSize: 32,
                                color: '#ffffff',
                                align: 'left'
                            }).setOrigin(0).setDepth(5)
                            this.time.delayedCall(3000, () => { this.permitirCambio = true })
                        }
                    }
                }
            }
        }

        if (cursors.acciones.pasarDialogo.isDown) {

            if (this.finTexto) {
                if (texto)
                    texto.destroy()
                if (this.bannerTxt)
                    this.bannerTxt.destroy()
                if (!dialogoFilbertoTerminado) {
                    dialogoFilbertoTerminado = true
                    this.movimientoLimitado = true
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
                    }, [], this)
                }
                if (mostrarDialogoNovia) {
                    dialogoHistoriaTerminado = true
                }
                this.time.delayedCall(800, () => {
                    partesDialogo = dialogos.novia.length
                    if (!mostrarDialogoNovia) {
                        mostrarDialogoNovia = true
                        texto = undefined
                        this.bannerTxt = undefined
                        this.indexTexto = 0
                        desplazamientoDialogo = 0
                        this.permitirCambio = false
                        this.finTexto = false
                    } else {
                        this.movimientoLimitado = false
                    }
                    console.log(texto)
                }, [], this)

            } else if (texto && this.permitirCambio) {
                this.permitirCambio = false
                if (mostrarDialogoNovia) {
                    texto.text = dialogos.novia[this.indexTexto++]
                } else {
                    texto.text = dialogos.filberto[this.indexTexto++]
                }
                this.time.delayedCall(3000, () => { this.permitirCambio = true })
            }
        }

        this.indexTexto <= partesDialogo ? this.finTexto = false : this.finTexto = true


        if (this.filberto && this.player.y < this.filberto.y) {
            this.filberto.setDepth(2)
        } else if (this.filberto) {
            this.filberto.setDepth(0)
        }

        if (this.novia_juan && this.player.y < this.novia_juan.y) {
            this.novia_juan.setDepth(2)
        } else if (this.novia_juan) {
            this.novia_juan.setDepth(0)
        }
    }

    crearPersonajeNovia () {
        this.novia_juan = this.physics.add.sprite(posicion.x, posicion.y, '_sprites_novia_juan').setScale(1.25)
        this.novia_juan.anims.play('idleBack_novia_juan')
        this.areaNovia = crearAreaColision(this, this.novia_juan, {
            ancho: this.novia_juan.width * 0.8,
            alto: this.novia_juan.height * 0.4,
        })
        this.idle_dialogo = this.add.sprite(this.novia_juan.x, this.novia_juan.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8).setDepth(5)
        this.idle_dialogo.visible = false

        this.physics.add.overlap(this.player, this.novia_juan, () => {
            this.idle_dialogo.x = this.novia_juan.x
            this.idle_dialogo.y = this.novia_juan.y * 0.93
            this.areaNovia.x = this.novia_juan.x
            this.areaNovia.y = this.novia_juan.y + this.novia_juan.width * 0.3
            this.interaccionNoviaJuan = true
        }, null, this)

        this.physics.add.collider(this.player, this.areaNovia)

        this.timerInteraccion = this.time.addEvent({
            delay: 10,
            callback: () => {
                if (this.interaccionNoviaJuan) {
                    if (!this.idle_dialogo.anims.isPlaying) {
                        this.idle_dialogo.visible = true
                        this.idle_dialogo.anims.play('idle_dialogo')
                        this.interaccionNoviaJuan = false
                    } else {
                        this.interaccionNoviaJuan = false
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

        this.time.delayedCall(100, () => {
            this.tweens.add({
                targets: this.novia_juan,
                x: posicion.x * 1.015,
                y: posicion.y * 1.4,
                duration: 2000,
                onComplete: () => {
                    this.time.delayedCall(150, () => {
                        this.tweens.add({
                            targets: this.novia_juan,
                            x: posicion.x * 1.08,
                            y: posicion.y * 1.4,
                            duration: 400,
                            onComplete: () => {
                                this.novia_juan.anims.play('idleFront_novia_juan')
                                this.movimientoLimitado = false
                            }
                        });
                        this.novia_juan.anims.play('walkRight_novia_juan');
                    });
                    this.novia_juan.anims.play('idleRight_novia_juan')
                }
            });
            this.novia_juan.anims.play('walkDown_novia_juan');
        });

    }
}

function agregarTabs (numTabs) {
    return '\n\n' + ' '.repeat(numTabs)
}
function crearPersonaje (escena, posicion = { x: 100, y: 100 }) {
    escena.filberto = escena.physics.add.sprite(posicion.x, posicion.y, '_sprites_filberto').setScale(1.25)
    escena.filberto.anims.play('idleLeft_filberto')
    escena.idle_dialogo = escena.add.sprite(escena.filberto.x, escena.filberto.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8).setDepth(5)
    escena.idle_dialogo.visible = false
    escena.areaFilberto = crearAreaColision(escena, escena.filberto, {
        ancho: escena.filberto.width * 0.8,
        alto: escena.filberto.height * 0.4,
    })

    escena.physics.add.overlap(escena.player, escena.filberto, () => {
        escena.idle_dialogo.x = escena.filberto.x
        escena.idle_dialogo.y = escena.filberto.y * 0.93
        escena.areaFilberto.x = escena.filberto.x
        escena.areaFilberto.y = escena.filberto.y + escena.filberto.width * 0.3
        escena.interaccionFilberto = true
    }, null, escena)

    escena.physics.add.collider(escena.player, escena.areaFilberto)

    escena.timerInteraccion = escena.time.addEvent({
        delay: 10,
        callback: () => {
            if (escena.interaccionFilberto) {
                if (!escena.idle_dialogo.anims.isPlaying) {
                    escena.idle_dialogo.visible = true
                    escena.idle_dialogo.anims.play('idle_dialogo')
                    escena.interaccionFilberto = false
                } else {
                    escena.interaccionFilberto = false
                }
            } else {
                if (!escena.idle_dialogo.anims.isPlaying) {
                    escena.idle_dialogo.visible = false
                    escena.idle_dialogo.anims.stop()
                }
            }
        },
        callbackScope: escena,
        loop: true
    })
}