import Phaser from "phaser";
import { repeticionAnimacion } from "../manejadores/manejador_timers_eventos";
import { BD } from "../manejadores/conexionBD";
import { apiUrl } from "../inicio/configuracion_general";

// Cursores de selección
let cursors = {
    movimiento: { flechas: undefined },
    acciones: { confirmar: undefined, calcelar: undefined }
}

// Estilo de texto
let style = undefined

let configTimer = { parpadeo: undefined, animacion: { vendedor: undefined, canasta: undefined } }


const bd = []
let bdAux
let pregunta
let texto
let preguntas

let matrizRespuestas
let posicionPregunta
let posicionRespuesta
let seleccionRespuestaActiva

let escenaOrigen

export class Pantalla_Preguntas extends Phaser.Scene {

    constructor() {
        super({ key: 'pantalla_preguntas' })
    }

    init (data) {
        if (data)
            escenaOrigen = data
    }

    preload () {
    }

    create () {
        if (!bdAux) {
            fetch(apiUrl + '/api/vendedor-preguntas'
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        data.data.forEach(element => {
                            bd.push({
                                contexto: element.attributes.contexto,
                                respQuien: element.attributes.quien,
                                respQue: element.attributes.que,
                                respOperaciones: element.attributes.operaciones,
                                preguntaProblema: element.attributes.pregunta,
                                respProblema: element.attributes.resultado
                            })
                        });

                        bdAux = [...bd]
                        pregunta = obtenerPreguntaAleatoria()
                        texto = pregunta.contexto
                        preguntas = [
                            {
                                pregunta: '¿De quién se habla en el problema?',
                                respuestas: pregunta.respQuien.split(','),
                                respuesta: pregunta.respQuien.split(',')[0],
                                areaTexto: undefined
                            },
                            {
                                pregunta: '¿De qué se habla en el problema?',
                                respuestas: pregunta.respQue.split(','),
                                respuesta: pregunta.respQue.split(',')[0],
                                areaTexto: undefined
                            },
                            {
                                pregunta: '¿Qué operaciones deberia hacer para resolver el problema?',
                                respuestas: pregunta.respOperaciones.split(','),
                                respuesta: pregunta.respOperaciones.split(',')[0],
                                areaTexto: undefined
                            },
                            {
                                pregunta: pregunta.preguntaProblema,
                                respuestas: pregunta.respProblema.split(','),
                                respuesta: pregunta.respProblema.split(',')[0],
                                areaTexto: undefined
                            },
                        ]
                        this.crearEscena()
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Manejar errores de autenticación
                });
        } else {
            pregunta = obtenerPreguntaAleatoria()
            texto = pregunta.contexto
            preguntas = [
                {
                    pregunta: '¿De quién se habla en el problema?',
                    respuestas: pregunta.respQuien.split(','),
                    respuesta: pregunta.respQuien.split(',')[0],
                    areaTexto: undefined
                },
                {
                    pregunta: '¿De qué se habla en el problema?',
                    respuestas: pregunta.respQue.split(','),
                    respuesta: pregunta.respQue.split(',')[0],
                    areaTexto: undefined
                },
                {
                    pregunta: '¿Qué operaciones deberia hacer para resolver el problema?',
                    respuestas: pregunta.respOperaciones.split(','),
                    respuesta: pregunta.respOperaciones.split(',')[0],
                    areaTexto: undefined
                },
                {
                    pregunta: pregunta.preguntaProblema,
                    respuestas: pregunta.respProblema.split(','),
                    respuesta: pregunta.respProblema.split(',')[0],
                    areaTexto: undefined
                },
            ]
            this.crearEscena()
        }

    }

    update () {

    }

    crearEscena () {
        seleccionRespuestaActiva = false
        posicionPregunta = 0
        posicionRespuesta = 0

        let posicion = { x: this.game.canvas.width, y: this.game.canvas.height }

        this.idle_vendedor_pp = this.add.sprite(posicion.x * 0.25, posicion.y * 0.4, '_sprite_vendedor_tienda').setScale(3, 3)
        this.canasta = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_cesta_vendedor').setScale(3.5, 3.5)
        this.ojos_gato = this.add.sprite(posicion.x * 0.25, posicion.y * 0.36, '_sprite_ojos_gato').setScale(3.5, 3.5)

        this.add.image(posicion.x / 2, posicion.y / 2, '_fondo_vendedor_tienda').setScale(0.8, 1).setDepth(-1)
        this.add.image(posicion.x / 2, posicion.y * 0.82, '_banner_dialogos').setScale(0.8, 1.1).setDepth(1)
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


        for (let i = 0; i <= 3; i++) {
            preguntas[i].areaTexto = this.add.text(posicion.x * 0.1, posicion.y * 0.71, preguntas[i].pregunta, {
                fontFamily: 'Arial',
                fontSize: 36,
                fill: 'white',
                wordWrap: { width: posicion.x * 0.8, useAdvancedWrap: true }
            }).setDepth(2)
            preguntas[i].areaTexto.visible = false
        }

        preguntas[posicionPregunta].areaTexto.visible = true

        matrizRespuestas = crearMatrizRespuestas(this, acomodarRespuestas(preguntas[0].respuestas))
        matrizRespuestas[posicionRespuesta].setColor('#FFFFFF')

        this.retro = { texto: undefined, background: undefined }
        this.retro.texto = this.add.text(posicion.x * 0.13, posicion.y * 0.77, 'La respuesta ha sido incorrecta.\nAnaliza de nuevo el problema e intentalo de nuevo', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#FFFFFF',
        }).setOrigin(0).setDepth(7)
        this.retro.texto.visible = false
        this.retro.background = this.add.image(posicion.x / 2, posicion.y * 0.82, '_banner_dialogos').setScale(0.8, 1.1).setDepth(6)
        this.retro.background.visible = false

        this.input.keyboard.on('keyup', function (event) {
            if (seleccionRespuestaActiva) {
                switch (true) {
                    case event.key == 'ArrowLeft':
                        matrizRespuestas[posicionRespuesta].setColor('#cacaca')
                        if (posicionRespuesta <= 0) {
                            posicionRespuesta = 3
                        } else {
                            posicionRespuesta -= 1
                        }
                        matrizRespuestas[posicionRespuesta].setColor('#FFFFFF')
                        break
                    case event.key == 'ArrowRight':
                        matrizRespuestas[posicionRespuesta].setColor('#cacaca')
                        if (posicionRespuesta >= 3) {
                            posicionRespuesta = 0
                        } else {
                            posicionRespuesta += 1
                        }
                        matrizRespuestas[posicionRespuesta].setColor('#FFFFFF')
                        break
                    case event.key == 'Enter':
                        if (matrizRespuestas[posicionRespuesta].text.split(') ')[1] == preguntas[posicionPregunta].respuesta) {
                            if (posicionPregunta < 3) {
                                seleccionRespuestaActiva = false

                                preguntas[posicionPregunta++].areaTexto.visible = false
                                preguntas[posicionPregunta].areaTexto.visible = true
                                actualizaRespuestas(acomodarRespuestas(preguntas[posicionPregunta].respuestas), matrizRespuestas)
                                posicionRespuesta = 0
                                matrizRespuestas.forEach((resp) => {
                                    resp.setColor('#cacaca')
                                })
                                matrizRespuestas[posicionRespuesta].setColor('#ffffff')

                                this.time.delayedCall(2000, () => { seleccionRespuestaActiva = true })
                            } else {
                                this.retro.texto.text = '¡¡¡Felicidades!!! Haz logrado resolver todo correctamente.'
                                this.retro.texto.visible = true
                                this.retro.background.visible = true
                                this.time.delayedCall(4000, () => {
                                    this.scene.start('vendedor_pantalla_principal', escenaOrigen)
                                })
                            }
                        } else {
                            seleccionRespuestaActiva = false
                            this.retro.texto.visible = true
                            this.retro.background.visible = true
                            actualizaRespuestas(acomodarRespuestas(preguntas[posicionPregunta].respuestas), matrizRespuestas)
                            this.time.delayedCall(4000, () => {
                                seleccionRespuestaActiva = true
                                this.retro.background.visible = false
                                this.retro.texto.visible = false
                            })
                        }
                        break
                    case event.key == 'Escape':
                        this.scene.start('vendedor_pantalla_principal', escenaOrigen)
                        break

                }
            }
        }, this)

        this.time.delayedCall(4000, () => { seleccionRespuestaActiva = true })
    }

}


function crearMatrizRespuestas (escena, listaRespuestas) {
    const width = escena.game.canvas.width
    const height = escena.game.canvas.height

    const x = width * 0.08

    let matrizRespuestas = []

    for (let i = 0; i <= 3; i++) {
        let varX = x + width * 0.05 * (i * 4 + 1)
        matrizRespuestas.push(escena.add.text(varX, height * 0.89, i + 1 + ') ' + listaRespuestas[i], {
            fontFamily: 'Arial',
            fontSize: 30,
            color: '#cacaca',
            align: 'left',
            wordWrap: { width: 220, useAdvancedWrap: true },
        }).setOrigin(0, 0.5).setDepth(3))
    }

    return matrizRespuestas

}

function acomodarRespuestas (listaRespuestas) {
    let lista = listaRespuestas
    let indiceActual = listaRespuestas.length;
    let valorTemp, indiceRandom;

    // Mientras haya elementos para mezclar
    while (indiceActual !== 0) {
        // Seleccionar un elemento restante
        indiceRandom = Math.floor(Math.random() * indiceActual);
        indiceActual--;

        // Intercambiar con el elemento actual
        valorTemp = lista[indiceActual];
        lista[indiceActual] = lista[indiceRandom];
        lista[indiceRandom] = valorTemp;
    }

    return lista;
}

function actualizaRespuestas (listaRespuestas, areasRespuestas) {
    for (let i = 0; i <= 3; i++) {
        areasRespuestas[i].text = i + 1 + ') ' + listaRespuestas[i]
    }
}

function obtenerPreguntaAleatoria () {
    let i
    let pregunta
    if (bdAux.length != 0) {
        i = Math.floor(Math.random() * bdAux.length)
        pregunta = bdAux[i]
        bdAux.splice(i, 1)
    } else {
        bdAux = [...bd]
        console.log(bdAux)
        i = Math.floor(Math.random() * bdAux.length)
        pregunta = bdAux[i]
        bdAux.splice(i, 1)
    }
    return pregunta
}