import Phaser from "phaser";
import { ManejadorParpadeoLinea, repeticionAnimacion } from "../manejadores/manejador_timers_eventos";

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined },
    acciones: { confirmar: undefined, cacelar: undefined }
}

// Variables para texto subrayado
let bounds = { comprar: undefined, preguntas: undefined, cancelar: undefined }
let underline = [undefined, undefined, undefined]

//Texto Confirmacion
let textoOpciones = [undefined, undefined, undefined]
let listadoOpciones = ['Basta Matemático', 'Preguntas', 'Cancelar']
let opcionSeleccionada = undefined

// Estilo de texto
let style = undefined

let configTimer = { parpadeo: undefined, animacion: { vendedor: undefined, canasta: undefined } }
let lineaSelec = undefined
let escenaAnterior = { key: 'a', posicion: { x: 10, y: 100 } }

export class Escena_Vendedor_Pantalla_Principal extends Phaser.Scene {

    constructor() {
        super({ key: 'vendedor_pantalla_principal' })
    }

    init (data) {
        if (data) { escenaAnterior = data }
    }

    preload () {
    }

    create () {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.acciones.confirmar = this.input.keyboard.addKey('ENTER')
        cursors.acciones.cacelar = this.input.keyboard.addKey('ESC')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.idle_vendedor_pp = this.add.sprite(posicion.x * 0.25, posicion.y * 0.4, '_sprite_vendedor_tienda').setScale(3, 3)
        this.canasta = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_cesta_vendedor').setScale(3.5, 3.5)
        this.ojos_gato = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_ojos_gato').setScale(3.5, 3.5)

        this.add.image(posicion.x / 2, posicion.y / 2, '_fondo_vendedor_tienda').setScale(0.8, 0.735).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, '_banner_dialogos').setAlpha(0.7).setScale(0.8, 1).setDepth(1)
        this.add.image(posicion.x * 0.75, posicion.y * 0.35, '_banner_contextos').setScale(0.8, 0.8).setDepth(1)

        this.idle_vendedor_pp.anims.play('idle_vendedro_tienda')
        this.canasta.anims.play('idle_cesta')

        style = {
            fontFamily: 'Arial',
            fontSize: 35,
            fill: 'white',
            align: 'center'
        }

        this.add.text(posicion.x / 2, posicion.y * 0.8, 'Bienvenido... Tengo algo que podria interesarte.', style).setOrigin(0.5).setDepth(2)

        textoOpciones[0] = this.add.text(posicion.x * 0.6, posicion.y * 0.2, listadoOpciones[0], style).setDepth(2).setOrigin(0)

        bounds.comprar = textoOpciones[0].getBounds()
        underline[0] = this.add.graphics();
        underline[0].fillStyle(0xffffff, 1);
        underline[0].fillRect(textoOpciones[0].x, textoOpciones[0].y + bounds.comprar.height, bounds.comprar.width, 5)
        underline[0].setDepth(2)

        lineaSelec = underline[0]

        textoOpciones[1] = this.add.text(posicion.x * 0.6, posicion.y * 0.3, listadoOpciones[1], style).setDepth(2).setOrigin(0)

        bounds.preguntas = textoOpciones[1].getBounds()
        underline[1] = this.add.graphics();
        underline[1].fillStyle(0xffffff, 1);
        underline[1].fillRect(textoOpciones[1].x, textoOpciones[1].y + bounds.preguntas.height, bounds.preguntas.width, 5)
        underline[1].setDepth(2)
        underline[1].visible = false

        textoOpciones[2] = this.add.text(posicion.x * 0.6, posicion.y * 0.4, listadoOpciones[2], style).setDepth(2).setOrigin(0)

        bounds.cancelar = textoOpciones[2].getBounds()
        underline[2] = this.add.graphics();
        underline[2].fillStyle(0xffffff, 1);
        underline[2].fillRect(textoOpciones[2].x, textoOpciones[2].y + bounds.cancelar.height, bounds.cancelar.width, 5)
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
            callback: () => { this.idle_vendedor_pp.anims.play('idle_vendedro_tienda') },
            callbackScope: this,
            loop: true
        }

        this.timer = repeticionAnimacion(this, configTimer.animacion.vendedor)

        // Configuracion de timer vendedor
        configTimer.animacion.canasta = {
            delay: 3150,
            callback: () => { this.ojos_gato.anims.play('animacion_ojos_gato') },
            callbackScope: this,
            loop: true
        }

        this.timer = repeticionAnimacion(this, configTimer.animacion.canasta)

        opcionSeleccionada = 0

        this.timer = this.time.addEvent({
            delay: 150,
            startAt: 150,
            callback: () => { this.seleccion() },
            callbackScope: this,
            loop: true
        })

    }

    seleccion () {
        switch (true) {
            // Selección Opciones Hacia Arriba
            case cursors.movimiento.flechas.up.isDown:
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
            // Selección Opciones Hacia Arriba
            case cursors.movimiento.flechas.down.isDown:
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
            // Opción Comprar Items
            case cursors.acciones.confirmar.isDown && opcionSeleccionada == 0:
                this.scene.start('basta_matematico', escenaAnterior)
                break
            // Opción Preguntas
            case cursors.acciones.confirmar.isDown && opcionSeleccionada == 1:
                this.scene.start('pantalla_preguntas', escenaAnterior)
                break
            // Opción Cancelar
            case cursors.acciones.confirmar.isDown && opcionSeleccionada == 2 || cursors.acciones.cacelar.isDown:
                this.timer.remove()
                this.scene.start(escenaAnterior.key, { entrada: 'vendedor', posicion: escenaAnterior.posicion })
                break
        }
    }

    update () {

    }
}