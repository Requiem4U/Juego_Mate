import Phaser from 'phaser';
import { apiUrl, style, styleButtom, styleTextArea, styleTextAreaContexto } from './configuracion_general';
import imagInfo from '../../assets/Iconos/info.png'

export class agregarScene extends Phaser.Scene {
    constructor() {
        super({ key: 'agregarScene' });
    }

    preload () {
        this.load.image('imagenInfo', imagInfo);
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

        const imagenInfo = this.add.image(1250, 150, 'imagenInfo');
        imagenInfo.setInteractive();
        imagenInfo.setDisplaySize(80, 80);

        imagenInfo.setTint(0xffffff); // Establece un color inicial

        imagenInfo.on('pointerdown', () => {
            // Función que se ejecuta al hacer clic en la imagen
            this.scene.start('instrucciones_preguntas')
        });

        this.add.text(1250, 200, 'Cómo agregar preguntas', {
            fontSize: '15px',
            fontStyle: 'bold',
            color: '#000000',
            wordWrap: { width: 150, useAdvancedWrap: true },
        }).setOrigin(0.5);

        this.add.text(774, 160, 'Sea bienvenido maestro(a)', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 190, 'Introduzca los datos para agregar más preguntas', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.text(280, 260, 'Contexto:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(630, 330).createFromHTML(`<textarea id="contexto" placeholder="Juan necesita hacer una bomba..." style="${styleTextAreaContexto}"></textarea>`);

        this.add.text(870, 260, 'Pregunta:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1160, 290).createFromHTML(`<textarea id="pregunta" placeholder="¿Cuánto es 7 - 2?" style="${styleTextArea}"></textarea>`);

        this.add.text(255, 432, 'A quién se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(700, 444).createFromHTML(`<input id="quien" type="text" placeholder="op-correcta, op-erronea1, op-erronea2, op-erronea3" style="${style}">`);

        this.add.text(255, 488, 'A qué se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(700, 500).createFromHTML(`<input id="que" type="text" placeholder="op-correcta, op-erronea1, op-erronea2, op-erronea3" style="${style}">`);

        this.add.text(250, 570, 'Qué operación necesita seguir:', {
            fontSize: '25px',
            wordWrap: { width: 260, useAdvancedWrap: true },
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(700, 600).createFromHTML(`<textarea id="operaciones" placeholder="op-correcta, op-erronea1, op-erronea2, op-erronea3" style="${styleTextArea}"></textarea>`);

        this.add.text(950, 400, 'Cuál es la respuesta al problema:', {
            fontSize: '25px',
            wordWrap: { width: 350, useAdvancedWrap: true },
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1100, 560).createFromHTML(`<textarea id="respuesta" placeholder="op-correcta, op-erronea1, op-erronea2, op-erronea3" style="${styleTextArea}"></textarea>`);

        const loginButton = this.add.dom(774, 690).createFromHTML(`<button style="${styleButtom}">Agregar</button>`);
        // Eventos para procesar la información de login
        loginButton.addListener('click');
        loginButton.on('click', function () {
            const contextoInput = document.querySelector('#contexto');
            const preguntaInput = document.querySelector('#pregunta');
            const queInput = document.querySelector('#que')
            const quienInput = document.querySelector('#quien')
            const operacionesInput = document.querySelector('#operaciones')
            const respuestaInput = document.querySelector('#respuesta')


            const contexto = contextoInput.value;
            const pregunta = preguntaInput.value;
            const que = queInput.value;
            const quien = quienInput.value;
            const operaciones = operacionesInput.value;
            const respuesta = respuestaInput.value;

            // Realiza la validación de campos vacios y la cantidad de comas
            if (contexto.trim() === '' || pregunta.trim() === '' || que.trim() === '' || quien.trim() === '' || operaciones.trim() === '' || respuesta.trim() === '') {
                alert('Por favor, ingrese datos en los campos que faltan.');
                return;
            }

            if (verificarComas(que) === false || verificarComas(quien) === false || verificarComas(operaciones) === false || verificarComas(respuesta) === false) {
                alert('El número de comas es incorrecto. Deben ser tres comas (",") en la cadena de Quién, Qué, Operación y Respuesta.');
                return;
            }

            //Formato a los datos que vamos a ingresar
            const data = {
                "data": {
                    "pregunta": pregunta,
                    "que": que,
                    "quien": quien,
                    "operaciones": operaciones,
                    "resultado": respuesta,
                    "contexto": contexto
                }
            }

            //Hacemos el Post de nuestros datos
            fetch(`${apiUrl}/api/vendedor-preguntas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.ok) {
                        // Usuario registrado exitosamente
                        return response.json();
                    } else {
                        throw new Error('Error en el registro');
                    }
                })
                .then(data => {
                    // Manejar la respuesta del servidor
                    console.log('Registro exitoso:', data);
                    this.scene.start('EleccionScene')
                })
                .catch(error => {
                    console.error('Error al registrar usuario:', error);
                });
        }, this);

        const volverButton = this.add.dom(320, 150).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            const tipoUsuario = localStorage.getItem('userTipo');
            if (tipoUsuario === 'admin') {
                this.scene.start('Eleccion_Admin');
            } else {
                this.scene.start('EleccionScene');
            }
        }, this);
    }
}
export default agregarScene;

function verificarComas (operaciones) {
    const partes = operaciones.split(',');
    if (partes.length - 1 !== 3) {
        return false;
    } else {
        console.log('Número correcto de comas.');
        return true;
    }
}