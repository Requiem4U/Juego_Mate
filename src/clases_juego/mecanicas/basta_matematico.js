
let matrizOperaciones = [[], [], [], []]
let matrizRectangulos = [[], [], [], []]
let operaciones = ['+', '-', '×', '÷', '√', '²']
let posicionMatriz = { col: 1, fila: 1 }
let valorActual
let operacionesPresentadas = []
let filas, columnas

export default class Basta_Matematico {
    constructor(escena, numFilas = 4, numColumnas = 5) {
        this.escena = escena
        filas = numFilas
        columnas = numColumnas
    }

    crearMatriz ({
        width = this.escena.game.canvas.width,
        height = this.escena.game.canvas.height
    } = {}) {
        const x = width * 0.13
        const y = height * 0.175

        for (let col = 0; col < columnas; col++) {
            let num = Math.floor(Math.random() * (100 * col - 100 * (col - 1) + 1)) + 100 * (col - 1)
            let operacion = operaciones[Math.floor(Math.random() * 6)]
            let texto = operacion == '√' ? '√x' : operacion == '²' ? 'x' + operacion : operacion + num
            let varX = x + width * 0.04 * (col * 4 + 1)

            matrizRectangulos[0].push(this.escena.add.rectangle(varX, y + height * 0.06, 200, 100, 0xBE4C33).setOrigin(0.5))
            if (col > 0) {
                operacionesPresentadas.push(operacion == '√' ? '√' : operacion == '²' ? operacion : operacion + num)

                matrizOperaciones[0].push(this.escena.add.text(varX, y + height * 0.06, texto, {
                    fontFamily: 'Arial',
                    fontSize: 34,
                    color: '#ffffff' // Color gris por defecto
                }))
                matrizOperaciones[0][col].setOrigin(0.5)
            } else {
                matrizOperaciones[0].push(this.escena.add.text(varX, y + height * 0.06, 'Número\nInicial', {
                    fontFamily: 'Arial',
                    fontSize: 30,
                    color: '#ffffff', // Color gris por defecto
                    align: 'center'
                }))
                matrizOperaciones[0][col].setOrigin(0.5)
            }
        }

        for (let fila = 1; fila < filas; fila++) {
            let varY = y + height * 0.06 * (fila * 3 + 1)

            let num = Math.floor(Math.random() * (333 * fila - 333 * (fila - 1) + 1)) + 333 * (fila - 1)

            matrizRectangulos[fila].push(this.escena.add.rectangle(x + width * 0.04, varY, 200, 100, 0xF1C0B5).setOrigin(0.5))
            matrizOperaciones[fila].push(this.escena.add.text(x + width * 0.04, varY, num, {
                fontFamily: 'Arial',
                fontSize: 34,
                color: '#2c2c2c' // Color gris por defecto
            }))
            matrizOperaciones[fila][0].setOrigin(0.5)

            for (let col = 1; col < columnas; col++) {
                let varX = x + width * 0.04 * (col * 4 + 1)

                matrizRectangulos[fila].push(this.escena.add.rectangle(varX, varY, 200, 100, 0xABA271).setOrigin(0.5))
                matrizOperaciones[fila].push(this.escena.add.text(varX, varY, '', {
                    fontFamily: 'Arial',
                    fontSize: 34,
                    color: '#ffffff' // Color gris por defecto
                }))
                matrizOperaciones[fila][col].setOrigin(0.5)

            }
        }

        return { matrizOperaciones, matrizRectangulos }
    }

    comprobarRespuesta (respuesta, fila) {
        let respAux = Number.parseInt(matrizOperaciones[fila][0].text)
        console.log(respAux)

        for (let col = 0; col < columnas - 1; col++) {
            switch (operacionesPresentadas[col][0]) {
                case '√':
                    respAux = Number.parseFloat((Math.sqrt(respAux)).toFixed(2))
                    console.log('√', respAux)
                    break
                case '²':
                    respAux = Number.parseFloat((Math.pow(respAux, 2)).toFixed(2))
                    console.log('²', respAux)
                    break
                case '÷':
                    respAux = Number.parseFloat((respAux / Number.parseInt(operacionesPresentadas[col].slice(1))).toFixed(2))
                    console.log('÷', respAux)
                    break
                case '×':
                    respAux = Number.parseFloat((respAux * Number.parseInt(operacionesPresentadas[col].slice(1))).toFixed(2))
                    console.log('×', respAux)
                    break
                case '+':
                    respAux = Number.parseFloat((respAux + Number.parseInt(operacionesPresentadas[col].slice(1))).toFixed(2))
                    console.log('+', respAux)
                    break
                case '-':
                    respAux = Number.parseFloat((respAux - Number.parseInt(operacionesPresentadas[col].slice(1))).toFixed(2))
                    console.log('-', respAux)
                    break
            }
        }

        return respAux == respuesta
    }
}