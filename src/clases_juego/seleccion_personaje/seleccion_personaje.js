// Importaciones de funciones y datos escenciales
import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_animaciones";
import { ManejadorParpadeoLinea } from "../manejadores/manejador_timers_eventos";

// Importaciones de fondos, iconos y banners
import backgroundImg from '../../imagenes/Fondos/Fondo_Seleccionar_Personaje.jpg'
import banner_Seleccion from '../../imagenes/Banners/Banner_General_Textos.png'

//Importaciones de sprites de personajes
import sprite_Idle_Mujer from '../../imagenes/Personajes/Mujer_Style_Sheet_Idle.png'
import sprite_Idle_Hombre from '../../imagenes/Personajes/Hombre_Style_Sheet_Idle.png'

//Sheets para confirmacion Mujer
import sprite_Frente_Mujer from '../../imagenes/Personajes/Mujer_Camina_Frente_Style_Sheets.png'
import sprite_Espalda_Mujer from '../../imagenes/Personajes/Mujer_Camina_Espalda_Style_Sheets.png'
import sprite_Der_Mujer from '../../imagenes/Personajes/Mujer_Camina_Der_Style_Sheets.png'
import sprite_Izq_Mujer from '../../imagenes/Personajes/Mujer_Camina_Izq_Style_Sheets.png'

//Sheets para confirmacion Mujer
import sprite_Frente_Hombre from '../../imagenes/Personajes/Hombre_Camina_Frente_Style_Sheets.png'
import sprite_Espalda_Hombre from '../../imagenes/Personajes/Hombre_Camina_Espalda_Style_Sheets.png'
import sprite_Der_Hombre from '../../imagenes/Personajes/Hombre_Camina_Der_Style_Sheets.png'
import sprite_Izq_Hombre from '../../imagenes/Personajes/Hombre_Camina_Izq_Style_Sheets.png'

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

// Variables para los textos mostrados al seleccionar personaje (Mujer y Hombre)
let personajes = { mujer: undefined, hombre: undefined }
// Variables para texto subrayado
let bounds = { mujer: undefined, hombre: undefined }
let underline = { mujer: undefined, hombre: undefined }
// Personaje que se selecciona
let personajeSeleccionado = 'Mujer'
// Estilo de texto
let style = undefined

let lineaSelec = undefined
let configTimer =   undefined

let contenido = 'Escoge tu personaje... (Usa A y D para seleccionar. Usa F para confirmar)'

export class Escena_Seleccion_Personaje extends Phaser.Scene {

    constructor() {
        super({ key: 'seleccion_personaje' })
    }

    init() {
        personajeSeleccionado = 'Mujer'
    }
    preload() {
        // Carga de fondos, iconos y banners
        this.load.image('background_seleccion_personaje', backgroundImg)
        this.load.image('banner_texto_general', banner_Seleccion)

        // Carga de Sprites
        this.load.spritesheet('idle_Mujer', sprite_Idle_Mujer, { frameWidth: 256, frameHeight: 256 })
        this.load.spritesheet('idle_Hombre', sprite_Idle_Hombre, { frameWidth: 256, frameHeight: 256 })

        // Sprites confirmacion Mujer
        this.load.spritesheet('caminata_Frente_Mujer', sprite_Frente_Mujer, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Espalda_Mujer', sprite_Espalda_Mujer, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Der_Mujer', sprite_Der_Mujer, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Izq_Mujer', sprite_Izq_Mujer, { frameWidth: 192, frameHeight: 192 })

        // Sprites confirmacion Mujer
        this.load.spritesheet('caminata_Frente_Hombre', sprite_Frente_Hombre, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Espalda_Hombre', sprite_Espalda_Hombre, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Der_Hombre', sprite_Der_Hombre, { frameWidth: 192, frameHeight: 192 })
        this.load.spritesheet('caminata_Izq_Hombre', sprite_Izq_Hombre, { frameWidth: 192, frameHeight: 192 })
    }

    create() {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D');
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.add.image(posicion.x / 2, posicion.y / 2, 'background_seleccion_personaje').setScale(0.8).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, 'banner_texto_general').setScale(0.8, 1)

        this.idle_Mujer = this.add.sprite(posicion.x * 0.32, posicion.y * 0.4, 'idle_Mujer')
        this.idle_Hombre = this.add.sprite(posicion.x * 0.66, posicion.y * 0.4, 'idle_Hombre')

        // Animacion Idle
        // Se comprueba si ya existe la animación para no crearla de nuevo
        if (!this.anims.exists('idle_Mujer')) {
            crearAnimacion(this, 'idle_Mujer', 'idle_Mujer', 0, 3, 1.25)
        }
        if (!this.anims.exists('idle_Hombre')) {
            crearAnimacion(this, 'idle_Hombre', 'idle_Hombre', 0, 3, 1.3)
        }

        this.idle_Mujer.anims.play('idle_Mujer')
        this.idle_Hombre.anims.play('idle_Hombre')

        style = {
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'white',
            align: 'center'
        }

        this.add.text(posicion.x * 0.1, posicion.y * 0.71, contenido, style).setOrigin(0)

        personajes.mujer = this.add.text(posicion.x * 0.3, posicion.y * 0.84, 'Mujer', style)
        personajes.mujer.setOrigin(0.5)

        bounds.mujer = personajes.mujer.getBounds()
        underline.mujer = this.add.graphics();
        underline.mujer.fillStyle(0xffffff, 1);
        underline.mujer.fillRect(personajes.mujer.x - bounds.mujer.width / 2, personajes.mujer.y + bounds.mujer.height - 10, bounds.mujer.width, 5)

        personajes.hombre = this.add.text(posicion.x * 0.66, posicion.y * 0.84, 'Hombre', style)
        personajes.hombre.setOrigin(0.5)

        bounds.hombre = personajes.hombre.getBounds()
        underline.hombre = this.add.graphics();
        underline.hombre.fillStyle(0xffffff, 1);
        underline.hombre.fillRect(personajes.hombre.x - bounds.hombre.width / 2, personajes.hombre.y + bounds.hombre.height - 10, bounds.hombre.width, 5)
        underline.hombre.visible = false
        
        // Linea de pcion sellecionada
        lineaSelec = underline.mujer
        
        // Configuracion del timmer
        configTimer = {
            delay: 700,
            callback: () => { this.manejadorParpade.parpadeoLinea(lineaSelec) },
            callbackScope: this,
            loop: true
        }
        
        this.manejadorParpade = new ManejadorParpadeoLinea(this, configTimer)
        this.timer = this.manejadorParpade.crearTimer()
    }

    update() {
        // Evaluación de los distinos casos en los que se precionan los botones de movimiento (Flechas del teclado)
        if (cursors.movimiento.flechas.right.isDown || cursors.movimiento.letras.D.isDown) {
            // Tecla derecha    ||  Tecla D
            underline.mujer.visible = false
                underline.hombre.visible = true
                personajeSeleccionado = 'Hombre'
                lineaSelec = underline.hombre
                this.manejadorParpade.reiniciar()
        } else if (cursors.movimiento.flechas.left.isDown || cursors.movimiento.letras.A.isDown) {
            // Tecla izquierda  ||  Tecla A
            underline.mujer.visible = true
                underline.hombre.visible = false
                personajeSeleccionado = 'Mujer'
                lineaSelec = underline.mujer
                this.manejadorParpade.reiniciar()
        } else if (cursors.acciones.confirmar.isDown) {
            this.timer.remove()
            // Tecla confirmacion
            this.scene.start('confirmacion_seleccion_personaje', { personaje: personajeSeleccionado });
        }
    }
}
