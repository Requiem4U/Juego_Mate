import Phaser from 'phaser';
import { apiUrl,style,styleButtom,styleTextArea } from './configuracion_general';

export class agregarQTEScene extends Phaser.Scene {
    constructor() {
        super({ key: 'agregarQTEScene' });
    }

    preload() {
        
    }
    create() {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        this.add.text(774, 100, 'Agregar más preguntas a los QTE', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 140, 'Introduzca los datos para agregar más preguntas', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.text(80, 185, 'QTE:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(204, 230).createFromHTML(`<input id="QTE" placeholder="QTE-1" style="${style}"></input>`);


        this.add.text(380, 185, 'Contexto:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(624, 230).createFromHTML(`<textarea id="contexto" placeholder="Juan necesita hacer una bomba..." style="${styleTextArea}"></textarea>`);

        this.add.text(850, 185, 'Pregunta:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 230).createFromHTML(`<textarea id="pregunta" placeholder="¿Cuánto es 7 - 2?" style="${styleTextArea}"></textarea>`);

        this.add.text(230, 365, 'A quién se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 380).createFromHTML(`<input id="quien" type="text" placeholder="A quién se refiere el contexto : Juan" style="${style}">`);

        this.add.text(255, 410, 'A qué se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 430).createFromHTML(`<input id="que" type="text" placeholder="A qué se refiere el contexto : Bomba" style="${style}">`);

        this.add.text(65, 465, 'Qué operación necesita seguir:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(624, 510).createFromHTML(`<textarea id="operaciones" placeholder="Qué operación realizas : Restar" style="${styleTextArea}"></textarea>`);

        this.add.text(985, 365, 'Cuál es la respuesta:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 450).createFromHTML(`<textarea id="respuesta" placeholder="La respuesta a tu pregunta : 5" style="${styleTextArea}"></textarea>`);

        const loginButton = this.add.dom(774, 650).createFromHTML(`<button style="${styleButtom}">Agregar</button>`);
        // Eventos para procesar la información de login
        loginButton.addListener('click');
        loginButton.on('click', function () {
            const QTEInput = document.querySelector('#QTE');
            const contextoInput = document.querySelector('#contexto');
            const preguntaInput = document.querySelector('#pregunta');
            const queInput = document.querySelector('#que')
            const quienInput = document.querySelector('#quien')
            const operacionesInput = document.querySelector('#operaciones')
            const respuestaInput = document.querySelector('#respuesta')

            const QTE = QTEInput.value;
            const contexto = contextoInput.value;
            const pregunta = preguntaInput.value;
            const que = queInput.value;
            const quien = quienInput.value;
            const operaciones = operacionesInput.value;
            const respuesta = respuestaInput.value;

            // Realiza la validación de campos vacios y la cantidad de comas
            if (QTE.trim() === '' ||contexto.trim() === '' || pregunta.trim() === '' || que.trim() === '' || quien.trim() === '' || operaciones.trim() === '' || respuesta.trim() === '') {
                alert('Por favor, ingrese datos en los campos que faltan.');
                return;
            }

            if(verificarComas(que)===false || verificarComas(quien)===false || verificarComas(operaciones)===false || verificarComas(respuesta)===false){
                alert('El número de comas es incorrecto. Deben ser tres comas (",") en la cadena de Quién, Qué, Operación y Respuesta.');
                return;
            }

            //Formato a los datos que vamos a ingresar
            const data = {
                "data": {
                    "QTE":QTE,
                    "contexto": contexto,
                    "pregunta": pregunta,
                    "que": que,
                    "quien": quien,
                    "operaciones": operaciones,
                    "respuesta": respuesta
                }
            }

            //Hacemos el Post de nuestros datos
            fetch(`${apiUrl}/api/preguntas`, {
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
                this.scene.start('Eleccion_Admin')
            })
            .catch(error => {
                console.error('Error al registrar usuario:', error);
            });            
        }, this);

        const volverButton = this.add.dom(774, 700).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('Eleccion_Admin');
        }, this);
    }
}
export default agregarQTEScene;

function verificarComas(operaciones) {
    const partes = operaciones.split(',');
    if (partes.length - 1 !== 3) {
        return false;
    } else {
        return true;
    }
}