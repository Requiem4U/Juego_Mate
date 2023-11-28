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
let dialogos
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

        dialogos = ['Usa las teclas <- -> para moverse de izquierda a derecha',
            'Usa las teclas para moverse arriba y abajo']
        partesDialogo = dialogos.length - 1
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
        } else {
            player = this.physics.add.sprite(posicion.x, posicion.y, '_sprites_juan_cupul').setScale(1.25)
            player.anims.play('idleFront_juan')
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
        } else {
            this.timer = this.time.addEvent({
                delay: 2500,
                callback: () => {
                    crearPersonaje(this, { x: posicion.x * 1.1, y: posicion.y })
                },
                callbackScope: this
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
            delay: 80,
            callback: () => {
                texto.text += dialogos[this.indexTexto][desplazamientoDialogo++]
                this.finDialog = false
            },
            callbackScope: this,
            loop: true
        })
        this.timerTexto.paused = true

        this.indexTexto = 0
        this.dialogos = false
        this.teclaPrecionada = false

        this.timer2 = this.time.addEvent({})

    }

    update (time, delta = 500) {

        player.setVelocity(0)

        if (this.datosJg.ayudaControlesNPC_Disponible() && !this.dialogos) {
            this.Movimientos.movimientoPersonaje(player)
        }

        cursors.acciones.confirmar.isDown ? this.teclaPrecionada = true : this.teclaPrecionada = false

        if (cursors.acciones.confirmar.isDown && this.teclaPrecionada) {
            if (this.finDialog) {
                texto.text = ''
                this.finDialog = false
                this.timerTexto.paused = false
            }
            if (this.finTexto) {
                this.dialogos = false
                this.datosJg.actualzizarAyudaControlesNPC_Disponible()
                texto.destroy()
                this.bannerTxt.destroy()
                this.timer2 = this.time.delayedCall(800, () => {
                    texto = undefined
                    this.bannerTxt = undefined
                    this.indexTexto = 0
                    desplazamientoDialogo = 0
                    this.finDialog = false
                    this.dialogos = false
                    this.finTexto = false
                }, [], this)
            }
        }

        if (cursors.acciones.confirmar.isDown && this.interaccionNoviaJuan && this.teclaPrecionada) {
            if (!this.bannerTxt && !this.finTexto) {
                console.log(1)
                this.dialogos = true
                this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.75, '_banner_dialogos').setScale(0.8)
            }

            if (!texto && !this.finTexto) {
                console.log(2)
                texto = this.add.text(this.bannerTxt.x, this.bannerTxt.y, '', {
                    fontFamily: 'Arial',
                    fontSize: 32,
                    color: '#ffffff',
                    align: 'center'
                }).setOrigin(0.5)

                this.timerTexto.paused = false
            }

        }

        if (desplazamientoDialogo >= dialogos[this.indexTexto].length) {
            if (this.indexTexto < partesDialogo) {
                this.timerTexto.paused = true
                this.finDialog = true
                desplazamientoDialogo = 0
                this.indexTexto++
            } else {
                this.timerTexto.paused = true
                this.finTexto = true
            }
        }
    }
}

function crearPersonaje (escena, posicion = { x: 100, y: 100 }) {
    escena.novia_juan = escena.physics.add.sprite(posicion.x, posicion.y, '_sprites_mujer').setScale(1.25)
    escena.novia_juan.anims.play('idleFront_mujer')
    escena.idle_dialogo = escena.add.sprite(escena.novia_juan.x, escena.novia_juan.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)
    escena.idle_dialogo.visible = false

    if (!escena.anims.exists('idle_dialogo')) {
        crearAnimacion(escena, '_sprite_globo_dialogo', 'idle_dialogo', 0, 4, { frecuencia_frames: 5.5, repeticion: 0 });
    }

    escena.physics.add.overlap(player, escena.novia_juan, () => {
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