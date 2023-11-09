export let velocidad_movimiento_personaje = 200;
export let velocidad_diagonal = velocidad_movimiento_personaje * Math.sqrt(0.4);

let cursoresMovimiento = undefined;
let animaciones = undefined;

let animacionIdleActual = "idleFront";

export class Manejador_Movimiento {
	/**
	 *
	 * @param {Phaser.Scene} escena Escena donde se aplicara el movimiento
	 */
	constructor(escena) {
		this.escena = escena;
		cursoresMovimiento = escena.input.keyboard.addKeys({
			up: "UP",
			left: "LEFT",
			down: "DOWN",
			right: "RIGHT",
		});
		animaciones = {
			idle: {
				front: "idleFront",
				back: "idleBack",
				left: "idleLeft",
				right: "idleRight",
			},
			caminata: {
				up: "walkUp",
				down: "walkDown",
				left: "walkLeft",
				right: "walkRight",
			},
		};
	}

	/**
	 * Crea la logica necesaria para mover al personaje en 8 direcciones
	 *
	 * @param {Phaser.Physics.Arcade.Sprite} personaje Personaje que se quiere mover con los cursores
	 */
	movimientoPersonaje (personaje) {
		// Evaluación de los distinos casos en los que se precionan los botones de movimiento  del teclado)
		switch (true) {
			// Teclas arriba e izquierda  ||  Teclas W  A
			case teclasPresionadas(cursoresMovimiento, cursoresMovimiento.up, cursoresMovimiento.left):
				animacionIdleActual = animaciones.idle.back;
				moverPersonaje(personaje, -velocidad_diagonal, -velocidad_diagonal, animaciones.caminata.up);
				break;

			// Teclas arriba y derecha    ||  Teclas W  D
			case teclasPresionadas(cursoresMovimiento, cursoresMovimiento.up, cursoresMovimiento.right):
				animacionIdleActual = animaciones.idle.back;
				moverPersonaje(personaje, velocidad_diagonal, -velocidad_diagonal, animaciones.caminata.up);
				break;

			// Teclas abajo e izquierda   ||  Teclas S  A
			case teclasPresionadas(cursoresMovimiento, cursoresMovimiento.down, cursoresMovimiento.left):
				animacionIdleActual = animaciones.idle.front;
				moverPersonaje(personaje, -velocidad_diagonal, velocidad_diagonal, animaciones.caminata.down);
				break;

			// Teclas abajo y derecha    ||  Teclas S  D
			case teclasPresionadas(cursoresMovimiento, cursoresMovimiento.down, cursoresMovimiento.right):
				animacionIdleActual = animaciones.idle.front;
				moverPersonaje(personaje, velocidad_diagonal, velocidad_diagonal, animaciones.caminata.down);
				break;

			// Tecla derecha    ||  Tecla D
			case teclaPresionadas(cursoresMovimiento, cursoresMovimiento.right):
				animacionIdleActual = animaciones.idle.right;
				moverPersonaje(personaje, velocidad_movimiento_personaje, 0, animaciones.caminata.right);
				break;

			// Tecla izquierda  ||  Tecla A
			case teclaPresionadas(cursoresMovimiento, cursoresMovimiento.left):
				animacionIdleActual = animaciones.idle.left;
				moverPersonaje(personaje, -velocidad_movimiento_personaje, 0, animaciones.caminata.left);
				break;

			// Tecla abajo      ||  Tecla S
			case teclaPresionadas(cursoresMovimiento, cursoresMovimiento.down):
				animacionIdleActual = animaciones.idle.front;
				moverPersonaje(personaje, 0, velocidad_movimiento_personaje, animaciones.caminata.down);
				break;

			// Tecla arriba     ||  Tecla W
			case teclaPresionadas(cursoresMovimiento, cursoresMovimiento.up):
				animacionIdleActual = animaciones.idle.back;
				moverPersonaje(personaje, 0, -velocidad_movimiento_personaje, animaciones.caminata.up);
				break;

			default: // Ninguna tecla
				personaje.anims.play(animacionIdleActual, true);
		}
	}

	/**
	 * Permite modificar las teclas que se usan para mover al personaje. No se usa la notacion alfanumerica
	 * para las teclas, en su lugar se deben escriir como textos en mayusculas.
	 * Para teclas como espacio, shift, suprimir o borrar se usa SPACE, SHIFT, DELETE y BACKSPACE respectivamente.
	 *
	 * @example
	 * modificarCursoresMovimiento('W', 'A', 'SPACE', 'DELETE')
	 * Define las teclas de movimiento en W (arriba), A (izquierda), espacio/SPACE (abajo), suprimir/DELETE (derecha)
	 *
	 * @param {String} arriba Nombre de la tecla para mover hacia arriba al personaje
	 * @param {String} izquierda Nombre de la tecla para mover hacia la izquierda al personaje
	 * @param {String} abajo Nombre de la tecla para mover hacia abajo al personaje
	 * @param {String} derecha  Nombre de la tecla para mover hacia la derecha al personaje
	 *
	 */
	modificarCursoresMovimiento (arriba, izquierda, abajo, derecha) {
		cursoresMovimiento = undefined;
		cursoresMovimiento = this.escena.input.keyboard.addKeys({
			up: `${arriba}`,
			left: `${izquierda}`,
			down: `${abajo}`,
			right: `${derecha}`,
		});
	}

	/**
	 * Cambia las animaciones que se ejecutan al mover el personaje
	 *
	 * @param {Object } animaciones   Objeto con los nombres de las animacones del personaje
	 *  - **idleFront** :: Nombre de la animacion idle frontal
	 * - **idleBack** ::  Nombre de la animacion idle posterior
	 * - **idleLeft**  :: Nombre de la animacion idle izquierda
	 * - **idleRight** ::  Nombre de la animacion idle derecha
	 * - **walkUp**  :: Nombre de la animacion de caminata hacia arriba
	 * - **walkDown** ::  Nombre de la animacion de caminata hacia abajo
	 * - **walkLeft**  :: Nombre de la animacion de caminata hacia la izquierda
	 * - **walkRight** :: Nombre de la animacion de caminata hacia la derecha
	 *
	 * @param {String} [animaciones.idleFront = 'idleFront']   Nombre de la animacion idle frontal
	 * @param {String} [animaciones.idleBack = 'idleBack']  Nombre de la animacion idle posterior
	 * @param {String} [animaciones.idleLeft = 'idleLeft']  Nombre de la animacion idle izquierda
	 * @param {String} [animaciones.idleRight = 'idleRight']   Nombre de la animacion idle derecha
	 * @param {String} [animaciones.walkUp = 'walkUp']   Nombre de la animacion de caminata hacia arriba
	 * @param {String} [animaciones.walkDown = 'walkDown']   Nombre de la animacion de caminata hacia abajo
	 * @param {String} [animaciones.walkLeft = 'walkLeft']   Nombre de la animacion de caminata hacia la izquierda
	 * @param {String} [animaciones.walkRight = 'walkRight']   Nombre de la animacion de caminata hacia la derecha
	 *
	 */
	definirAnimaciones ({
		idleFront = "idleFront",
		idleBack = "idleBack",
		idleLeft = "idleLeft",
		idleRight = "idleRight",
		walkUp = "walkUp",
		walkDown = "walkDown",
		walkLeft = "walkLeft",
		walkRight = "walkRight",
	}) {

		animacionIdleActual = idleFront

		animaciones.caminata = {
			up: walkUp,
			down: walkDown,
			left: walkLeft,
			right: walkRight,
		};

		animaciones.idle = {
			front: idleFront,
			back: idleBack,
			left: idleLeft,
			right: idleRight,
		};
	}

	/**
	 * Modifica la velocidad a la que se mueve el personaje
	 *
	 * @param {number} velocidad Distancia en pixeles que recorre el personje
	 * - A mayor distancia más rapido se movera el personaje
	 */
	cambiarVelocidadMovimeinto (velocidad) {
		velocidad_movimiento_personaje = velocidad;
	}
}

/**
 *
 * @param {Phaser.Physics.Arcade.Sprite} personaje Sprite del personaje a mover
 * @param {number} velocidadX  Dirección y magnitudad de movimiento en el eje X
 * - Negativo Movimiento hacia la izquierda
 * - 0 Sin movimiento
 * - Positivo Movimiento hacia la derecha
 * @param {number} velocidadY  Dirección y magnitudad de movimiento en el eje Y
 * - Negativo Movimiento hacia arriba
 * - 0 Sin movimiento
 * - Positivo Movimiento hacia abajo
 * @param {string} claveAnimacion Nombre de la animación a ejecutar cuando el personaje se mueva
 */
export function moverPersonaje (personaje, velocidadX, velocidadY, claveAnimacion) {
	personaje.setVelocityX(velocidadX);
	personaje.setVelocityY(velocidadY);
	personaje.anims.play(claveAnimacion, true);
}
/**
 * Verifica si los cursores proporcionados existen, así como
 * que las teclas esten definidas en los cursores y
 * si estas están precionados o no
 *
 * @param {Phaser.Input.Keyboard} cursores
 * @param {string} tecla1 Tecla presionada
 * @param {string} tecla2 Tecla presionada
 * @returns {boolean} true | false
 */
export function teclasPresionadas (cursores, tecla1, tecla2) {
	return cursores && tecla1 && tecla1.isDown && tecla2 && tecla2.isDown;
}

/**
 * Verifica si los cursores proporcionados existen, así como
 * que la tecla este definida en los cursores y
 * si esta está precionados o no
 *
 * @param {Phaser.Input.Keyboard} cursores
 * @param {String} tecla Tecla preionada
 * @returns {boolean} true | false
 */
export function teclaPresionadas (cursores, tecla) {
	return cursores && tecla && tecla.isDown;
}
