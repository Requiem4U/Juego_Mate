import Phaser from "phaser";
import { apiUrl } from "../inicio/configuracion_general.js"

export default class Guardado {
    async guardarDatos (evento, posX, posY, qte) {
        try {
            const nombre = localStorage.getItem('userNombre');

            const url = `${apiUrl}/api/posicions`;

            const datos = {
                "data": {
                    "evento": evento,
                    "posicionX": posX,
                    "posicionY": posY,
                    "QTE": qte,
                    "jugador": nombre
                }

            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            if (!response.ok) {
                console.error('Error al guardar los datos:', response.status);
            }
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            // Manejo de errores en caso de excepciones
        }
    }

    obtenerClaveEscenaActual () {
        const escenas = Phaser.GAMES[0].scene.keys;
        const escenaActual = Phaser.GAMES[0].scene.manager.activeScene;

        for (const clave in escenas) {
            if (escenas[clave] === escenaActual) {
                return clave;
            }
        }
        return null; // En caso de no encontrar la escena actual
    }
}
