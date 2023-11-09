// Importaciones de funciones y datos escenciales
import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_elementos_escena";
import { ManejadorParpadeoLinea } from "../manejadores/manejador_timers_eventos";

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
let configTimer = undefined

let contenido = 'Escoge tu personaje... (Usa A y D para seleccionar. Usa F para confirmar)'

export class Escena_Seleccion_Personaje extends Phaser.Scene {

    constructor() {
        super({ key: 'seleccion_personaje' })
    }

    init () {
        personajeSeleccionado = 'mujer'
    }
    preload () {
    }

    create () {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.add.image(posicion.x / 2, posicion.y / 2, '_fondo_vegetacion').setScale(0.8).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, '_banner_dialogos').setScale(0.8, 1)

        this.idle_Mujer = this.add.sprite(posicion.x * 0.32, posicion.y * 0.37, '_sprites_mujer').setScale(2.5)
        this.idle_Hombre = this.add.sprite(posicion.x * 0.66, posicion.y * 0.37, '_sprites_hombre').setScale(2.5)

        this.idle_Mujer.anims.play('idleFront_mujer')
        this.idle_Hombre.anims.play('idleFront_hombre')

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
        this.manejadorParpade.crearTimer()
    }

    update () {
        // Evaluación de los distinos casos en los que se precionan los botones de movimiento (Flechas del teclado)
        if (cursors.movimiento.flechas.right.isDown) {
            // Tecla derecha    ||  Tecla D
            underline.mujer.visible = false
            underline.hombre.visible = true
            personajeSeleccionado = 'hombre'
            lineaSelec = underline.hombre
            this.manejadorParpade.reiniciar()
        } else if (cursors.movimiento.flechas.left.isDown) {
            // Tecla izquierda  ||  Tecla A
            underline.mujer.visible = true
            underline.hombre.visible = false
            personajeSeleccionado = 'mujer'
            lineaSelec = underline.mujer
            this.manejadorParpade.reiniciar()
        } else if (cursors.acciones.confirmar.isDown) {
            this.manejadorParpade.eliminarTimer()
            // Tecla confirmacion
            this.scene.start('confirmacion_seleccion_personaje', { personaje: personajeSeleccionado });
        }
    }
}
