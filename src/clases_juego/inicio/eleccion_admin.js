import Phaser from 'phaser';
import { styleButtom } from "../inicio/configuracion_general.js";

export class Eleccion_AdminScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Eleccion_Admin' });
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
            height: 60px;
            font-size: 20px;
            font-weight: bold;
            padding: 5px;
            background-color: #fff;
            border: 2px solid #000;
            border-radius: 6px;
            color: #000000;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
        `
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

        const volverButton = this.add.dom(620, 427.5).createFromHTML(`<button style="${styleButtom}">Agregar Preguntas</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('agregarScene');
        }, this);

        const verButton = this.add.dom(905, 427.5).createFromHTML(`<button style="${styleButtom}">Ver Preguntas</button>`);
        verButton.addListener('click');
        verButton.on('click', function () {
            this.scene.start('ver_preguntas');
        }, this);

        const agregarQTEButton = this.add.dom(620, 505).createFromHTML(`<button style="${styleButtom}">Agregar QTE</button>`);
        agregarQTEButton.addListener('click');
        agregarQTEButton.on('click', function () {
            this.scene.start('agregarQTEScene');
        }, this);

        const verQTEButton = this.add.dom(905, 505).createFromHTML(`<button style="${styleButtom}">Ver QTE</button>`);
        verQTEButton.addListener('click');
        verQTEButton.on('click', function () {
            this.scene.start('ver_QTE');
        }, this);


        const posicionButton = this.add.dom(620, 582.5).createFromHTML(`<button style="${styleButtom}">Posiciones Guardadas</button>`);
        posicionButton.addListener('click');
        posicionButton.on('click', function () {
            this.scene.start('ver_posicion');
        }, this);

        const verAdminButton = this.add.dom(905, 582.5).createFromHTML(`<button style="${styleButtom}">Ver Usuarios</button>`);
        verAdminButton.addListener('click');
        verAdminButton.on('click', function () {
            this.scene.start('ver_usuarios');
        }, this);

        const salirButton = this.add.dom(774, 660).createFromHTML(`<button style="${styleButtom}">Cerrar Sesión</button>`);
        salirButton.addListener('click');
        salirButton.on('click', function () {
            localStorage.clear();
            this.scene.start('LoginScene');
        }, this);
    }
}

export default Eleccion_AdminScene;