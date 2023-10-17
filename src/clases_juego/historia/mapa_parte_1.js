import { crearAnimacion } from '../manejadores/manejador_animaciones'

import sprite_vendedor from '../../imagenes/Personajes/Vendedor_Style_Sheet_128x128.png'
import spriteDialogo from '../../imagenes/Personajes/GloboDialogo.png'

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5)


let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

let salidas = { norte: undefined, sur: undefined, este: undefined, oeste: undefined }
let entrada_a_escena
let desplazamiento
let texto
let contenido
let partesContenido
let dialogoTerminado = false
export class Mapa_Parte_1 extends Phaser.Scene {

    constructor() {
        super({ key: 'mape_parte_1' })
    }

    init(data) {
        if (data) {
            entrada_a_escena = data.entrada
        }
    }

    preload() {

        this.load.spritesheet('sprite_vendedor', sprite_vendedor, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('sprite_dialogo', spriteDialogo, { frameWidth: 128, frameHeight: 128 })
    }

    create() {
        contenido = ['Prueba de mostrar texto', 'Texto en arreglo']
        partesContenido = contenido.length - 1
        desplazamiento = 0

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D')
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, 'fondo_exterior_casa_juan').setScale(0.8, 0.735).setRotation(3.141593).setDepth(-1)

        this.sprite_vendedor = this.physics.add.sprite(posicion.x * 1.6, posicion.y * 0.8, 'sprite_vendedor').setOrigin(0.48, 0.35).setScale(1.5).setImmovable()
        this.idle_dialogo = this.add.sprite(this.sprite_vendedor.x, this.sprite_vendedor.y, 'sprite_dialogo').setOrigin(0.5, 1).setScale(0.8)

        switch (entrada_a_escena) {
            case 'norte': this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 0.15, 'juan_c').setScale(1.25)
                break
            case 'sur':
                break
            case 'este':
                break
            case 'oeste':
                break
        }
        this.player.setCollideWorldBounds(true);

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
        if (!this.anims.exists('idle_vendedor_estandar')) {
            crearAnimacion(this, 'sprite_vendedor', 'idle_vendedor_estandar', 0, 9, 5);
        }
        if (!this.anims.exists('idle_dialogo')) {
            crearAnimacion(this, 'sprite_dialogo', 'idle_dialogo', 0, 4, 5.5, 0);
        }

        let playerSize = { width: this.player.width, height: this.player.height }

        this.player.setSize(playerSize.width * 0.28125, playerSize.height * 0.1875)
        this.player.setOffset(playerSize.width * 0.375, playerSize.height * 0.578125)

        salidas.norte = this.add.rectangle(posicion.x * 1.015, posicion.y * 0.02, posicion.x * 0.25, posicion.y * 0.15, 0x000000, 0)
        salidas.sur = this.add.rectangle(posicion.x * 1.015, posicion.y * 2.05, posicion.x * 0.25, posicion.y * 0.15, 0x000000, 0)

        this.physics.world.enable(salidas.norte)
        this.physics.world.enable(salidas.sur)

        this.sprite_vendedor.anims.play('idle_vendedor_estandar')
        this.idle_dialogo.visible = false

        this.interaccionVendedor = false

        this.physics.add.overlap(this.player, this.sprite_vendedor, (player, obj) => {
            this.interaccionVendedor = true
        }, null, this)

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

        if (!dialogoTerminado) {

            this.bannerTxt = this.add.image(posicion.x * 1.015, posicion.y * 1.75, 'banner_texto_general').setScale(0.8)

            texto = this.add.text(this.bannerTxt.x, this.bannerTxt.y, '', {
                fontFamily: 'Arial',
                fontSize: 32,
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5)

            this.indexTexto = 0

            this.timer2 = this.time.addEvent({
                delay: 100,
                callback: () => {
                    texto.text += contenido[this.indexTexto][desplazamiento++]
                    this.finDialog = false
                },
                callbackScope: this,
                loop: true
            })

            this.finTexto = false
        }

        this.physics.add.collider(this.player, salidas.norte, () => {
            if(this.timer) this.timer.remove()
            if(this.timer2)this.timer2.remove()
            this.scene.start('exterior_casa_juan', { entrada: 'camino' })
        }, null, this)

    }

    update() {

        this.player.setVelocity(0)

        switch (true) {
            // Teclas arriba e izquierda  ||  Teclas W  A
            case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.A.isDown):
                manejadorMovimientoJugador(this.player, -diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                break;

            // Teclas arriba y derecha    ||  Teclas W  D
            case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.D.isDown):
                manejadorMovimientoJugador(this.player, diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                break;

            // Teclas abajo e izquierda   ||  Teclas S  A
            case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.A.isDown):
                manejadorMovimientoJugador(this.player, -diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                break;

            // Teclas abajo y derecha    ||  Teclas S  D
            case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.D.isDown):
                manejadorMovimientoJugador(this.player, diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                break;

            // Tecla derecha    ||  Tecla D
            case cursors.movimiento.flechas.right.isDown || cursors.movimiento.letras.D.isDown:
                manejadorMovimientoJugador(this.player, v_m_personaje, 0, 'walkRight_juan');
                break;

            // Tecla izquierda  ||  Tecla A
            case cursors.movimiento.flechas.left.isDown || cursors.movimiento.letras.A.isDown:
                manejadorMovimientoJugador(this.player, -v_m_personaje, 0, 'walkLeft_juan');
                break;

            // Tecla abajo      ||  Tecla S
            case cursors.movimiento.flechas.down.isDown || cursors.movimiento.letras.S.isDown:
                manejadorMovimientoJugador(this.player, 0, v_m_personaje, 'walkDown_juan');
                break;

            // Tecla arriba     ||  Tecla W
            case cursors.movimiento.flechas.up.isDown || cursors.movimiento.letras.W.isDown:
                manejadorMovimientoJugador(this.player, 0, -v_m_personaje, 'walkUp_juan');
                break;

            case cursors.acciones.confirmar.isDown && this.interaccionVendedor:
                this.scene.start('vendedor_pantalla_principal');
                break;
            case cursors.acciones.confirmar.isDown && this.finDialog:
                texto.text = ''
                this.finDialog = false
                this.timer2.paused = false
                break
            case cursors.acciones.confirmar.isDown && this.finTexto:
                dialogoTerminado = true
                this.timer2.destroy()
                texto.destroy()
                this.bannerTxt.destroy()
                break
            default: // Ninguna tecla
                this.player.anims.stop()
        }

        if (desplazamiento >= contenido[this.indexTexto].length) {
            if (this.indexTexto < partesContenido) {
                this.timer2.paused = true
                this.finDialog = true
                desplazamiento = 0
                this.indexTexto++
            } else {
                this.timer2.paused = true
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