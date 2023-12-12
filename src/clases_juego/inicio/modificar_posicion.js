import Phaser from 'phaser';
import { apiUrl,style,styleButtom } from './configuracion_general';


export class modificarPosicionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'modificarPosicionScene' });
    }

    preload() {
        
    }
    create() {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        const it = localStorage.getItem('itemModificarPosicion');
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

        this.add.text(400, 365, 'Evento:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 380).createFromHTML(`<input id="evento" type="text" value=${item.attributes.evento} placeholder="Evento" style="${style}">`);

        this.add.text(400, 410, 'QTE:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 430).createFromHTML(`<input id="QTE" type="text" value=${item.attributes.QTE} placeholder="QTE" style="${style}">`);

        this.add.text(400, 465, 'Jugador:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(675, 480).createFromHTML(`<input id="jugador"  placeholder="Jugador" value=${item.attributes.jugador} style="${style}"></input>`);

        this.add.text(985, 355, 'Posición en X:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 400).createFromHTML(`<input id="posicionX" type="number" step="any" value=${item.attributes.posicionX} placeholder="Posición en x" style="${style}"></input>`);

        this.add.text(985, 435, 'Posición en Y:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(1095, 480).createFromHTML(`<input id="posicionY" type="number" step="any" value=${item.attributes.posicionY} placeholder="Posición en y" style="${style}"></input>`);


        const loginButton = this.add.dom(774, 650).createFromHTML(`<button style="${styleButtom}">Modificar</button>`);
        // Eventos para procesar la información de login
        loginButton.addListener('click');
        loginButton.on('click', function () {
            const eventoInput = document.querySelector('#evento');
            const QTEInput = document.querySelector('#QTE');
            const jugadorInput = document.querySelector('#jugador')
            const posicionXInput = document.querySelector('#posicionX')
            const posicionYInput = document.querySelector('#posicionY')


            const evento = eventoInput.value;
            const QTE = QTEInput.value;
            const jugador = jugadorInput.value;
            const posicionX = posicionXInput.value;
            const posicionY = posicionYInput.value;

            // Realiza la validación de campos vacios y la cantidad de comas
            if (evento.trim() === '' || QTE.trim() === '' || jugador.trim() === '' || posicionX.trim() === '' || posicionY.trim() === '' ) {
                alert('Por favor, ingrese datos en los campos que faltan.');
                return;
            }

            //Formato a los datos que vamos a ingresar
            const data = {
                "data": {
                    "evento": evento,
                    "QTE": QTE,
                    "jugador": jugador,
                    "posicionX": posicionX,
                    "posicionY": posicionY
                }
            }
            
            //Hacemos el Put de nuestros datos
            fetch(`${apiUrl}/api/posicions/${item.id}`, {
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
                localStorage.removeItem('itemModificarPosicion');
                this.scene.start('ver_posicion')
            })
            .catch(error => {
                console.error('Error al actualizar el recurso:', error);
            });       
        }, this);

        const volverButton = this.add.dom(774, 700).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            localStorage.removeItem('itemModificarPosicion');
            this.scene.start('ver_posicion')
        }, this);
    }
}
export default modificarPosicionScene;
