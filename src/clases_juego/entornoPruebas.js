import Phaser from "phaser";
import { ajustarAreaColision, crearAnimacion, crearGrupoElementos } from "./manejadores/manejador_elementos_escena";
import { Manejador_Movimiento } from "./manejadores/manejador_movimientos";
import Basta_Matematico from "./mecanicas/basta_matematico";

let textoUsuario
let areaNumerica;
let areaTexto;
let textoUsuarioNumerico;
let textoUsuarioTexto;
let inputActivo = 'numerico'
const limiteCaracteresPorLinea = 5
let limiteLineas = 4
let grafico

let posicionMatriz = { col: 1, fila: 1 }
let valorActual

export class Juego extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload () {
  }

  create () {
    this.Movimientos = new Manejador_Movimiento(this)

    let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }

    this.add.image(posicion.x, posicion.y, '_fondo_vegetacion').setDepth(-1)

    this.grupo1 = crearGrupoElementos(this, '_arbol_1', { repeticiones: 2, cellWidth: 4 })

    this.idle = this.physics.add.sprite(posicion.x * 0.6, posicion.y * 0.8, '_sprites_mujer').setImmovable().setScale(3)
    this._sprite_vendedor = this.physics.add.sprite(posicion.x * 1.6, posicion.y * 0.8, '_sprite_vendedor').setOrigin(0.48, 0.35).setScale(1.25, 1.25).setImmovable()
    this.player = this.physics.add.sprite(posicion.x, posicion.y, '_sprites_hombre')
    this.idle_dialogo = this.add.sprite(this._sprite_vendedor.x, this._sprite_vendedor.y, '_sprite_globo_dialogo').setOrigin(0.5, 1).setScale(0.8)

    crearAnimacion(this, '_sprites_mujer', '_idle_mujer', 16, 19, { frecuencia_frames: 2.1 })

    // Ceación de animaciones de caminata
    crearAnimacion(this, '_sprites_hombre', 'walkDown', 0, 3);
    crearAnimacion(this, '_sprites_hombre', 'walkUp', 4, 7);
    crearAnimacion(this, '_sprites_hombre', 'walkLeft', 8, 11);
    crearAnimacion(this, '_sprites_hombre', 'walkRight', 12, 15);
    //Creación de animación Idle
    crearAnimacion(this, '_sprites_hombre', 'idleFront', 16, 19, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleBack', 20, 23, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleLeft', 24, 27, { frecuencia_frames: 2.1 });
    crearAnimacion(this, '_sprites_hombre', 'idleRight', 28, 31, { frecuencia_frames: 2.1 });

    crearAnimacion(this, '_sprite_vendedor', 'idle_vendedor_estandar', 0, 9, { frecuencia_frames: 5 });

    this._sprite_vendedor.anims.play('idle_vendedor_estandar')
    this.idle_dialogo.visible = false

    this.physics.world.enable(this.player);
    this.player.setCollideWorldBounds(true);

    this.physics.world.enable(this.grupo1)

    this.physics.add.collider(this.player, this.grupo1, () => { console.log(1) }, null, this)

    ajustarAreaColision(this.player, { sizeX: 0.28125, sizeY: 0.1875, offsetX: 0.375, offsetY: 0.578125 })
    ajustarAreaColision(this.idle, { sizeX: 0.28125, sizeY: 0.1875, offsetX: 0.375, offsetY: 0.578125 })

    this.g = false

    this.physics.add.overlap(this.player, this._sprite_vendedor, () => {
      this.g = true
    }, null, this)

    this.idle.anims.play('_idle_mujer')

    this.timer = this.time.addEvent({
      delay: 10,
      callback: () => {
        if (this.g) {
          if (!this.idle_dialogo.anims.isPlaying) {
            this.idle_dialogo.visible = true
            this.idle_dialogo.anims.play('idle_dialogo')
            this.g = false
          } else {
            this.g = false
          }
        } else {
          if (!this.idle_dialogo.anims.isPlaying) {
            this.idle_dialogo.visible = false
            this.idle_dialogo.anims.stop()
          }
        }
      },
      callbackScope: this,
      loop: true
    })

    textoUsuario = this.add.text(posicion.x, posicion.y * 1.8, 'Texto: ', {
      fontFamily: 'Arial',
      fontSize: 34,
      color: '#ffffff'
    })
    textoUsuario.setOrigin(0.5)

    this.input.keyboard.on('keyup', function (event) {
      if (event.key === 'Enter') {
        // Se presionó la tecla Enter, puedes hacer algo con el texto ingresado
        let textoIngresado = textoUsuario.text.substring(7); // Elimina 'Texto: ' del inicio
        console.log('Texto ingresado:', textoIngresado);

        // Puedes hacer más cosas con el texto, como reiniciar el texto del objeto
        textoUsuario.text = 'Texto: ';
      } else {
        // Se presionó una tecla alfanumérica, agrégala al texto
        textoUsuario.text += event.key;
      }
    })

    grafico = this.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xffffff
      }
    })

    areaNumerica = this.add.rectangle(200, 200, 200, 100);
    areaTexto = this.add.rectangle(400, 200, 200, 100);

    grafico.strokeRectShape(areaNumerica)

    // Crea objetos de texto para mostrar el texto ingresado
    textoUsuarioNumerico = this.add.text(areaNumerica.x, areaNumerica.y, '', {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff'
    });

    textoUsuarioTexto = this.add.text(areaTexto.x, areaTexto.y, '', {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#808080' // Color gris por defecto
    });


    // Configura eventos de teclado
    this.input.keyboard.on('keyup', function (event) {

      switch (true) {
        case event.key === 'Enter' && inputActivo === 'numerico':
          textoUsuarioNumerico.text += '\n'
          break
        case event.key === 'Enter' && inputActivo === 'texto':
          textoUsuarioTexto.text += '\n'
          break
        case event.key === 'Backspace' && inputActivo === 'numerico':
          if (textoUsuarioNumerico.text[textoUsuarioNumerico.text.length - 2] === '\n') {
            textoUsuarioNumerico.text = textoUsuarioNumerico.text.slice(0, -2)
          } else {
            textoUsuarioNumerico.text = textoUsuarioNumerico.text.slice(0, -1)
          }
          break
        case event.key === 'Backspace' && inputActivo === 'texto':
          if (textoUsuarioTexto.text[textoUsuarioTexto.text.length - 2] === '\n') {
            textoUsuarioTexto.text = textoUsuarioTexto.text.slice(0, -2)
          } else {
            textoUsuarioTexto.text = textoUsuarioTexto.text.slice(0, -1)
          }
          break
        case inputActivo === 'texto' && esTeclaPermitida(event.key):
          agregarTextoConLimite(textoUsuarioTexto, event.key)
          break
        case inputActivo === 'numerico' && esTeclaPermitida(event.key, true):
          agregarTextoConLimite(textoUsuarioNumerico, event.key)
          break
        case event.key === 'ArrowLeft':
          inputActivo = 'numerico'
          cambiarAreaSeleccionada(textoUsuarioNumerico, textoUsuarioTexto, areaNumerica)
          textoUsuarioNumerico.setColor('#ffffff')
          textoUsuarioTexto.setColor('#808080')
          grafico.strokeRectShape(areaNumerica)
          break
        case event.key === 'ArrowRight':
          inputActivo = 'texto'
          cambiarAreaSeleccionada(textoUsuarioTexto, textoUsuarioNumerico, areaTexto)
          break
      }

    })

    this.basta = new Basta_Matematico(this)

    // Creación de la matriz de numeros y operaciones
    let { matrizOperaciones, matrizRectangulos } = this.basta.crearMatriz()

    matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x000000
    valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]

    this.input.keyboard.on('keyup', function (event) {
      switch (true) {
        case event.key === 'ArrowDown':
          if (posicionMatriz.fila < matrizOperaciones.length - 1) {
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x808080
            posicionMatriz.fila++
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x000000
            valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
          }
          break
        case event.key === 'ArrowUp':
          if (posicionMatriz.fila > 1) {
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x808080
            posicionMatriz.fila--
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x000000
            valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
          }
          break
        case event.key === 'ArrowLeft':
          if (posicionMatriz.col > 1) {
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x808080
            posicionMatriz.col--
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x000000
            valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
          }
          break
        case event.key === 'ArrowRight':
          if (posicionMatriz.col < matrizOperaciones[posicionMatriz.fila].length - 1) {
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x808080
            posicionMatriz.col++
            matrizRectangulos[posicionMatriz.fila][posicionMatriz.col].fillColor = 0x000000
            valorActual = matrizOperaciones[posicionMatriz.fila][posicionMatriz.col]
          }
          break
        case event.key === 'Backspace':
          valorActual.text = valorActual.text.slice(0, -1)
          break
      }
    })

    this.input.keyboard.on('keyup', function (event) {
      console.log(esTeclaPermitida(event.key, true))
      if (esTeclaPermitida(event.key, true)) {
        numerosLimite(valorActual, event.key)
      }
    })


    console.log(this.basta.comprobarRespuesta('10', 1))

    moverPersonajeAnimado(this, this.idle, this.idle.x, this.idle.y, this.idle.x + 100, this.idle.y + 100, 3000, 'walkDown_mujer')
  }

  update () {

    this.player.setVelocity(0);

    this.Movimientos.movimientoPersonaje(this.player)

    if (this.player.y > this.idle.y) {
      this.player.setDepth(1)
      this.idle.setDepth(0)
    } else {
      this.player.setDepth(0)
      this.idle.setDepth(1)
    }

  }
}

function manejadorMovimientoJugador (player, velocityX, velocityY, animationKey) {
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
  player.anims.play(animationKey, true);
}

function manejadorAnimacionIdle (player, animacionIdle) {
  player.anims.play(animacionIdle, true)
}

function manejarColision (player, obj) {
  console.log(player.y - obj.y)
}

function manejarColisionVendedor (player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_dialogo')
}

function manejarNoColisionVendedor (player, obj) {
  obj.anims.stop()
  obj.anims.play('idle_vendedor_estandar')
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

function agregarTextoConLimite (textoObjeto, caracter) {
  // Agrega el carácter al texto con límite de caracteres por línea
  let textoActual = textoObjeto.text;
  let lineas = textoActual.split('\n');
  let ultimaLinea = lineas[lineas.length - 1];

  if (lineas.length <= limiteLineas) {
    if (ultimaLinea.length < limiteCaracteresPorLinea) {
      textoObjeto.text += caracter
    } else if (ultimaLinea.length == limiteCaracteresPorLinea) {
      textoObjeto.text += '\n'
    }
    else {
      textoObjeto.text += caracter;
    }
  }

}

function numerosLimite (textoObjeto, caracter) {
  let medidaLinea = textoObjeto.text.length;

  if (medidaLinea == 4) {
    textoObjeto.text = caracter
  } else if (medidaLinea < 4) {
    textoObjeto.text += caracter
  }
}

function cambiarAreaSeleccionada (elemSelec, elemDeseles, shape, {
  colorSelec = '#ffffff',
  colorDeselec = '#808080'
} = {}) {
  elemDeseles.setColor(colorDeselec)
  elemSelec.setColor(colorSelec)
  grafico.clear()
  grafico.lineStyle(2, Number.parseInt(colorSelec.substring(1), 16))
  grafico.strokeRectShape(shape)
}

function moverPersonajeAnimado (escena, personaje, x1, y1, x2, y2, duracion, animacion) {
  // Mueve el personaje al punto A (x1, y1) antes de ejecutar la animación
  personaje.x = x1;
  personaje.y = y1;

  // Se ejecuta después de 400 milisegundos
  escena.time.delayedCall(1000, () => {
    // Crea una animación para el movimiento del personaje de (x1, y1) a (x2, y2)
    const tween = escena.tweens.add({
      targets: personaje,
      x: x2,
      y: y2,
      duration: duracion,
      onComplete: () => {
        // La animación ha finalizado
        escena.time.delayedCall(1000, () => {
          // Crea una animación para el movimiento del personaje de (x1, y1) a (x2, y2)
          const tween = escena.tweens.add({
            targets: personaje,
            x: x2 + (x2 - x1),
            y: y1,
            duration: duracion,
            onComplete: () => {
              // La animación ha finalizado
              personaje.anims.play('idleRight_mujer')
            }
          });

          // Ejecutar la animación especificada
          personaje.anims.play('walkUp_mujer');
        });

        personaje.anims.play('idleFront_mujer')
      }
    });

    // Ejecutar la animación especificada
    personaje.anims.play(animacion);
  });
}