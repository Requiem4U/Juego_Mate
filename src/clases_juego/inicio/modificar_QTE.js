import Phaser from 'phaser';
import { apiUrl,style,styleButtom,styleTextArea } from './configuracion_general';

export class modificarQTEScene extends Phaser.Scene {
    constructor() {
        super({ key: 'modificarQTEScene' });
    }

    preload() {
        
    }
    create() {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        const it = localStorage.getItem('itemModificarQTE');
        const item = JSON.parse(it);


        this.add.text(774, 100, 'Para modificar ', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 140, 'Introduzca sus correcciones', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.text(80, 185, 'QTE:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(204, 230).createFromHTML(`<input id="QTE" value=${item.attributes.QTE}  placeholder="QTE-1" style="${style}"></input>`);

        this.add.text(380, 185, 'Contexto:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(624, 230).createFromHTML(`<textarea id="contexto" placeholder="Juan necesita hacer una bomba..." style="${styleTextArea}">${item.attributes.contexto}</textarea>`);

        this.add.text(850, 185, 'Pregunta:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 230).createFromHTML(`<textarea id="pregunta" placeholder="¿Cuánto es 7 - 2?" style="${styleTextArea}">${item.attributes.pregunta}</textarea>`);

        this.add.text(230, 365, 'A quién se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 380).createFromHTML(`<input id="quien" type="text" value=${item.attributes.quien} placeholder="A quién se refiere el contexto : Juan" style="${style}">`);

        this.add.text(255, 410, 'A qué se refiere:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 430).createFromHTML(`<input id="que" type="text" value=${item.attributes.que} placeholder="A qué se refiere el contexto : Bomba" style="${style}">`);

        this.add.text(65, 465, 'Qué operación necesita seguir:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(624, 510).createFromHTML(`<textarea id="operaciones" placeholder="Qué operación realizas : Restar" style="${styleTextArea}">${item.attributes.operaciones}</textarea>`);

        this.add.text(985, 365, 'Cuál es la respuesta:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 450).createFromHTML(`<textarea id="respuesta" placeholder="La respuesta a tu pregunta : 5" style="${styleTextArea}">${item.attributes.respuesta}</textarea>`);

        const loginButton = this.add.dom(774, 650).createFromHTML(`<button style="${styleButtom}">Modificar</button>`);
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
            
            //Hacemos el Put de nuestros datos
            fetch(`${apiUrl}/api/preguntas/${item.id}`, {
                method: 'PUT',
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
                    throw new Error('Error al actualizar el recurso');
                }
            })
            .then(data => {
                // Manejar la respuesta del servidor
                console.log('Registro exitoso:', data);
                localStorage.removeItem('itemModificarQTE');
                this.scene.start('ver_QTE')
            })
            .catch(error => {
                console.error('Error al actualizar el recurso:', error);
            });       
        }, this);

        const volverButton = this.add.dom(774, 700).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            localStorage.removeItem('itemModificar');
            this.scene.start('ver_QTE')
        }, this);
    }
}
export default modificarQTEScene;

function verificarComas(operaciones) {
    const partes = operaciones.split(',');
    if (partes.length - 1 !== 3) {
        return false;
    } else {
        return true;
    }
}