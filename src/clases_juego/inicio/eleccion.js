import Phaser from 'phaser';

export class EleccionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EleccionScene' });
    }

    preload () {

    }

    create () {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_formularios'
        ).setOrigin(0.5).setScale(0.756)

        const styleButtom = `
            width: 220px;
            height: 50px;
            font-size: 20px;
            font-weight: bold;
            padding: 5px;
            background-color: #fff;
            border: 2px solid #000;
            border-radius: 6px;
            color: #000000;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
        `;

        /*const hoverstyleButtom = `
            background-color: #a0a0a0;
            color: #fff;
        `;*/

        // Texto de bienvenida
        this.add.text(774, 180, 'Bienvenido a Conquista Matemática', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 240, '¿Que desea hacer?', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);


        const jugarButton = this.add.dom(774, 350).createFromHTML(`<button style="${styleButtom}">Jugar</button>`);
        /*
        jugarButton.on('mouseover', function() {
            jugarButton.node.style.cssText += hoverstyleButtom;
        });
        
        jugarButton.on('mouseout', function() {
            jugarButton.node.style.cssText = styleButtom;
        });*/
        jugarButton.addListener('click');
        jugarButton.on('click', function () {
            this.scene.start('pantalla_inicio');
        }, this);

        const volverButton = this.add.dom(774, 420).createFromHTML(`<button style="${styleButtom}">Agregar Preguntas</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('agregarScene');
        }, this);

        const verButton = this.add.dom(774, 490).createFromHTML(`<button style="${styleButtom}">Ver Preguntas</button>`);
        verButton.addListener('click');
        verButton.on('click', function () {
            this.scene.start('ver_preguntas');
        }, this);

        const salirButton = this.add.dom(774, 560).createFromHTML(`<button style="${styleButtom}">Cerrar Sesión</button>`);
        salirButton.addListener('click');
        salirButton.on('click', function () {
            localStorage.clear();
            this.scene.start('LoginScene');
        }, this);
    }
}

export default EleccionScene;