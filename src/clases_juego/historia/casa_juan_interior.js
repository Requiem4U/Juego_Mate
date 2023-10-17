import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_animaciones";

import spriteDialogo from '../../imagenes/Personajes/GloboDialogo.png'

import casa_juan from "../../imagenes/Fondos/Interior_Casa_Juan_Cupul.jpg"
import juan from "../../imagenes/Personajes/Juan_C_Sprite_Style_Sheets.png"

// Decoracion y objetos
import machete_juan from '../../imagenes/Objetos/Armas/Machete_Juan.png'
import Cama from '../../imagenes/Objetos/Decoracion/Cama_1.png'
import Mesa_1 from '../../imagenes/Objetos/Decoracion/Mesa_1.png'
import Mesa_2 from '../../imagenes/Objetos/Decoracion/Mesa_2.png'
import Ropero_1 from '../../imagenes/Objetos/Decoracion/Ropero_1.png'

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5)


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

let seMueve = { arriba: false, abajo: false, izquierda: false, derecha: false}

export class Interior_Casa_Juan extends Phaser.Scene {

    constructor() {
        super({ key: 'interior_caja_juan' })
    }

    init(data) {
        if (data) {
            entradaPuerta = data.entradaPuerta
        }
    }

    preload() {

        this.load.spritesheet('sprite_dialogo', spriteDialogo, { frameWidth: 128, frameHeight: 128 })
        this.load.image('interior_casa_juan', casa_juan)
        this.load.image('machete_juan', machete_juan)
        this.load.image('mesa_1', Mesa_1)
        this.load.image('mesa_2', Mesa_2)
        this.load.image('cama_1', Cama)
        this.load.image('ropero_1', Ropero_1)
        this.load.spritesheet('juan_c', juan, { frameWidth: 128, frameHeight: 128 })
    }

    create() {

        dialogos = ['Usa las teclas <- -> para moverse de izquierda a derecha',
            'Usa las teclas para moverse arriba y abajo']
        partesDialogo = dialogos.length - 1
        desplazamientoDialogo = 0

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D')
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, 'interior_casa_juan').setScale(0.8, 0.735)
        this.cama = this.physics.add.image(posicion.x * 0.5, posicion.y * 1.1, 'cama_1').setScale(1.7, 1.6)
        this.mesa_1 = this.physics.add.image(posicion.x * 1.4, posicion.y * 1.2, 'mesa_1').setScale(1.3, 1.4)
        this.mesa_2 = this.physics.add.image(posicion.x * 1.4, posicion.y * 0.69, 'mesa_2').setScale(1.25, 1)
        this.mesa_2.setSize(this.mesa_2.width * 0.9, this.mesa_2.height * 0.5)
        this.mesa_2.setOffset(this.mesa_2.width * 0.05, this.mesa_2.height * 0.18)
        this.ropero = this.physics.add.image(posicion.x, posicion.y * 0.55, 'ropero_1').setScale(1.4, 1.2)
        this.machete = this.physics.add.image(posicion.x * 1.5, posicion.y * 1.7, 'machete_juan').setImmovable().setScale(0.6, 0.7)

        if (entradaPuerta) {
            player = this.physics.add.sprite(posicion.x * 1.015, posicion.y * 1.68, 'juan_c').setScale(1.25)
        } else {
            player = this.physics.add.sprite(posicion.x, posicion.y, 'juan_c').setScale(1.25)
        }

        decoraciones.push(this.cama, this.mesa_1, this.mesa_2, this.ropero)

        // Ceación de animaciones de caminata
        if (!this.anims.exists('walkDown_juan')) {
            crearAnimacion(this, 'juan_c', 'walkDown_juan', 0, 3);
        }
        if (!this.anims.exists('walkUp_juan')) {
            crearAnimacion(this, 'juan_c', 'walkUp_juan', 4, 7);
        }
        if (!this.anims.exists('walkRight_juan')) {
            crearAnimacion(this, 'juan_c', 'walkRight_juan', 8, 11);
        }
        if (!this.anims.exists('walkLeft_juan')) {
            crearAnimacion(this, 'juan_c', 'walkLeft_juan', 12, 15);
        }

        let playerSize = { width: player.width, height: player.height }

        player.setSize(playerSize.width * 0.28125, playerSize.height * 0.1875)
        player.setOffset(playerSize.width * 0.375, playerSize.height * 0.578125)

        this.physics.add.collider(player, this.machete, null, null, this)

        bordes.push(this.add.rectangle(posicion.x * 0.2, posicion.y, posicion.x * 0.15, posicion.y * 2, 0x00ffff, 0))
        bordes.push(this.add.rectangle(posicion.x * 1.8, posicion.y, posicion.x * 0.15, posicion.y * 2, 0x00ff00, 0))
        bordes.push(this.add.rectangle(posicion.x, posicion.y * 0.42, posicion.x * 2, posicion.y * 0.5, 0xffffff, 0))
        bordes.push(this.add.rectangle(posicion.x * 0.51, posicion.y * 1.8, posicion.x * 0.8, posicion.y * 0.15, 0x000000, 0))
        bordes.push(this.add.rectangle(posicion.x * 1.52, posicion.y * 1.8, posicion.x * 0.8, posicion.y * 0.15, 0x000000, 0))
        this.puerta = this.add.rectangle(posicion.x * 1.015, posicion.y * 1.87, posicion.x * 0.25, posicion.y * 0.15, 0x000000, 0)

        this.limitesCasa = this.physics.add.group(bordes)
        this.decoracionesCasa = this.physics.add.group(decoraciones)
        this.decoracionesCasa.children.iterate(obj => { obj.body.immovable = true })

        this.physics.world.enable(this.limitesCasa)
        this.physics.world.enable(this.puerta)
        this.limitesCasa.children.iterate(obj => { obj.body.immovable = true })

        this.physics.add.collider(player, this.limitesCasa, null, null, this)
        this.physics.add.collider(player, this.decoracionesCasa, null, null, this)

        this.interaccionNoviaJuan = false

        if (dialogoTerminado) {
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

        this.physics.add.collider(player, this.puerta, () => {
            if (this.timerInteraccion) this.timerInteraccion.destroy()
            if (this.timerTexto) this.timerTexto.destroy()
            this.scene.start('exterior_casa_juan', { entrada: 'casa' })
        }, null, this)

        this.timerTexto = this.time.addEvent({
            delay: 100,
            callback: () => {
                texto.text += dialogos[this.indexTexto][desplazamientoDialogo++]
                this.finDialog = false
            },
            callbackScope: this,
            loop: true
        })
        this.timerTexto.paused = true

        this.indexTexto = 0
        // Botón Arriba
        cursors.movimiento.tactil.arriba = this.add.circle(200, 100, 50, 0x00ff01).setInteractive();
        cursors.movimiento.tactil.arriba.on('pointerdown', () => {
            seMueve.arriba = true
        });
        cursors.movimiento.tactil.arriba.on('pointerup', function () {
            seMueve.arriba = false
        });
        

        // Botón Abajo
        cursors.movimiento.tactil.abajo = this.add.circle(200, 300, 50, 0x00ff01).setInteractive();
        cursors.movimiento.tactil.abajo.on('pointerdown', function () {
            seMueve.abajo = true
        });
        cursors.movimiento.tactil.abajo.on('pointerup', function () {
            seMueve.abajo = false
        });

        // Botón Izquierda
        cursors.movimiento.tactil.izq = this.add.circle(100, 200, 50, 0x00ff00).setInteractive();
        cursors.movimiento.tactil.izq.on('pointerdown', function () {
            seMueve.izquierda = true
        });
        cursors.movimiento.tactil.izq.on('pointerup', function () {
            seMueve.izquierda = false
        });

        // Botón Derecha
        cursors.movimiento.tactil.der = this.add.circle(300, 200, 50, 0x00ff00).setInteractive();
        cursors.movimiento.tactil.der.on('pointerdown', function () {
            seMueve.derecha = true
        });
        cursors.movimiento.tactil.der.on('pointerup', function () {
            seMueve.derecha = false
        });
    }

    update() {

        player.setVelocity(0)

        if (dialogoTerminado) {
            switch (true) {
                // Teclas arriba e izquierda  ||  Teclas W  A
                case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.A.isDown) || (seMueve.arriba&&seMueve.izquierda):
                    manejadorMovimientoJugador(player, -diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                    break;

                // Teclas arriba y derecha    ||  Teclas W  D
                case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.D.isDown)|| (seMueve.arriba&&seMueve.derecha):
                    manejadorMovimientoJugador(player, diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                    break;

                // Teclas abajo e izquierda   ||  Teclas S  A
                case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.A.isDown)|| (seMueve.abajo&&seMueve.izquierda):
                    manejadorMovimientoJugador(player, -diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                    break;

                // Teclas abajo y derecha    ||  Teclas S  D
                case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.D.isDown)|| (seMueve.abajo&&seMueve.derecha):
                    manejadorMovimientoJugador(player, diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                    break;

                // Tecla derecha    ||  Tecla D
                case cursors.movimiento.flechas.right.isDown || cursors.movimiento.letras.D.isDown || seMueve.derecha:
                    manejadorMovimientoJugador(player, v_m_personaje, 0, 'walkRight_juan');
                    break;

                // Tecla izquierda  ||  Tecla A
                case cursors.movimiento.flechas.left.isDown || cursors.movimiento.letras.A.isDown || seMueve.izquierda:
                    manejadorMovimientoJugador(player, -v_m_personaje, 0, 'walkLeft_juan');
                    break;

                // Tecla abajo      ||  Tecla S
                case cursors.movimiento.flechas.down.isDown || cursors.movimiento.letras.S.isDown || seMueve.abajo:
                    manejadorMovimientoJugador(player, 0, v_m_personaje, 'walkDown_juan');
                    break;

                // Tecla arriba     ||  Tecla W
                case cursors.movimiento.flechas.up.isDown || cursors.movimiento.letras.W.isDown || seMueve.arriba:
                    manejadorMovimientoJugador(player, 0, -v_m_personaje, 'walkUp_juan');
                    break;

                default: // Ninguna tecla
                    player.anims.stop()
            }
        }


        if (cursors.acciones.confirmar.isDown) {
            if (this.finDialog) {
                texto.text = ''
                this.finDialog = false
                this.timerTexto.paused = false
            }
            if (this.finTexto) {
                dialogoTerminado = true
                this.timerTexto.destroy()
                texto.destroy()
                this.bannerTxt.destroy()
            }
        }

        if (cursors.acciones.confirmar.isDown && this.interaccionNoviaJuan) {
            if (!this.bannerTxt) {
                this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.75, 'banner_texto_general').setScale(0.8)
            }

            if (!texto) {
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

function manejadorMovimientoJugador(player, velocityX, velocityY, animationKey) {
    player.setVelocityX(velocityX);
    player.setVelocityY(velocityY);
    player.anims.play(animationKey, true);
}

function crearPersonaje(escena, posicion = { x: 100, y: 100 }) {
    escena.novia_juan = escena.physics.add.sprite(posicion.x, posicion.y, 'player_Mujer').setScale(1.25)
    escena.novia_juan.anims.play('idleFront_M')
    escena.idle_dialogo = escena.add.sprite(escena.novia_juan.x, escena.novia_juan.y, 'sprite_dialogo').setOrigin(0.5, 1).setScale(0.8)
    escena.idle_dialogo.visible = false

    if (!escena.anims.exists('idle_dialogo')) {
        crearAnimacion(escena, 'sprite_dialogo', 'idle_dialogo', 0, 4, 5.5, 0);
    }

    escena.physics.add.overlap(player, escena.novia_juan, (player, obj) => {
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