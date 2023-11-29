import Phaser from "phaser";
import { ajustarAreaColision, crearAnimacion, generarSalidaEscena } from "../manejadores/manejador_elementos_escena";
import { Datos_Jugador } from "../manejadores/datos_jugador";

// Decoracion y objetos
import { Manejador_Movimiento } from "../manejadores/manejador_movimientos";

let cursors = {
    movimiento: {
        flechas: undefined, letras: undefined,
        tactil: { arriba: undefined, abajo: undefined, izq: undefined, der: undefined }
    },
    acciones: { confirmar: undefined }
}

let bordes = []
let decoraciones = []
let entradaPuerta = false

let desplazamientoDialogo
let texto
let dialogos = {
    controles: undefined,
    novia: undefined
}
let partesDialogo
let dialogoTerminado = false

let posicion
let player


export class Area_32_Interior extends Phaser.Scene {

    constructor() {
        super({ key: 'area_32_interior' })
    }

    init (data) {
        if (data) {
            entradaPuerta = data.entradaPuerta
        }
    }

    preload () { }

    create () {

        this.datosJg = new Datos_Jugador()

        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        dialogos.novia = [
            'María Dolores:\n\n(sorprendida) Buenos días, veo que apenas te levantas.',
            'Juan Cupul:\n\nBuenos días, los preparativos para la boda de mañana me dejaron despierto hasta tarde.',
            'María Dolores:\n\nBueno, no te sobre esfuerces, no queremos mañana no estes disponible.',
            'Juan Cupul:\n\nNo te preocupes, es lo que menos quiero.',
            'María Dolores:\n\nBueno, ven a desayunar que Filiberto Tun ha llegado y dice que quiere hablar contigo.',
            'Juan Cupul:\n\nYa voy, debe de ser importante.',
            'María Dolores:\n\nNo olvides que puedes moverte con las flechas del teclado.',
            'Juan Cupul:\n\nGracias.'
        ]
        partesDialogo = dialogos.novia.length - 1
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
        this.add.image(posicion.x, posicion.y, '_fondo_interior_casa_juan').setScale(0.8, 0.735)
        this.cama = this.physics.add.image(posicion.x * 0.5, posicion.y * 1.1, '_cama_1').setScale(1.7, 1.6)
        this.mesa_1 = this.physics.add.image(posicion.x * 1.4, posicion.y * 1.2, '_mesa_1').setScale(1.3, 1.4)
        this.mesa_2 = this.physics.add.image(posicion.x * 1.4, posicion.y * 0.69, '_mesa_2').setScale(1.25, 1)
        this.mesa_2.setSize(this.mesa_2.width * 0.9, this.mesa_2.height * 0.5)
        this.mesa_2.setOffset(this.mesa_2.width * 0.05, this.mesa_2.height * 0.18)
        this.ropero = this.physics.add.image(posicion.x, posicion.y * 0.55, '_ropero_1').setScale(1.4, 1.2)
        this.machete = this.physics.add.image(posicion.x * 1.5, posicion.y * 1.7, '_machete_1').setImmovable().setScale(0.6, 0.7)

        decoraciones.push(this.cama, this.mesa_1, this.mesa_2, this.ropero)
        this.decoracionesCasa = this.physics.add.group(decoraciones)
        this.decoracionesCasa.children.iterate(obj => { obj.body.immovable = true })

        if (entradaPuerta) {
            player = this.physics.add.sprite(posicion.x * 1.015, posicion.y * 1.68, '_sprites_juan_cupul').setScale(1.25)
            player.anims.play('idleFront_juan')
            this.datosJg.actualzizarAyudaControlesNPC_Disponible()
        } else {
            player = this.physics.add.sprite(posicion.x * 0.8, posicion.y, '_sprites_juan_cupul').setScale(1.25)
            player.anims.play('idleRight_juan')
        }

        ajustarAreaColision(player, {
            sizeX: 0.28125,
            sizeY: 0.1875,
            offsetX: 0.375,
            offsetY: 0.578125
        })

        this.physics.add.collider(player, this.machete, null, null, this)

        bordes.push(this.add.rectangle(posicion.x * 0.2, posicion.y, posicion.x * 0.15, posicion.y * 2, 0x00ffff, 0))
        bordes.push(this.add.rectangle(posicion.x * 1.8, posicion.y, posicion.x * 0.15, posicion.y * 2, 0x00ff00, 0))
        bordes.push(this.add.rectangle(posicion.x, posicion.y * 0.42, posicion.x * 2, posicion.y * 0.5, 0xffffff, 0))
        bordes.push(this.add.rectangle(posicion.x * 0.51, posicion.y * 1.8, posicion.x * 0.8, posicion.y * 0.15, 0x000000, 0))
        bordes.push(this.add.rectangle(posicion.x * 1.52, posicion.y * 1.8, posicion.x * 0.8, posicion.y * 0.15, 0x000000, 0))

        this.limitesCasa = this.physics.add.group(bordes)
        this.physics.world.enable(this.limitesCasa)
        this.limitesCasa.children.iterate(obj => { obj.body.immovable = true })

        this.physics.add.collider(player, this.limitesCasa, null, null, this)
        this.physics.add.collider(player, this.decoracionesCasa, null, null, this)

        this.interaccionNoviaJuan = false

        if (this.datosJg.ayudaControlesNPC_Disponible()) {
            crearPersonaje(this, { x: posicion.x * 1.1, y: posicion.y })
            this.novia_juan.anims.play('idleFront_mujer')
        } else {
            this.time.delayedCall(2500, () => {
                crearPersonaje(this, { x: posicion.x * 1.015, y: posicion.y * 1.68 })
                moverPersonajeAnimado(this, this.novia_juan, posicion)
            })

            this.finTexto = false
        }


        // Salida Sur
        generarSalidaEscena(this, player, 'area_32', {
            posicionX: posicion.x * 1.015,
            posicionY: posicion.y * 1.87,
            anchoSalida: posicion.x * 0.25,
            altoSalida: posicion.y * 0.15,
            valoresSiguienteEscena: { entrada: 'casa' },
            funcionesExtra: () => {
                if (this.timerTexto) this.timerTexto.destroy()
            }
        })

        this.timerTexto = this.time.addEvent({
            delay: 40,
            callback: () => {
                texto.text += dialogos.novia[this.indexTexto][desplazamientoDialogo++]
                this.permitirCambio = false
            },
            callbackScope: this,
            loop: true
        })
        this.timerTexto.paused = true

        this.indexTexto = 0
        this.dialogos = false
        this.teclaPrecionada = false

        this.timer2 = this.time.addEvent({})
        this.permitirCambio = false

    }

    update (time, delta = 500) {

        player.setVelocity(0)

        if (this.datosJg.ayudaControlesNPC_Disponible() && !this.dialogos) {
            this.Movimientos.movimientoPersonaje(player)
        }

        if (cursors.acciones.confirmar.isDown) {
            if (this.interaccionNoviaJuan) {
                if (!this.bannerTxt && !this.finTexto) {
                    this.dialogos = true
                    this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.72, '_banner_dialogos').setScale(0.8, 0.9)
                }

                if (!texto && !this.finTexto) {
                    texto = this.add.text(posicion.x * 0.20, posicion.y * 1.55, dialogos.novia[this.indexTexto++], {
                        fontFamily: 'Arial',
                        fontSize: 32,
                        color: '#ffffff',
                        align: 'left'
                    }).setOrigin(0)
                    this.time.delayedCall(3000, () => { this.permitirCambio = true })
                }

            }
            if (this.finTexto) {
                texto.destroy()
                this.bannerTxt.destroy()
                this.dialogos = false
                this.timer2 = this.time.delayedCall(800, () => {
                    texto = undefined
                    this.bannerTxt = undefined
                    this.indexTexto = 0
                    desplazamientoDialogo = 0
                    this.permitirCambio = false
                    this.dialogos = false
                    this.finTexto = false
                }, [], this)
                this.datosJg.actualzizarAyudaControlesNPC_Disponible()
            } else if (texto && this.permitirCambio) {
                this.permitirCambio = false
                texto.text = dialogos.novia[this.indexTexto++]
                this.time.delayedCall(3000, () => { this.permitirCambio = true })
            }
        }


        this.indexTexto < partesDialogo ? this.finTexto = false : this.finTexto = true
    }
}

function crearPersonaje (escena, posicion = { x: 100, y: 100 }) {
    escena.novia_juan = escena.physics.add.sprite(posicion.x, posicion.y, '_sprites_mujer').setScale(1.25)
    escena.novia_juan.anims.play('idleBack_mujer')
    escena.idle_dialogo = escena.add.sprite(escena.novia_juan.x, escena.novia_juan.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)
    escena.idle_dialogo.visible = false

    if (!escena.anims.exists('idle_dialogo')) {
        crearAnimacion(escena, '_sprite_globo_dialogo', 'idle_dialogo', 0, 4, { frecuencia_frames: 5.5, repeticion: 0 });
    }

    escena.physics.add.overlap(player, escena.novia_juan, () => {
        escena.idle_dialogo.x = escena.novia_juan.x
        escena.idle_dialogo.y = escena.novia_juan.y * 0.93
        escena.interaccionNoviaJuan = true
    }, null, this)

    escena.timerInteraccion = escena.time.addEvent({
        delay: 10,
        callback: () => {
            if (escena.interaccionNoviaJuan) {
                if (!escena.idle_dialogo.anims.isPlaying) {
                    escena.idle_dialogo.visible = true
                    escena.idle_dialogo.anims.play('idle_dialogo')
                    escena.interaccionNoviaJuan = false
                } else {
                    escena.interaccionNoviaJuan = false
                }
            } else {
                if (!escena.idle_dialogo.anims.isPlaying) {
                    escena.idle_dialogo.visible = false
                    escena.idle_dialogo.anims.stop()
                }
            }
        },
        callbackScope: this,
        loop: true
    })
}

function moverPersonajeAnimado (escena, personaje, medidasEscena) {
    escena.time.delayedCall(100, () => {
        escena.tweens.add({
            targets: personaje,
            x: medidasEscena.x * 1.015,
            y: medidasEscena.y,
            duration: 2000,
            onComplete: () => {
                escena.time.delayedCall(150, () => {
                    escena.tweens.add({
                        targets: personaje,
                        x: medidasEscena.x * 0.93,
                        y: medidasEscena.y,
                        duration: 700,
                        onComplete: () => {
                            personaje.anims.play('idleLeft_mujer')
                        }
                    });
                    personaje.anims.play('walkLeft_mujer');
                });
                personaje.anims.play('idleLeft_mujer')
            }
        });
        personaje.anims.play('walkUp_mujer');
    });
}