import Phaser from "phaser";

import fondo_casa_juan_exterior from "../../imagenes/Fondos/Exterior_Casa_Juan_Cupul.jpg"
import casa_juan_exterior from "../../imagenes/Objetos/Casas/Casa_JP_Exterior.png"
import cubeta_1 from "../../imagenes/Objetos/Decoracion/Cubeta_1.png"
import pozo_1 from "../../imagenes/Objetos/Decoracion/Pozo_1.png"
import arbol_1 from "../../imagenes/Objetos/Decoracion/Arbol_1.png"


const v_m_personaje = 160

// Ajustar la velocidad diagonal
const diagonalVelocity = v_m_personaje * Math.sqrt(0.5)


let cursors = {
    movimiento: { flechas: undefined, letras: undefined },
    acciones: { confirmar: undefined }
}

let colisionCasa = []
let entrada_a_escena = ''

export class Exterior_Casa_Juan extends Phaser.Scene {
    constructor() {
        super({ key: 'exterior_casa_juan' })
    }

    init(data){
        if(data){
            entrada_a_escena = data.entrada
        }
    }

    preload() {
        this.load.image('fondo_exterior_casa_juan', fondo_casa_juan_exterior)
        this.load.image('exterior_casa_juan', casa_juan_exterior)
        this.load.image('cubeta_1', cubeta_1)
        this.load.image('pozo_1', pozo_1)
        this.load.image('arbol_1', arbol_1)
    }

    create() {
        cursors.movimiento.flechas = this.input.keyboard.createCursorKeys();
        cursors.movimiento.letras = this.input.keyboard.addKeys('W,A,S,D')
        cursors.acciones.confirmar = this.input.keyboard.addKey('F')

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, 'fondo_exterior_casa_juan').setScale(0.8, 0.735).setDepth(-1)
        this.arbolesGrupo1 = this.physics.add.staticGroup({
            key: 'arbol_1',
            frameQuantity: 8,
            gridAlign: {
                width: 8,
                height: 1,
                cellWidth: 190,
                cellHeight: 120,
                x: 15,
                y: 10,
            }
        })
        this.arbolesGrupo1.children.iterate((arbol) => {
            arbol.setScale(0.65)
            arbol.setOrigin(0.75)
            arbol.setSize(180, 180)
        })

        this.arbolesGrupo2 = this.physics.add.staticGroup({
            key: 'arbol_1',
            frameQuantity: 8,
            gridAlign: {
                width: 1,
                height: 8,
                cellWidth: 190,
                cellHeight: 120,
                x: -5,
                y: 130,
            }
        })
        this.arbolesGrupo2.children.iterate((arbol) => {
            arbol.setScale(0.65)
            arbol.setOrigin(0.75)
            arbol.setSize(180, 180)
        })

        this.arbolesGrupo3 = this.physics.add.staticGroup({
            key: 'arbol_1',
            frameQuantity: 8,
            gridAlign: {
                width: 1,
                height: 8,
                cellWidth: 190,
                cellHeight: 120,
                x: 1460,
                y: 130,
            }
        })
        this.arbolesGrupo3.children.iterate((arbol) => {
            arbol.setScale(0.65)
            arbol.setOrigin(0.75)
            arbol.setSize(180, 180)
        })

        this.arbolesGrupo4 = this.physics.add.staticGroup({
            key: 'arbol_1',
            frameQuantity: 3,
            gridAlign: {
                width: 3,
                height: 1,
                cellWidth: 190,
                cellHeight: 120,
                x: 90,
                y: 750,
            }
        })
        this.arbolesGrupo4.children.iterate((arbol) => {
            arbol.setScale(0.65)
            arbol.setOrigin(0.75)
            arbol.setSize(180, 180)
        })

        this.arbolesGrupo5 = this.physics.add.staticGroup({
            key: 'arbol_1',
            frameQuantity: 3,
            gridAlign: {
                width: 3,
                height: 1,
                cellWidth: 190,
                cellHeight: 120,
                x: 890,
                y: 750,
            }
        })
        this.arbolesGrupo5.children.iterate((arbol) => {
            arbol.setScale(0.65)
            arbol.setOrigin(0.75)
            arbol.setSize(180, 180)
        })

        colisionCasa.push(this.add.rectangle(posicion.x*0.62, posicion.y*0.92, posicion.x*0.5, posicion.y*0.95, 0x00ffff, 0))
        colisionCasa.push(this.add.rectangle(posicion.x*1.35, posicion.y*0.92, posicion.x*0.5, posicion.y*0.95, 0x00ffff, 0))
        this.puerta = this.add.rectangle(posicion.x*0.985, posicion.y*1.08, posicion.x*0.25, posicion.y*0.4, 0x00ffff, 0)
        this.limitesCasa = this.physics.add.group(colisionCasa)
        this.limitesCasa.children.iterate(obj => { obj.body.immovable = true })
        this.physics.world.enable(this.limitesCasa)
        this.physics.world.enable(this.puerta)
        
        this.add.image(posicion.x * 0.985, posicion.y * 0.699, 'exterior_casa_juan').setScale(0.8)
        this.cubeta = this.physics.add.image(posicion.x * 1.88, posicion.y * 1.12, 'cubeta_1').setScale(0.65).setImmovable(true)
        this.pozo = this.physics.add.image(posicion.x * 1.8, posicion.y * 1.18, 'pozo_1').setScale(0.8).setImmovable(true)
        
        if(entrada_a_escena === 'casa'){
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.35, 'juan_c').setScale(1.25)
        }else{
            this.player = this.physics.add.sprite(posicion.x * 0.985, posicion.y * 1.85, 'juan_c').setScale(1.25)
        }
        this.player.setCollideWorldBounds(true);
        
        let playerSize = { width: this.player.width, height: this.player.height }
        this.player.setSize(playerSize.width * 0.28125, playerSize.height * 0.1875)
        this.player.setOffset(playerSize.width * 0.375, playerSize.height * 0.578125)
        
        // Salida Escenario
        this.salidaEscena = this.add.rectangle(posicion.x, posicion.y * 2.05, posicion.x * 0.35, posicion.y * 0.15, 0x000000, 0)
        this.physics.world.enable(this.salidaEscena)
        this.salidaEscena.body.immovable =true

        this.physics.world.enable([this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4, this.arbolesGrupo5])

        this.physics.add.collider(this.player, [this.arbolesGrupo1, this.arbolesGrupo2, this.arbolesGrupo3, this.arbolesGrupo4,
            this.arbolesGrupo5, this.limitesCasa, this.pozo, this.cubeta], null, null, this)
        this.physics.add.collider(this.player, this.puerta, ()=>{
            this.scene.start('interior_caja_juan', {entradaPuerta: true})
        }, null, this)

        this.physics.add.collider(this.player, this.salidaEscena, ()=>{
            this.scene.start('mape_parte_1', {entrada: 'norte'})
        }, null, this)
    }

    update() {

        this.player.setVelocity(0)

        switch (true) {
            // Teclas arriba e izquierda  ||  Teclas W  A
            case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.A.isDown):
                manejadorMovimientoJugador(this.player, -diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                break;

            // Teclas arriba y derecha    ||  Teclas W  D
            case (cursors.movimiento.flechas.up.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.W.isDown && cursors.movimiento.letras.D.isDown):
                manejadorMovimientoJugador(this.player, diagonalVelocity, -diagonalVelocity, 'walkUp_juan');
                break;

            // Teclas abajo e izquierda   ||  Teclas S  A
            case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.left.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.A.isDown):
                manejadorMovimientoJugador(this.player, -diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                break;

            // Teclas abajo y derecha    ||  Teclas S  D
            case (cursors.movimiento.flechas.down.isDown && cursors.movimiento.flechas.right.isDown) || (cursors.movimiento.letras.S.isDown && cursors.movimiento.letras.D.isDown):
                manejadorMovimientoJugador(this.player, diagonalVelocity, diagonalVelocity, 'walkDown_juan');
                break;

            // Tecla derecha    ||  Tecla D
            case cursors.movimiento.flechas.right.isDown || cursors.movimiento.letras.D.isDown:
                manejadorMovimientoJugador(this.player, v_m_personaje, 0, 'walkRight_juan');
                break;

            // Tecla izquierda  ||  Tecla A
            case cursors.movimiento.flechas.left.isDown || cursors.movimiento.letras.A.isDown:
                manejadorMovimientoJugador(this.player, -v_m_personaje, 0, 'walkLeft_juan');
                break;

            // Tecla abajo      ||  Tecla S
            case cursors.movimiento.flechas.down.isDown || cursors.movimiento.letras.S.isDown:
                manejadorMovimientoJugador(this.player, 0, v_m_personaje, 'walkDown_juan');
                break;

            // Tecla arriba     ||  Tecla W
            case cursors.movimiento.flechas.up.isDown || cursors.movimiento.letras.W.isDown:
                manejadorMovimientoJugador(this.player, 0, -v_m_personaje, 'walkUp_juan');
                break;

            case cursors.acciones.confirmar.isDown:
                console.log(this.game.canvas.width, this.game.canvas.height)
                break;
            default: // Ninguna tecla
                this.player.anims.stop()
        }
    }
}

function manejadorMovimientoJugador(player, velocityX, velocityY, animationKey) {
    player.setVelocityX(velocityX);
    player.setVelocityY(velocityY);
    player.anims.play(animationKey, true);
}