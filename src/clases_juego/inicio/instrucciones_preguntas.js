import Phaser from 'phaser';
import { styleButtom } from './configuracion_general';

export class instrucciones_preguntas extends Phaser.Scene {
    constructor() {
        super({ key: 'instrucciones_preguntas' });
    }

    preload () {

    }
    create () {

        let posicion = { x: this.game.canvas.width / 2, y: this.game.canvas.height / 2 }
        this.add.image(posicion.x, posicion.y, '_fondo_basta_mate').setOrigin(0.5).setScale(0.756)

        this.add.image(posicion.x, posicion.y - 30, '_fondo_instrucciones_preguntas').setOrigin(0.5).setScale(0.956)

        const volverButton = this.add.dom(774, 750).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            const itemLocalStorage = localStorage.getItem('itemModificar');
            if (!itemLocalStorage) {
                this.scene.start('agregarScene');
            } else {
                this.scene.start('modificarScene');
            }
        }, this);
    }
}
export default instrucciones_preguntas;