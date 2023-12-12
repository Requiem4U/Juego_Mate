import Phaser from 'phaser';
import { apiUrl,styleButtom } from './configuracion_general';

export class RegistroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RegistroScene' });
    }

    preload() {

    }

    create() {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        // Agregamos estilos de texto, botones y otros elementos para el login
        const style = 'width: 200px; height: 30px; font-size: 16px; padding: 5px; background-color: white; border: 1px solid black;';

        // Texto de bienvenida
        this.add.text(774, 100, 'Bienvenido a Ecos de la Historia', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 140, 'Introduzca sus datos para crear su cuenta', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        // Texto para el campo Usuario
        this.add.text(530, 185, 'Usuario:', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 200).createFromHTML(`<input id="user" type="text" style="${style}">`);

        // Texto para el campo Contraseña
        this.add.text(500, 240, 'Contraseña:', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 250).createFromHTML(`<input id="contra" type="password" style="${style}">`);

        // Texto para el campo Tipo
        this.add.text(580, 290, 'Tipo:', {
            fontSize: '25px',
            color: '#000000',
        });
        this.add.dom(774, 300).createFromHTML(`<input id="tipo" type="text" style="${style}">`);

        const loginButton = this.add.dom(774, 350).createFromHTML(`<button style="${styleButtom}">Registrar</button>`);
        // Agrega eventos para procesar la información de login
        loginButton.addListener('click');
        loginButton.on('click', function () {
            const usernameInput = document.querySelector('#user');
            const passwordInput = document.querySelector('#contra');
            const tipoInput = document.querySelector('#tipo')
            const username = usernameInput.value;
            const password = passwordInput.value;
            const tipoUsuario = tipoInput.value.toLowerCase();

            
            // Realiza validación de campos vacios
            if (username.trim() === '' || password.trim() === '') {
                alert('Por favor, ingrese nombre de usuario y contraseña.');
                return;
            }

            if (password.length < 5) {
                // Mostrar advertencia si la longitud es menor a 5
                alert('La contraseña debe tener al menos 5 caracteres');
            }
            //Validación del tipo de usuarios
            switch(tipoUsuario){
                case 'estudiante': 
                    console.log('Tipo correcto')
                    break;
                
                case 'profesor':
                    console.log('Tipo Correcto')
                    break;
                
                default:
                    alert('Tipo solo acepta la palabra estudiante y profesor')
                    return;
            }

            const data = {
                "data": {
                    "nombre": username,
                    "contrasena": password,
                    "tipo": tipoUsuario
                }
            }
            //Realizamos un GET para verificar que no exista nuestro usuario
            fetch(`${apiUrl}/api/usuarios?filters[nombre][$eq]=${username}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al verificar si el usuario existe');
                    }
                })
                .then(existingUserData => {
                    // Verificar si se encontraron resultados (si el usuario ya existe)
                    if (existingUserData.data.length > 0) {
                        console.log('El usuario ya existe: ',username,' No se puede registrar.');
                        alert('El usuario ya existe: ',username,' No se puede registrar.');
                        return;
                    } else {
                        // El usuario no existe, proceder con el registro POST
                        // Realizar la solicitud POST para registrar el nuevo usuario
                        return fetch(`${apiUrl}/api/usuarios`, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                    }
                })
                .then(response => {
                    if (response && response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en el registro');
                    }
                })
                .then(datos => {
                    // Manejar la respuesta del servidor después del registro exitoso
                    console.log('Registro exitoso:', datos);
                    this.scene.start('LoginScene');
                })
                .catch(err => {
                    console.error('Error al registrar usuario:', err);
                });
            
        }, this);

        const volverButton = this.add.dom(774, 400).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('LoginScene');
        }, this);
    }
}

export default RegistroScene;