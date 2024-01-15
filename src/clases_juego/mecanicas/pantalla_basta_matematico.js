import Phaser from "phaser";
import Basta_Matematico from "./basta_matematico";


let matrizOperaciones, matrizRectangulos
let posicionMatriz
let valorActual
let respuestasCorrectas
let primeraVez = true
let pasarInstruccion = false
let introResp = false
let listaInstrucciones

export class Pantalla_Basta_Matematico extends Phaser.Scene {

    constructor() {
        super({ key: 'basta_matematico' });
    }

    preload () {
    }

    create () {
        matrizOperaciones = undefined
        matrizRectangulos = undefined
        posicionMatriz = { col: 1, fila: 1 }
        respuestasCorrectas = 0
        listaInstrucciones = []

        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        this.add.text(80, 60, 'Presiona ESC para salir', {
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0).setDepth(1)

        let a

        if (primeraVez) {
            listaInstrucciones.push(this.add.image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                '_instruccion_basta_4'
            ).setOrigin(0.5).setScale(0.756).setDepth(1))

            listaInstrucciones.push(this.add.image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                '_instruccion_basta_3'
            ).setOrigin(0.5).setScale(0.756).setDepth(1))

            listaInstrucciones.push(this.add.image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                '_instruccion_basta_2'
            ).setOrigin(0.5).setScale(0.756).setDepth(1))

            listaInstrucciones.push(this.add.image(
                this.game.canvas.width / 2,
                this.game.canvas.height / 2,
                '_instruccion_basta_1'
            ).setOrigin(0.5).setScale(0.756).setDepth(1))

            this.time.delayedCall(2000, () => { pasarInstruccion = true }, [], this)

            this.basta = new Basta_Matematico(this)
            a = this.basta.crearMatriz()

        } else {
            a = this.basta.crearMatriz()
            this.time.delayedCall(2000, () => { introResp = true }, [], this)
        }

        matrizOperaciones = a.matrizOperaciones
        matrizRectangulos = a.matrizRectangulos
        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
        console.log(valorActual.text)

        this.input.keyboard.on('keyup', function (event) {
            switch (true) {
                case event.key === 'ArrowDown':
                    if (posicionMatriz.fila < matrizOperaciones.length - 1) {
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xABA271
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0xf6f6f6)
                        posicionMatriz.fila++
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
                        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
                    }
                    break
                case event.key === 'ArrowUp':
                    if (posicionMatriz.fila > 1) {
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xABA271
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0xf6f6f6)
                        posicionMatriz.fila--
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
                        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
                    }
                    break
                case event.key === 'ArrowLeft':
                    if (posicionMatriz.col > 1) {
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xABA271
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0xf6f6f6)
                        posicionMatriz.col--
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
                        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
                    }
                    break
                case event.key === 'ArrowRight':
                    if (posicionMatriz.col < matrizOperaciones[posicionMatriz.fila].length - 1) {
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xABA271
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0xf6f6f6)
                        posicionMatriz.col++
                        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
                        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
                        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
                    }
                    break
                case event.key === 'Backspace':
                    valorActual.text = valorActual.text.slice(0, -1)
                    break
            }
        })

        let posInstruc = 3

        this.input.keyboard.on('keyup', (event) => {
            if (esTeclaPermitida(event.key, true)) {
                numerosLimite(valorActual, event.key);
            }
            if (!primeraVez) {
                if (introResp) {
                    if (event.key === 'Enter') {
                        introResp = false
                        const respuestaUsuario = valorActual.text;

                        const filaActual = matrizOperaciones.findIndex(fila => fila.includes(valorActual));
                        const columnaActual = matrizOperaciones[posicionMatriz.fila].indexOf(valorActual);

                        console.log(`Fila: ${filaActual}, Columna: ${columnaActual}, Valor: ${respuestaUsuario}`);

                        let esRespuestaCorrecta

                        if (respuestasCorrectas % 4 == 0 || respuestasCorrectas < 1) {
                            esRespuestaCorrecta = this.basta.comprobarRespuesta(respuestaUsuario, filaActual, columnaActual, true);
                        } else {
                            esRespuestaCorrecta = this.basta.comprobarRespuesta(respuestaUsuario, filaActual, columnaActual);
                        }

                        if (esRespuestaCorrecta) {
                            console.log('Respuesta correcta');
                            matrizRectangulos[filaActual][columnaActual].fillColor = 0x00FF00;
                            respuestasCorrectas++;
                            if (respuestasCorrectas == 12) {
                                console.log('¡Todas las respuestas correctas!');
                                this.scene.start('vendedor_pantalla_principal');
                            }
                        } else {
                            console.log('Respuesta incorrecta');
                            matrizRectangulos[filaActual][columnaActual].fillColor = 0xFF0000;
                        }

                        this.time.delayedCall(2000, () => { introResp = true }, [], this)
                    } else if (event.key === 'Escape') {
                        this.scene.start('vendedor_pantalla_principal');
                    }
                }
            } else {
                if (pasarInstruccion) {
                    pasarInstruccion = false
                    if (posInstruc >= 0) {
                        listaInstrucciones[posInstruc--].visible = false
                        this.time.delayedCall(2000, () => { pasarInstruccion = true }, [], this)
                    } else {
                        pasarInstruccion = false
                        primeraVez = false
                        this.time.delayedCall(1000, () => { introResp = true }, [], this)

                    }
                }
            }
        });
    }

    update () {

    }
}

function esTeclaPermitida (tecla, inputTypeNumerico = false) {
    // Expresión regular que permite letras, números y algunos signos de puntuación específicos
    let regex

    if (inputTypeNumerico) {
        regex = /^[0-9 +*/.-]$/
    } else {
        regex = /^[A-Za-z.,;:¡!¿? ]$/
    }

    // Comprueba si la tecla presionada cumple con la expresión regular
    return regex.test(tecla);
}

function numerosLimite (textoObjeto, caracter) {
    let medidaLinea = textoObjeto.text.length;

    if (medidaLinea == 9) {
        textoObjeto.text = caracter
    } else if (medidaLinea < 9) {
        textoObjeto.text += caracter
    }
}
