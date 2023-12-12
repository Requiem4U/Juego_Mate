
import { apiUrl } from "../inicio/configuracion_general";

export class BD {
    obtenerPreguntasQTE (idPregunta = undefined) {
        if (!idPregunta) {
            fetch(apiUrl + '/api/preguntas'
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        data.data.forEach(element => {
                            console.log(element.attributes)
                        });
                        console.log(data.data.length)
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Manejar errores de autenticación
                });
        } else {
            fetch(apiUrl + '/api/preguntas/?filters[QTE][$eq]=' + idPregunta
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        data.data.forEach(element => {
                            console.log(element.attributes)
                        });
                        console.log(data.data.length)
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Manejar errores de autenticación
                });

        }
    }

    async obtenerPreguntasVendedor () {
        fetch(apiUrl + '/api/vendedor-preguntas'
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    let listaPreguntas = []
                    data.data.forEach(element => {
                        listaPreguntas.push(element.attributes)
                    });
                    console.log(listaPreguntas)

                    return listaPreguntas
                }
            })
            .catch(error => {
                console.error(error);
                // Manejar errores de autenticación
            });
    }
}