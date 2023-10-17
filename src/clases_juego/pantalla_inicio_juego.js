import Phaser from "phaser";
import { crearAnimacion } from "./manejadores/manejador_animaciones";

import fondo_inicio from '../imagenes/Fondos/Fondo_Pantalla_Inicio.jpg'
import minijuego_inicio from '../imagenes/Fondos/MiniJuego_Pantalla_Inicio.png'

import juan from "../imagenes/Personajes/Juan_C_Sprite_Style_Sheets.png"
import sprite_Hombre from "../imagenes/Personajes/Hombre_Style_Sheets_128x128.png"
import sprite_Mujer from "../imagenes/Personajes/Mujer_Style_Sheets_128x128.png"

import bannerTextGeneral from '../imagenes/Banners/Banner_General_Textos.png'

const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5)


let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

export class Pantalla_Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'pantalla_inicio' })
    }

    preload() {

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D')
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        this.load.image('fondo_pantalla_inicio', fondo_inicio)
        this.load.spritesheet('minijuego_incio', minijuego_inicio, { frameWidth: 768, frameHeight: 432 })
        
        this.load.image('banner_texto_general',bannerTextGeneral)

        this.load.spritesheet('juan_c', juan, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('player_Hombre', sprite_Hombre, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('player_Mujer', sprite_Mujer, { frameWidth: 128, frameHeight: 128 })
    }

    create() {
        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }

        this.add.image(posicion.x * 0.99, posicion.y * 0.975, 'fondo_pantalla_inicio').setScale(0.77)
        this.minijuego = this.physics.add.sprite(posicion.x * 0.994, posicion.y * 0.991, 'minijuego_incio').setScale(1.0125, 1.0016)
        crearAnimacion(this, 'minijuego_incio', 'anim_minijuego_inicio', 0, 18, 6)

        this.minijuego.anims.play('anim_minijuego_inicio')

        this.player = this.physics.add.sprite(posicion.x, posicion.y * 1.4, 'juan_c').setScale(0.8)

        crearAnimacion(this, 'juan_c', 'walkRight_juan_inicio', 8, 11, 6);
        this.player.anims.play('walkRight_juan_inicio')

        this.btn_jugar = this.add.circle(posicion.x * 1.625, posicion.y * 1.44, 45, 0x000000, 0)
        this.physics.world.enable(this.btn_jugar)
        this.btn_jugar.setInteractive()
        this.btn_jugar.on('pointerdown', function (pointer) {
            this.scene.start('seleccion_personaje')
        }, this);


        // Ceación de animaciones de caminata Hombre
        crearAnimacion(this, 'player_Hombre', 'walkDown_H', 0, 3);
        crearAnimacion(this, 'player_Hombre', 'walkUp_H', 4, 7);
        crearAnimacion(this, 'player_Hombre', 'walkLeft_H', 8, 11);
        crearAnimacion(this, 'player_Hombre', 'walkRight_H', 12, 15);
        //Creación de animación Idle Hombre
        crearAnimacion(this, 'player_Hombre', 'idleFront_H', 16, 19, 2.1);
        crearAnimacion(this, 'player_Hombre', 'idleBack_H', 20, 23, 2.1);
        crearAnimacion(this, 'player_Hombre', 'idleLeft_H', 24, 27, 2.1);
        crearAnimacion(this, 'player_Hombre', 'idleRight_H', 28, 31, 2.1);

        // Ceación de animaciones de caminata Mujer
        crearAnimacion(this, 'player_Mujer', 'walkDown_M', 0, 3);
        crearAnimacion(this, 'player_Mujer', 'walkUp_M', 4, 7);
        crearAnimacion(this, 'player_Mujer', 'walkLeft_M', 8, 11);
        crearAnimacion(this, 'player_Mujer', 'walkRight_M', 12, 15);
        //Creación de animación Idle Mujer
        crearAnimacion(this, 'player_Mujer', 'idleFront_M', 16, 19, 2.1);
        crearAnimacion(this, 'player_Mujer', 'idleBack_M', 20, 23, 2.1);
        crearAnimacion(this, 'player_Mujer', 'idleLeft_M', 24, 27, 2.1);
        crearAnimacion(this, 'player_Mujer', 'idleRight_M', 28, 31, 2.1);
    }

    update() {

    }
}