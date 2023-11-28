
/**
 * 
 * @param {Phaser.Scene} escena Escena donde se creará la animación
 * @param {string} spriteSheet Nombre de la sprite sheet a usar para crear la animación
 * @param {string} nombre_animacion Nombre con el que se identificara la animación
 * @param {number} frame_inicial Número del frame de la sprite sheet donde inbiciará la animación
 * @param {number} frame_final Número del frame de la sprite sheet donde terminará la animación
 * @param {Object} configuracion Ajusta la cantidad de frtames visusalizados y las veces que se repite la animación
 * @param {number} [configuracion.frecuencia_frames = 8] Cantidad de frames que se muestran en cada repetición.
 * - A mayor canidad de frames indicados más rapida será la animación
 * @param {number} [configuracion.repeticion = -1]   Número de repeticiones de la animación.
 *  - -1 es un loop infinito (por defecto) 
 *  - 0 ejecuta la animación una vez
 *  - Repeticiones mayores a 0, ejecuta la animación el numero de repeticiones indicada más una.
 * @example
 * crearAnimacion(escena, '_sprites_jugador', 'animacion_1', 0, 5, 3, 4)
 * 
 * Crea una animación llamada 'animacion_1' para el sprite sheet '_sprites_jugador' que inicia y 
 * termina en el frame 0 y 5 del sprite sheet respectivamante, la animacion tiene una frecuencia 
 * de 3 frames por iteración y que se repite 5 veces
 * 
 * crearAnimacion(escena, '_sprites_jugador', 'animacion_1', 0, 5)
 * 
 * Crea una animación llamada 'animacion_1' para el sprite sheet '_sprites_jugador' que inicia y 
 * termina en el frame 0 y 5 del sprite sheet respectivamante, la animacion tiene una frecuencia 
 * de 8 frames por iteración y que se repite infinitamente.
 */
export function crearAnimacion (escena, spriteSheet, nombre_animacion, frame_inicial, frame_final,
	{
		frecuencia_frames = 8,
		repeticion = -1
	} = {}) {
	escena.anims.create({
		key: nombre_animacion,
		frames: escena.anims.generateFrameNumbers(spriteSheet, { start: frame_inicial, end: frame_final }),
		frameRate: frecuencia_frames,
		repeat: repeticion
	})
}

/**
 * 
 * @param {Phaser.Scene} escena Escena en la que se colocara el grupo de elementos
 * @param {string} key Nombre del sprite que se usara como imagen
 * @param {Object} alineacion Parametros de alineacion de los objetos 
 * @param {number} [alineacion.repeticiones = 1] Número de objetos en el grupo
 * @param {number} [alineacion.width = 1] Número de objetos colocados horizontalmente
 * @param {number} [alineacion.height = 1] Número de objetos colocados verticalmente
 * @param {number} [alineacion.cellWidth = 100] Ancho en píxeles del área ocupada por el objeto
 * @param {number} [alineacion.cellHeight = 100] Alto en píxeles del área ocupada por el objeto
 * @param {number} [alineacion.posicionX = 100] Posición en el eje X del grupo de objetos dado en píxeles
 * @param {number} [alineacion.posicionY = 100] Posición en el eje Y del grupo de objetos dado en píxeles
 * @param {number} [alineacion.escalaElemento = 1] Escala de cada objeto en el grupo
 * @param {number} [alineacion.origenX = 1] Punto de origen en el eje X del grupo, este punto se toma toma 
 * como referencia para hacer los ajustes de posicionamiento del grupo.
 *  - Toma valores entre 0 y 1
 *  - 0 es la izquierda del grupo
 *  - 1 es la derecha del grupo
 *  - Por defecto toma 0.5 (centro del grupo)
 *  - Los valores superiores a 1 harán que el posiscionamiento sea desde un punto fuera del área del grupo
 * @param {number} [alineacion.origenY = alineacion.origenX] Punto de origen en el eje Y del grupo, este punto se toma toma 
 * como referencia para hacer los ajustes de posicionamiento del grupo.
 *  - Toma valores entre 0 y 1
 *  - 0 es la parte superior del grupo
 *  - 1 es la inferior del grupo
 *  - Por defecto toma el valor de origenX (centro del grupo)
 *  - Los valores superiores a 1 harán que el posiscionamiento sea desde un punto fuera del área del grupo
 * @param {number} [alineacion.sizeWidth = 100] Ancho del área de colisión de cada objeto
 * @param {number} [alineacion.sizeHeight = alineacion.sizeWidth] Alto del área de colisión de cada objeto.
 *  - Por defecto toma el valor de sizeWidth, para hacer un área de colisión cuadrada.
 * 
 * @returns {Phaser.Physics.Arcade.StaticGroup} Un grupo de objetos con fisicas arcade implementadas 
 * y con las parametros de alineación y repetición indicados
 */
export function crearGrupoElementos (escena, key,
	{
		repeticiones = 1,
		width = 1,
		height = 1,
		cellWidth = 100,
		cellHeight = 100,
		posicionX = 100,
		posicionY = 100,
		escalaElemento = 1,
		origenX = 0.5,
		origenY = origenX,
		sizeWidth = 100,
		sizeHeight = sizeWidth
	} = {}) {
	let grupo = escena.physics.add.staticGroup({
		key: key,
		frameQuantity: repeticiones,
		gridAlign: {
			width: width,
			height: height,
			cellWidth: cellWidth,
			cellHeight: cellHeight,
			x: posicionX,
			y: posicionY
		}
	})

	grupo.children.iterate((elemento) => {
		elemento.setScale(escalaElemento)
		elemento.setOrigin(origenX, origenY)
		elemento.setSize(sizeWidth, sizeHeight)
	})

	return grupo
}

/**
 * 
 * @param {Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image} elemento 
 * @param {Object} configuracion Configuarciones de tamaño del área de colison y la psición de esta misma 
 * @param {boolean} [configuracion.porcentaje = true] Indica si los valores estan en expresados como porcentajes del tamaño 
 * del elemento. Por defecto es true.
 * @param {number} [configuracion.sizeX = 1] Ancho del área de colision dada en píxeles o en porcentaje respcto al tamaño del elemwnto
 * @param {number} [configuracion.sizeY = 1] Alto del área de colision dada en píxeles o en porcentaje respcto al tamaño del elemwnto
 * @param {number} [configuracion.offsetX = 0] Posición del áreq de colision respecto al margen derecho del elemento 
 * @param {number} [configuracion.offsetY = 0] Posición del áreq de colision respecto al margen superior del elemento 
 * @returns {Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.Image} El elemto con la sconfiguraciones ya aplicadas
 */
export function ajustarAreaColision (elemento, {
	porcentaje = true,
	sizeX = 1,
	sizeY = 1,
	offsetX = 0,
	offsetY = 0,
} = {}) {

	if (porcentaje) {
		let tamanioElemento = { width: elemento.width, height: elemento.height }

		elemento.setSize(tamanioElemento.width * sizeX, tamanioElemento.height * sizeY)
		elemento.setOffset(tamanioElemento.width * offsetX, tamanioElemento.height * offsetY)
	} else {
		elemento.setSize(sizeX, sizeY)
		elemento.setOffset(offsetX, offsetY)
	}

	return elemento
}

export function generarSalidaEscena (escena, elementoColision, siguienteEscena, {
	posicionX = 100,
	posicionY = posicionX,
	anchoSalida = 100,
	altoSalida = anchoSalida,
	color = 0x000000,
	alfa = 0,
	origenX = 0.5,
	origenY = origenX,
	funcionesExtra = () => { },
	valoresSiguienteEscena = undefined
} = {}) {

	let salida = escena.add.rectangle(posicionX, posicionY, anchoSalida, altoSalida, color, alfa).setOrigin(origenX, origenY)
	escena.physics.world.enable(salida)
	escena.physics.add.collider(elementoColision, salida, () => {
		funcionesExtra
		escena.scene.start(siguienteEscena, valoresSiguienteEscena)
	}, null, escena)

	return salida
}

export function crearPersonaje (escena, sprite, puntoEntrada, {
	escalaPersonaje = 1,
	anchoEscena = escena.game.canvas.width,
	altoEscena = escena.game.canvas.height,
	norteX = anchoEscena * 0.4925,
	norteY = altoEscena * 0.036,
	surX = anchoEscena * 0.4925,
	surY = altoEscena * 0.925,
	esteX = anchoEscena * 0.965,
	esteY = altoEscena * 0.5,
	oesteX = anchoEscena * 0.035,
	oesteY = altoEscena * 0.5,
	xPersonaje = anchoEscena / 2,
	yPersonaje = altoEscena / 2
} = {}) {

	let personaje

	switch (puntoEntrada) {
		case 'arriba':
			personaje = escena.physics.add.sprite(norteX, norteY, sprite).setScale(escalaPersonaje)
			break
		case 'abajo':
			personaje = escena.physics.add.sprite(surX, surY, sprite).setScale(escalaPersonaje)
			break
		case 'der':
			personaje = escena.physics.add.sprite(esteX, esteY, sprite).setScale(escalaPersonaje)
			break
		case 'izq':
			personaje = escena.physics.add.sprite(oesteX, oesteY, sprite).setScale(escalaPersonaje)
			break
		default:
			personaje = escena.physics.add.sprite(xPersonaje, yPersonaje, sprite).setScale(escalaPersonaje)
			break
	}

	personaje.setCollideWorldBounds(true);

	return personaje
}

export function crearAreaColision (escena, objeto, {
	posicionX = objeto.x,
	posicionY = objeto.y,
	ancho = objeto.width,
	alto = objeto.height,
	color = 0x000000,
	alfa = 0,
	origenX = objeto.originX,
	origenY = objeto.originY,
	escalaX = objeto.scaleX,
	escalaY = objeto.scaleY
} = {}) {
	let area = escena.add.rectangle(posicionX, posicionY, ancho, alto, color, alfa).setOrigin(origenX, origenY)
	area.setScale(escalaX, escalaY)
	escena.physics.world.enable(area)
	area.body.immovable = true
	return area
}