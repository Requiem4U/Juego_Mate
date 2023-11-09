import datos from '../../datos.json'

let ayudaControlesNPC = datos.entrada

export class Datos_Jugador {

    constructor() { }

    ayudaControlesNPC_Disponible () {
        return ayudaControlesNPC
    }

    actualzizarAyudaControlesNPC_Disponible () {
        ayudaControlesNPC = !ayudaControlesNPC
    }
}