import Phaser from "phaser";
import Basta_Matematico from "./basta_matematico";

let grafico
let matrizOperaciones, matrizRectangulos
let posicionMatriz = { col: 1, fila: 1 }
let valorActual

export class Pantalla_Basta_Matematico extends Phaser.Scene {

    constructor() {
        super({ key: 'basta_matematico' });
    }

    preload () {
    }

    create () {

        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        this.basta = new Basta_Matematico(this)
        const a = this.basta.crearMatriz()
        matrizOperaciones = a.matrizOperaciones
        matrizRectangulos = a.matrizRectangulos

        matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0xE7DDA3
        matrizOperaciones[posicionMatriz.fila][posicionMatriz.col].setTint(0x2c2c2c)
        valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]

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

        this.input.keyboard.on('keyup', function (event) {
            if (esTeclaPermitida(event.key, true)) {
                numerosLimite(valorActual, event.key)
            }
        })


        console.log(this.basta.comprobarRespuesta('10', 1))
        console.log(matrizOperaciones[0].length)
    }

    update () {
        if (matrizOperaciones) { }
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

function numerosLimite (textoObjeto, caracter) {
    let medidaLinea = textoObjeto.text.length;

    if (medidaLinea == 4) {
        textoObjeto.text = caracter
    } else if (medidaLinea < 4) {
        textoObjeto.text += caracter
    }
}