import Phaser from "phaser";
import { repeticionAnimacion } from "../manejadores/manejador_timers_eventos";

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

// Estilo de texto
let style = undefined

let configTimer = { parpadeo: undefined, animacion: { vendedor: undefined, canasta: undefined } }


const bd = {
    contexto: 'Pancho quiere construir su casa, pero necesita saber el área que dispone.' +
        'Tiene un terreno rectangular de 20 metros de largo y 15 metros de ancho.',
    respQuien: 'Pancho',
    respQue: 'área',
    respOperaciones: 'multiplicación',
    respProblema: '300'
}

let texto = bd.contexto

let preguntas = [
    {
        pregunta: '¿De quién se habla en el problema?',
        respuesta: bd.respQuien,
        areaTexto: undefined
    },
    {
        pregunta: '¿De qué se habla en el problema?',
        respuesta: bd.respQue,
        areaTexto: undefined
    },
    {
        pregunta: '¿Qué operaciones deberia hacer para resolver el problema?',
        respuesta: bd.respOperaciones,
        areaTexto: undefined
    },
    {
        pregunta: '¿Cuál es su área total en metros cuadrados?',
        respuesta: bd.respOperaciones,
        areaTexto: undefined
    },
]

let respuestas
let posicionPregunta = 0

export class Pantalla_Preguntas extends Phaser.Scene {

    constructor() {
        super({ key: 'pantalla_preguntas' })
    }

    preload () {
    }

    create () {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D');
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.idle_vendedor_pp = this.add.sprite(posicion.x * 0.25, posicion.y * 0.4, '_sprite_vendedor_tienda').setScale(3, 3)
        this.canasta = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_cesta_vendedor').setScale(3.5, 3.5)
        this.ojos_gato = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_ojos_gato').setScale(3.5, 3.5)

        this.add.image(posicion.x / 2, posicion.y / 2, '_fondo_vegetacion').setScale(0.8, 1).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.8, '_banner_dialogos').setAlpha(0.7).setScale(0.8, 1).setDepth(1)
        this.add.image(posicion.x * 0.75, posicion.y * 0.35, '_banner_contextos').setScale(0.8, 0.8).setDepth(1)

        this.idle_vendedor_pp.anims.play('idle_vendedro_tienda')
        this.canasta.anims.play('idle_cesta')



        this.add.text(posicion.x * 0.75, posicion.y * 0.35, texto, {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
            wordWrap: { width: 525, useAdvancedWrap: true }
        }).setOrigin(0.5).setDepth(2)

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


        for (let i = 0; i < 3; i++) {
            preguntas[i].areaTexto = this.add.text(posicion.x * 0.1, posicion.y * 0.71, preguntas[i].pregunta, {
                fontFamily: 'Arial',
                fontSize: 36,
                fill: 'white',
                wordWrap: { width: posicion.x * 0.8, useAdvancedWrap: true }
            }).setDepth(2)
            preguntas[i].areaTexto.visible = false
        }

        preguntas[posicionPregunta].areaTexto.visible = true

        respuestas = this.add.text(posicion.x * 0.1, posicion.y * 0.8, '', {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
            wordWrap: { width: 525, useAdvancedWrap: true }
        }).setDepth(2)

        this.input.keyboard.on('keyup', function (event) {
            if (event.key == 'Enter') {
                if (respuestas.text == preguntas[posicionPregunta].respuesta) {

                    if (posicionPregunta < 3) {
                        preguntas[posicionPregunta++].areaTexto.visible = false
                        preguntas[posicionPregunta].areaTexto.visible = true
                        respuestas.text = ''
                    }
                } else {
                    respuestas.text = 'La respuesta fue incorrecta. intentalo de numevo'
                }
            }
            if (esTeclaPermitida(event.key)) {
                respuestas.text += event.key
            }

            if (event.key == 'Backspace') respuestas.text = respuestas.text.slice(0, -1)
        })

    }

    update () {

    }


}


function esTeclaPermitida (tecla, inputTypeNumerico = false) {
    // Expresión regular que permite letras, números y algunos signos de puntuación específicos
    let regex

    if (inputTypeNumerico) {
        regex = /^[0-9 +*/-]$/
    } else {
        regex = /^[A-Za-z.,;:¡!¿? ]$/
    }

    // Comprueba si la tecla presionada cumple con la expresión regular
    return regex.test(tecla);
}