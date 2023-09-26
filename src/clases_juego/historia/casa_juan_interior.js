import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_animaciones";

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
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

let bordes = []
let decoraciones = []
let entradaPuerta = false

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
        this.load.image('interior_casa_juan', casa_juan)
        this.load.image('machete_juan', machete_juan)
        this.load.image('mesa_1', Mesa_1)
        this.load.image('mesa_2', Mesa_2)
        this.load.image('cama_1', Cama)
        this.load.image('ropero_1', Ropero_1)
        this.load.spritesheet('juan_c', juan, { frameWidth: 128, frameHeight: 128 })
    }

    create() {

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D')
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, 'interior_casa_juan').setScale(0.8, 0.735)
        this.cama = this.physics.add.image(posicion.x * 0.5, posicion.y * 1.1, 'cama_1').setScale(1.7, 1.6)
        this.mesa_1 = this.physics.add.image(posicion.x * 1.4, posicion.y * 1.2, 'mesa_1').setScale(1.3, 1.4)
        this.mesa_2 = this.physics.add.image(posicion.x * 1.4, posicion.y * 0.69, 'mesa_2').setScale(1.25, 1)
        this.mesa_2.setSize(this.mesa_2.width * 0.9, this.mesa_2.height * 0.5)
        this.mesa_2.setOffset(this.mesa_2.width * 0.05, this.mesa_2.height * 0.18)
        this.ropero = this.physics.add.image(posicion.x, posicion.y * 0.55, 'ropero_1').setScale(1.4, 1.2)
        this.machete = this.physics.add.image(posicion.x * 1.5, posicion.y * 1.7, 'machete_juan').setImmovable().setScale(0.6, 0.7)
        if (entradaPuerta) {
            this.player = this.physics.add.sprite(posicion.x * 1.015, posicion.y * 1.68, 'juan_c').setScale(1.25)
        } else {
            this.player = this.physics.add.sprite(posicion.x, posicion.y, 'juan_c').setScale(1.25)
        }

        decoraciones.push(this.cama, this.mesa_1, this.mesa_2, this.ropero)

        // Ceación de animaciones de caminata
        if(!this.anims.exists('walkDown_juan')){
            crearAnimacion(this, 'juan_c', 'walkDown_juan', 0, 3);
        }
        if(!this.anims.exists('walkUp_juan')){
            crearAnimacion(this, 'juan_c', 'walkUp_juan', 4, 7);
        }
        if(!this.anims.exists('walkRight_juan')){
            crearAnimacion(this, 'juan_c', 'walkRight_juan', 8, 11);
        }
        if(!this.anims.exists('walkLeft_juan')){
            crearAnimacion(this, 'juan_c', 'walkLeft_juan', 12, 15);
        }

        let playerSize = { width: this.player.width, height: this.player.height }

        this.player.setSize(playerSize.width * 0.28125, playerSize.height * 0.1875)
        this.player.setOffset(playerSize.width * 0.375, playerSize.height * 0.578125)

        this.physics.add.collider(this.player, this.machete, null, null, this)

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

        this.physics.add.collider(this.player, this.limitesCasa, null, null, this)
        this.physics.add.collider(this.player, this.decoracionesCasa, null, null, this)
        this.physics.add.collider(this.player, this.puerta, () => {
            this.scene.start('exterior_casa_juan')
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

            case cursors.acciones.confirmar.isDown:
                console.log(this.game.canvas.width, this.game.canvas.height)
                break;
            default: // Ninguna tecla
                this.player.anims.stop()
        }

    }
}

function manejadorMovimientoJugador(player, velocityX, velocityY, animationKey) {
    player.setVelocityX(velocityX);
    player.setVelocityY(velocityY);
    player.anims.play(animationKey, true);
}