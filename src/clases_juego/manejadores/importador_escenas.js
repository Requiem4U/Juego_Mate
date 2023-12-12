
import { PrecargaImagenes } from "./importadorImagenes.js"
import { Juego } from "../entornoPruebas.js"
import { Escena_Seleccion_Personaje } from "../seleccion_personaje/seleccion_personaje.js"
import { Pantalla_Inicio } from "../pantalla_inicio_juego.js"
import { Escena_Confirmacion_Seleccion_Personaje } from "../seleccion_personaje/confirmacion_seleccion_personaje.js"
import { Escena_Vendedor_Pantalla_Principal } from "../mecanicas/pantalla_principal_vendedor.js"
import { Pantalla_Preguntas } from "../mecanicas/pantalla_preguntas.js"
import { Pantalla_Basta_Matematico } from "../mecanicas/pantalla_basta_matematico.js"
import { LoginScene } from "../inicio/login.js"
import { RegistroScene } from "../inicio/registro.js"
import { agregarScene } from "../inicio/agregar_preguntas.js"
import { EleccionScene } from "../inicio/eleccion.js"
import { ver_Preguntas } from "../inicio/ver_preguntas.js"
import { Eleccion_AdminScene } from "../inicio/eleccion_admin.js"
import { ver_usuarios } from "../inicio/ver_usuarios.js"
import { instrucciones_preguntas } from "../inicio/instrucciones_preguntas.js"
import { modificarScene } from "../inicio/modificar.js"
import { posicion_guardada } from "../inicio/posiciones_guardadas.js"
import { modificarPosicionScene } from "../inicio/modificar_posicion.js"
import { ver_QTE } from "../inicio/ver_QTE.js"
import { agregarQTEScene } from "../inicio/agregar_QTE.js"
import { modificarQTEScene } from "../inicio/modificar_QTE.js"


import { Area_02 } from "../mapa/area_02.js"
import { Area_03 } from "../mapa/area_03.js"
import { Area_04 } from "../mapa/area_04.js"
import { Area_05 } from "../mapa/area_05.js"
import { Area_06 } from "../mapa/area_06.js"
import { Area_08 } from "../mapa/area_08.js"
import { Area_13 } from "../mapa/area_13.js"
import { Area_14 } from "../mapa/area_14.js"
import { Area_16 } from "../mapa/area_16.js"
import { Area_17 } from "../mapa/area_17.js"
import { Area_22 } from "../mapa/area_22.js"
import { Area_23 } from "../mapa/area_23.js"
import { Area_24 } from "../mapa/area_24.js"
import { Area_25 } from "../mapa/area_25.js"
import { Area_26 } from "../mapa/area_26.js"
import { Area_28 } from "../mapa/area_28.js"
import { Area_30 } from "../mapa/area_30.js"
import { Area_31 } from "../mapa/area_31.js"
import { Area_32 } from "../mapa/area_32.js"
import { Area_32_Interior } from "../mapa/area_32_interior.js"
import { Area_33 } from "../mapa/area_33.js"
import { Area_34 } from "../mapa/area_34.js"
import { Area_35 } from "../mapa/area_35.js"

export const _lista_escenas = [
    PrecargaImagenes, Juego, modificarScene, ver_usuarios, instrucciones_preguntas, LoginScene, RegistroScene,
    agregarScene, EleccionScene, ver_Preguntas, Eleccion_AdminScene,
    Pantalla_Inicio, Pantalla_Preguntas, Pantalla_Basta_Matematico,
    Area_02, Area_03, Area_04, Area_05, Area_06, Area_08, Area_13, Area_14, , Area_16,
    Area_17, Area_22, Area_23, Area_24, Area_25, Area_26, Area_28, Area_30,
    Area_31, Area_32, Area_32_Interior, Area_33, Area_34, Area_35,
    Escena_Vendedor_Pantalla_Principal,
    posicion_guardada, modificarPosicionScene, ver_QTE, agregarQTEScene, modificarQTEScene
]