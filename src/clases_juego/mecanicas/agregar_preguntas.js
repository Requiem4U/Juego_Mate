import Phaser from 'phaser';

export class Agregar_Preguntas extends Phaser.Scene {
    constructor() {
        super({ key: 'agregar_preguntas' });
    }

    preload () {

    }
    create () {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        // Agrega campos de texto, botones y otros elementos para el login
        const style = 'width: 200px; height: 30px; font-size: 16px; padding: 5px; background-color: white; border: 1px solid black;';

        this.add.text(774, 100, 'Sea bienvenido maestro(a)', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 140, 'Introduzca los datos para agregar más preguntas', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.text(530, 185, 'Contexto:', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 200).createFromHTML(`<input id="contexto" type="text" style="${style}">`);

        this.add.text(530, 235, 'Pregunta:', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 250).createFromHTML(`<textarea id="pregunta" type="textarea" style="${style}"></textarea>`);

        this.add.text(415, 335, '¿A que se refiere?', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 350).createFromHTML(`<input id="que" type="text" style="${style}">`);

        this.add.text(380, 385, '¿A quien se refiere?', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 400).createFromHTML(`<input id="quien" type="text" style="${style}">`);

        this.add.text(225, 435, '¿Qué solución necesita seguir?', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 450).createFromHTML(`<textarea id="operaciones" type="textarea" style="${style}"></textarea>`);

        this.add.text(350, 535, '¿Cual es la respuesta?', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 550).createFromHTML(`<textarea id="respuesta" type="textarea" style="${style}"></textarea>`);

        const loginButton = this.add.dom(774, 650).createFromHTML(`<button style="${style}">Login</button>`);
        // Agrega eventos para procesar la información de login
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

            // Realiza alguna validación local aquí si es necesario
            if (contexto.trim() === '' || pregunta.trim() === '' || que.trim() === '' || quien.trim() === '' || operaciones.trim() === '' || respuesta.trim() === '') {
                alert('Por favor, ingrese datos en los campos que faltan.');
                return;
            }

            fetch('URL_DE_TU_API/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contexto, pregunta, que, quien, operaciones, respuesta }),
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
                    // Aquí puedes manejar la respuesta del servidor después del registro exitoso
                })
                .catch(error => {
                    console.error('Error al registrar usuario:', error);
                    // Manejar errores durante el registro
                });
        }, this);

        const volverButton = this.add.dom(774, 700).createFromHTML(`<button style="${style}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('pantalla_eleccion');
        }, this);
    }
}