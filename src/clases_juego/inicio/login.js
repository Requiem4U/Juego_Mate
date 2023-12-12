import Phaser from 'phaser';
import { apiUrl } from './configuracion_general';

export class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
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

        // Agrega estilos de texto, botones y otros elementos para el login
        const style = 'width: 200px; height: 30px; font-size: 16px; padding: 5px; background-color: white; border: 1px solid black;';
        const styleButtom = `
            width: 210px;
            height: 50px;
            font-size: 20px;
            font-weight: bold;
            padding: 5px;
            background-color: #fff;
            border: 2px solid #000;
            border-radius: 6px;
            color: #000;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
        `

        // Texto de bienvenida
        this.add.text(774, 180, 'Bienvenido a Conquista Matemática', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);
        this.add.text(774, 240, 'Introduzca sus datos para iniciar sesión', {
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);

        // Texto para el campo Usuario
        this.add.text(530, 320, 'Usuario:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });
        this.add.dom(774, 335).createFromHTML(`<input id="user" type="text" style="${style}">`);

        // Texto para el campo Contraseña
        this.add.text(500, 400, 'Contraseña:', {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#000000',
        });

        this.add.dom(774, 415).createFromHTML(`<input id="contra" type="password" style="${style}">`);
        const loginButton = this.add.dom(774, 500).createFromHTML(`<button style="${styleButtom}">Login</button>`);
        // Agrega eventos para procesar la información de login
        loginButton.addListener('click');
        loginButton.on('click', function () {
            const usernameInput = document.querySelector('#user');
            const passwordInput = document.querySelector('#contra');
            const username = usernameInput.value;
            const password = passwordInput.value;
            let tipo = ''
            let id = ''

            //Validamos campos vacios
            if (username.trim() === '' || password.trim() === '') {
                alert('Por favor, ingrese datos en los campos que faltan.');
                return;
            }
            //Hacemos un GET para buscar a nuestro usuario
            fetch(apiUrl + '/api/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la autenticación');
                    }
                })
                .then(json => {
                    //Buscar nuestro usuario y contraseña
                    const usuarioEncontrado = json.data.find(user => user.attributes.nombre === username && user.attributes.contrasena === password);
                    // Si se encontró el usuario y la contraseña coincide, obtener el tipo y el id
                    if (usuarioEncontrado) {
                        tipo = usuarioEncontrado.attributes.tipo;
                        id = usuarioEncontrado.id;
                        //console.log("Usuario encontrado. Tipo:", tipo,"ID del usuario",id);
                    } else {
                        alert("Usuario y/o contraseña incorrectos.");
                        return;
                    }
                    // Redireccionar a otra escena dependiendo del tipo de usuario
                    switch (tipo) {
                        case 'estudiante':
                            localStorage.setItem('userId', id);
                            localStorage.setItem('userTipo', tipo);
                            this.scene.start('pantalla_inicio');
                            break;
                        case 'profesor':
                            localStorage.setItem('userId', id);
                            localStorage.setItem('userTipo', tipo);
                            this.scene.start('EleccionScene');
                            break;
                        case 'admin':
                            localStorage.setItem('userId', id);
                            localStorage.setItem('userTipo', tipo);
                            this.scene.start('Eleccion_Admin');
                            break;
                        default:
                            console.error('Error de autenticación del tipo');
                            return;
                    }
                })
                .catch(error => {
                    console.error(error);
                    return;
                });
        }, this);

        const registerButton = this.add.dom(774, 560).createFromHTML(`<button style="${styleButtom}">Registro</button>`);
        registerButton.addListener('click');
        registerButton.on('click', function () {
            // Cambiar a otra escena de registro
            this.scene.start('RegistroScene');
        }, this);
    }
}
export default LoginScene;