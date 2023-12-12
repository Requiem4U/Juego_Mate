import { apiUrl } from "../inicio/configuracion_general";
let nombre

export default class VerificarGuardado {
    async verificar () {
        try {
            nombre = localStorage.getItem('userNombre');
            // Realiza la solicitud GET a la base de datos
            const response = await fetch(`${apiUrl}/api/posicions?filters[jugador][$eq]=${nombre}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Verifica si la solicitud fue exitosa (código de estado 200)
            if (response.ok) {
                // Convierte la respuesta a JSON
                const datos = await response.json();
                // Devuelve los datos obtenidos
                console.log(datos.data[0])
                return datos.data[0];
            } else {
                // Si la respuesta no fue exitosa, muestra un alert
                alert('Error en la petición.');
                return null;
            }
        } catch (error) {
            // Captura errores de la solicitud
            console.error('Error al obtener datos:', error);
            alert('Error al obtener datos de la base de datos.');
            return null;
        }
    }
}
