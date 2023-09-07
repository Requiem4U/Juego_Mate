import Phaser from "phaser";
import { crearAnimacion } from "../manejadores/manejador_animaciones";
// Importaciones de fondos, iconos y banners
import backgroundImg from '../../imagenes/Fondos/Fondo_Seleccionar_Personaje.jpg'
import banner_Seleccion from '../../imagenes/Banners/Banner_General_Textos.png'
import banner_Contexto from '../../imagenes/Banners/Baner_Contextos_Vendedor.png'

// Sheets
import vendedor_principal from '../../imagenes/Personajes/Vendedor_PP_Style_Sheet.png'
import canasta from '../../imagenes/Personajes/Cesta_Vendedor_Style_Sheet.png'
import ojos_gato from '../../imagenes/Personajes/Ojos_Gato_Vendedor_Style_Sheet.png'
import { ManejadorParpadeoLinea, repeticionAnimacion } from "../manejadores/manejador_timers_eventos";

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

// Variables para texto subrayado
let bounds = { comprar: undefined, preguntas: undefined, cancelar: undefined }
let underline = [undefined, undefined, undefined]

//Texto Confirmacion
let textoOpciones = [undefined, undefined, undefined]
let listadoOpciones = ['Comprar', 'Preguntas', 'Cancelar']
let opcionSeleccionada = 0

// Estilo de texto
let style = undefined

let configTimer = {parpadeo: undefined, animacion: {vendedor: undefined, canasta: undefined}}
let lineaSelec = undefined

export class Escena_Vendedor_Pantalla_Principal extends Phaser.Scene {

    constructor() {
        super({ key: 'vendedor_pantalla_principal' })
    }

    preload() {
        // Carga de fondos, iconos y banners
        this.load.image('background_seleccion_personaje', backgroundImg)
        this.load.image('banner_texto_general', banner_Seleccion)
        this.load.image('banner_contexto', banner_Contexto)

        this.load.spritesheet('vendedor_pp', vendedor_principal, { frameWidth: 208, frameHeight: 234 })
        this.load.spritesheet('canasta', canasta, { frameWidth: 208, frameHeight: 291 })
        this.load.spritesheet('ojos_gato', ojos_gato, { frameWidth: 208, frameHeight: 291 })
    }

    create() {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D');
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.idle_vendedor_pp = this.add.sprite(posicion.x * 0.25, posicion.y * 0.4, 'vendedor_pp').setScale(3, 3)
        this.canasta = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, 'canasta').setScale(3.5, 3.5)
        this.ojos_gato = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, 'ojos_gato').setScale(3.5, 3.5)

        this.add.image(posicion.x / 2, posicion.y / 2, 'background_seleccion_personaje').setScale(0.8, 1).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, 'banner_texto_general').setAlpha(0.7).setScale(0.8, 1).setDepth(1)
        this.add.image(posicion.x * 0.75, posicion.y * 0.35, 'banner_contexto').setScale(0.8, 0.8).setDepth(1)


        if (!this.anims.exists('idle_vendedro_pp')) {
            crearAnimacion(this, 'vendedor_pp', 'idle_vendedro_pp', 0, 8, 4, 0)
        }

        if (!this.anims.exists('idle_canasta')) {
            crearAnimacion(this, 'canasta', 'idle_canasta', 0, 6, 6)
        }

        if (!this.anims.exists('ojos_gato')) {
            crearAnimacion(this, 'ojos_gato', 'ojos_gato', 0, 6, 6, 0)
        }

        this.idle_vendedor_pp.anims.play('idle_vendedro_pp')
        this.canasta.anims.play('idle_canasta')

        style = {
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'white',
            align: 'center'
        }

        this.add.text(posicion.x / 2, posicion.y * 0.8, 'Bienvenido... Tengo algo que podria interesarte.', style).setOrigin(0.5).setDepth(2)

        textoOpciones[0] = this.add.text(posicion.x * 0.64, posicion.y * 0.2, listadoOpciones[0], style).setDepth(2).setOrigin(0.5)

        bounds.comprar = textoOpciones[0].getBounds()
        underline[0] = this.add.graphics();
        underline[0].fillStyle(0xffffff, 1);
        underline[0].fillRect(textoOpciones[0].x - bounds.comprar.width / 2, textoOpciones[0].y + bounds.comprar.height - 10, bounds.comprar.width, 5)
        underline[0].setDepth(2)

        lineaSelec = underline[0]

        textoOpciones[1] = this.add.text(posicion.x * 0.65, posicion.y * 0.3, listadoOpciones[1], style).setDepth(2).setOrigin(0.5)

        bounds.preguntas = textoOpciones[1].getBounds()
        underline[1] = this.add.graphics();
        underline[1].fillStyle(0xffffff, 1);
        underline[1].fillRect(textoOpciones[1].x - bounds.preguntas.width / 2, textoOpciones[1].y + bounds.preguntas.height - 10, bounds.preguntas.width, 5)
        underline[1].setDepth(2)
        underline[1].visible = false

        textoOpciones[2] = this.add.text(posicion.x * 0.64, posicion.y * 0.4, listadoOpciones[2], style).setDepth(2).setOrigin(0.5)

        bounds.cancelar = textoOpciones[2].getBounds()
        underline[2] = this.add.graphics();
        underline[2].fillStyle(0xffffff, 1);
        underline[2].fillRect(textoOpciones[2].x - bounds.cancelar.width / 2, textoOpciones[2].y + bounds.cancelar.height - 10, bounds.cancelar.width, 5)
        underline[2].setDepth(2)
        underline[2].visible = false
        
        // Configuracion del timmer linea parpadeante
        configTimer.parpadeo = {
            delay: 700,
            callback: () => { this.manejadorParpadeo.parpadeoLinea(lineaSelec) },
            callbackScope: this,
            loop: true
        }

        this.manejadorParpadeo = new ManejadorParpadeoLinea(this, configTimer.parpadeo)

        this.timer = this.manejadorParpadeo.crearTimer()

        // Configuracion de timer vendedor
        configTimer.animacion.vendedor = {
            delay: 7000,
            callback: () => { this.idle_vendedor_pp.anims.play('idle_vendedro_pp') },
            callbackScope: this,
            loop: true
        }

        this.timer = repeticionAnimacion(this, configTimer.animacion.vendedor)

        // Configuracion de timer vendedor
        configTimer.animacion.canasta = {
            delay: 3000,
            callback: () => { this.ojos_gato.anims.play('ojos_gato') },
            callbackScope: this,
            loop: true
        }

        this.timer = repeticionAnimacion(this, configTimer.animacion.canasta)

        this.timer = this.time.addEvent({
            delay: 150,
            callback: () => { this.seleccion() },
            callbackScope: this,
            loop: true
        })

    }

    seleccion() {
        switch (true) {
            case cursors.movimiento.flechas.up.isDown || cursors.movimiento.letras.W.isDown:
                if (opcionSeleccionada == 0) {
                    underline[opcionSeleccionada].visible = false
                    opcionSeleccionada = 2
                    underline[opcionSeleccionada].visible = true
                    lineaSelec = underline[opcionSeleccionada]
                    this.manejadorParpadeo.reiniciar()
                } else {
                    underline[opcionSeleccionada--].visible = false
                    underline[opcionSeleccionada].visible = true
                    lineaSelec = underline[opcionSeleccionada]
                    this.manejadorParpadeo.reiniciar()
                }
                break
            case cursors.movimiento.flechas.down.isDown || cursors.movimiento.letras.S.isDown:
                if (opcionSeleccionada == 2) {
                    underline[opcionSeleccionada].visible = false
                    opcionSeleccionada = 0
                    underline[opcionSeleccionada].visible = true
                    lineaSelec = underline[opcionSeleccionada]
                    this.manejadorParpadeo.reiniciar()
                } else {
                    underline[opcionSeleccionada++].visible = false
                    underline[opcionSeleccionada].visible = true
                    lineaSelec = underline[opcionSeleccionada]
                    this.manejadorParpadeo.reiniciar()
                }
                break
            case cursors.acciones.confirmar.isDown && opcionSeleccionada == 2:
                this.timer.remove()
                this.scene.start('seleccion_personaje')
                break
        }
    }
}