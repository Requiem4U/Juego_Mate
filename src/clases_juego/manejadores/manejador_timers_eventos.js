export class ManejadorParpadeoLinea {

    constructor(escena, configTimer) {
        this.escena = escena
        this.timer = escena.time.addEvent(configTimer)
        this.configTimer = configTimer
    }

    crearTimer() {
        return this.timer
    }

    parpadeoLinea(linea) {
        linea.visible = !linea.visible
    }

    reiniciar() {
        this.timer.reset(this.configTimer)
    }

    eliminarTimer() {
        this.timer.remove()
    }
}

export function repeticionAnimacion(escena, configTimer) {
    return escena.time.addEvent(configTimer)

}
