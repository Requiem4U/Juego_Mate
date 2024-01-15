// Importaciones de funciones y datos escenciales
import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_elementos_escena";
import { ManejadorParpadeoLinea } from "../manejadores/manejador_timers_eventos";

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

// Personaje seleccionado
let personaje = ""

// Variables para texto subrayado
let bounds = { aceptar: undefined, cancelar: undefined }
let underline = { aceptar: undefined, cancelar: undefined }

//Texto Confirmacion
let textoConfimacion = { aceptar: undefined, cancelar: undefined }

let contenido = '¿Estás seguro de tu elección? (Usa F para confirmar)'
// Estilo de texto
let style = undefined
// Variable confirmacion
let confirmado = undefined


let lineaSelec = undefined
let configTimer = undefined

export class Escena_Confirmacion_Seleccion_Personaje extends Phaser.Scene {

    constructor() {
        super({ key: 'confirmacion_seleccion_personaje' })
    }

    init (data) {
        if (data) {
            personaje = data.personaje
            confirmado = true
        }
    }

    preload () {
    }

    create () {

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.add.image(posicion.x / 2, posicion.y / 2, '_fondo_vegetacion').setScale(0.8).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, '_banner_dialogos').setScale(0.8, 1)

        this.caminata_Frente_P = this.add.sprite(posicion.x * 0.2, posicion.y * 0.37, '_sprites_' + personaje).setScale(1.5)
        this.caminata_Der_P = this.add.sprite(posicion.x * 0.4, posicion.y * 0.37, '_sprites_' + personaje).setScale(1.5)
        this.caminata_Espalda_P = this.add.sprite(posicion.x * 0.6, posicion.y * 0.37, '_sprites_' + personaje).setScale(1.5)
        this.caminata_Izq_P = this.add.sprite(posicion.x * 0.8, posicion.y * 0.37, '_sprites_' + personaje).setScale(1.5)

        this.caminata_Frente_P.play('walkDown_' + personaje)
        this.caminata_Der_P.play('walkRight_' + personaje)
        this.caminata_Espalda_P.play('walkUp_' + personaje)
        this.caminata_Izq_P.play('walkLeft_' + personaje)

        style = {
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'white',
            align: 'center'
        }

        this.add.text(posicion.x * 0.1, posicion.y * 0.71, contenido, style).setOrigin(0)


        textoConfimacion.aceptar = this.add.text(posicion.x * 0.3, posicion.y * 0.84, 'Sí', style)
        textoConfimacion.aceptar.setOrigin(0.5)

        bounds.aceptar = textoConfimacion.aceptar.getBounds()
        underline.aceptar = this.add.graphics();
        underline.aceptar.fillStyle(0xffffff, 1);
        underline.aceptar.fillRect(textoConfimacion.aceptar.x - bounds.aceptar.width / 2, textoConfimacion.aceptar.y + bounds.aceptar.height - 10, bounds.aceptar.width, 5)

        textoConfimacion.cancelar = this.add.text(posicion.x * 0.66, posicion.y * 0.84, 'No', style)
        textoConfimacion.cancelar.setOrigin(0.5)

        bounds.cancelar = textoConfimacion.cancelar.getBounds()
        underline.cancelar = this.add.graphics();
        underline.cancelar.fillStyle(0xffffff, 1);
        underline.cancelar.fillRect(textoConfimacion.cancelar.x - bounds.cancelar.width / 2, textoConfimacion.cancelar.y + bounds.cancelar.height - 10, bounds.cancelar.width, 5)
        underline.cancelar.visible = false

        // Linea de pcion sellecionada
        lineaSelec = underline.aceptar

        this.manejadorParpade = new ManejadorParpadeoLinea(this, configTimer)

        // Configuracion del timmer
        configTimer = {
            delay: 700,
            callback: () => { this.manejadorParpade.parpadeoLinea(lineaSelec) },
            callbackScope: this,
            loop: true
        }

        this.timer = this.manejadorParpade.crearTimer()
    }

    update () {
        // Evaluación de los distinos casos en los que se precionan los botones de movimiento (Flechas del teclado)
        if (cursors.movimiento.flechas.right.isDown) {
            // Tecla derecha    ||  Tecla D
            underline.aceptar.visible = false
            underline.cancelar.visible = true
            confirmado = false
            lineaSelec = underline.cancelar
            this.manejadorParpade.reiniciar()
        } else if (cursors.movimiento.flechas.left.isDown) {
            // Tecla izquierda  ||  Tecla A
            underline.aceptar.visible = true
            underline.cancelar.visible = false
            confirmado = true
            lineaSelec = underline.aceptar
            this.manejadorParpade.reiniciar()
        } else if (cursors.acciones.confirmar.isDown) {
            // Tecla confirmacion
            if (!confirmado) {
                this.timer.remove()
                this.scene.start('seleccion_personaje');
            } else {
                this.timer.remove()
                this.scene.start('area_32_interior')
            }
        }

    }
}