// Importaciones de funciones y datos escenciales
import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_animaciones";
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

let velocidadAnimacion = 6
let contenido = '¿Estás seguro de tu elección? (Usa F para confirmar)'
// Estilo de texto
let style = undefined
// Variable confirmacion
let confirmado = undefined


let lineaSelec = undefined
let configTimer =   undefined

export class Escena_Confirmacion_Seleccion_Personaje extends Phaser.Scene {

    constructor() {
        super({ key: 'confirmacion_seleccion_personaje' })
    }

    init(data) {
        if (data) {
            personaje = data.personaje
            confirmado = true
        }
    }

    preload() {
    }

    create() {

        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D');
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.add.image(posicion.x / 2, posicion.y / 2, 'background_seleccion_personaje').setScale(0.8, 1).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, 'banner_texto_general').setScale(0.8, 1)

        this.caminata_Frente_P = this.add.sprite(posicion.x * 0.2, posicion.y * 0.4, 'caminata_Frente_' + personaje)
        this.caminata_Der_P = this.add.sprite(posicion.x * 0.4, posicion.y * 0.4, 'caminata_Der_' + personaje)
        this.caminata_Espalda_P = this.add.sprite(posicion.x * 0.6, posicion.y * 0.4, 'caminata_Espalda_' + personaje)
        this.caminata_Izq_P = this.add.sprite(posicion.x * 0.8, posicion.y * 0.4, 'caminata_Izq_' + personaje)

        // Se comprueba si ya existe la animación para no crearla de nuevo
        if (!this.anims.exists('caminata_Frente_' + personaje)) {
            crearAnimacion(this, 'caminata_Frente_' + personaje, 'caminata_Frente_' + personaje, 0, 3, velocidadAnimacion)
        }
        if (!this.anims.exists('caminata_Der_' + personaje)) {
            crearAnimacion(this, 'caminata_Der_' + personaje, 'caminata_Der_' + personaje, 0, 3, velocidadAnimacion)
        }
        if (!this.anims.exists('caminata_Espalda_' + personaje)) {
            crearAnimacion(this, 'caminata_Espalda_' + personaje, 'caminata_Espalda_' + personaje, 0, 3, velocidadAnimacion)
        }
        if (!this.anims.exists('caminata_Izq_' + personaje)) {
            crearAnimacion(this, 'caminata_Izq_' + personaje, 'caminata_Izq_' + personaje, 0, 3, velocidadAnimacion)
        }

        this.caminata_Frente_P.play('caminata_Frente_' + personaje)
        this.caminata_Der_P.play('caminata_Der_' + personaje)
        this.caminata_Espalda_P.play('caminata_Espalda_' + personaje)
        this.caminata_Izq_P.play('caminata_Izq_' + personaje)

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

    update() {
        // Evaluación de los distinos casos en los que se precionan los botones de movimiento (Flechas del teclado)
        if (cursors.movimiento.flechas.right.isDown || cursors.movimiento.letras.D.isDown) {
            // Tecla derecha    ||  Tecla D
            underline.aceptar.visible = false
            underline.cancelar.visible = true
            confirmado = false
            lineaSelec = underline.cancelar
            this.manejadorParpade.reiniciar()
        } else if (cursors.movimiento.flechas.left.isDown || cursors.movimiento.letras.A.isDown) {
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
            } else{
                this.timer.remove()
                this.scene.start('vendedor_pantalla_principal')
            }
        }

    }
}