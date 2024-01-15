import Phaser from 'phaser'
import { crearAnimacion } from "./manejador_elementos_escena";

// Sprites
import _sprite_cesta_vendedor from '../../assets/Personajes/Cesta_Vendedor_Style_Sheet.png'
import _sprites_filberto from '../../assets/Personajes/Filberto_Style_Sheets_128x128.png'
import _sprites_gallina_1 from '../../assets/Personajes/Gallina_Sheet_1.png'
import _sprites_gallina_2 from '../../assets/Personajes/Gallina_Sheet_2.png'
import _sprites_gallina_3 from '../../assets/Personajes/Gallina_Sheet_3.png'
import _sprites_gallina_4 from '../../assets/Personajes/Gallina_Sheet_4.png'
import _sprites_globo_dialogo_guardar from '../../assets/Personajes/Globo_Dialogo_Guardar.png'
import _sprite_globo_dialogo from '../../assets/Personajes/GloboDialogo.png'
import _sprites_guardar_pio from '../../assets/Personajes/Guardar_Pio_Sheet.png'
import _sprites_hombre from '../../assets/Personajes/Hombre_Style_Sheets_128x128.png'
import _sprites_juan_cupul from '../../assets/Personajes/Juan_C_Sprite_Style_Sheets.png'
import _sprites_mujer from '../../assets/Personajes/Mujer_Style_Sheets_128x128.png'
import _sprites_novia_juan from '../../assets/Personajes/Novia_Sprite_Sheet.png'
import _sprite_ojos_gato from '../../assets/Personajes/Ojos_Gato_Vendedor_Style_Sheet.png'
import _sprites_pavo_1 from '../../assets/Personajes/Pavo_Sheet_1.png'
import _sprites_pollito_1 from '../../assets/Personajes/Pollito_Sheet_1.png'
import _sprites_puerquito_1 from '../../assets/Personajes/Puerquito_Sheet_1.png'
import _sprites_puerquito_2 from '../../assets/Personajes/Puerquito_Sheet_2.png'
import _sprite_vendedor_mapa from '../../assets/Personajes/Vendedor_Style_Sheet_128x128.png'
import _sprite_vendedor_tienda from '../../assets/Personajes/Vendedor_PP_Style_Sheet.png'

//Banners
import _banner_dialogos from '../../assets/Banners/Banner_General_Textos.png'
import _banner_contextos from '../../assets/Banners/Baner_Contextos_Vendedor.png'

//Fondos
import _fondo_area_02 from '../../assets/Fondos/Fondo_A02.png'
import _fondo_area_03 from '../../assets/Fondos/Fondo_A03.png'
import _fondo_area_04 from '../../assets/Fondos/Fondo_A04.png'
import _fondo_area_05 from '../../assets/Fondos/Fondo_A05.png'
import _fondo_area_06 from '../../assets/Fondos/Fondo_A06.png'
import _fondo_area_08 from '../../assets/Fondos/Fondo_A08.png'
import _fondo_area_13 from '../../assets/Fondos/Fondo_A13.png'
import _fondo_area_14 from '../../assets/Fondos/Fondo_A14.png'
import _fondo_area_16 from '../../assets/Fondos/Fondo_A16.png'
import _fondo_area_17 from '../../assets/Fondos/Fondo_A17.png'
import _fondo_area_22 from '../../assets/Fondos/Fondo_A22.png'
import _fondo_area_23 from '../../assets/Fondos/Fondo_A23.png'
import _fondo_area_24 from '../../assets/Fondos/Fondo_A24.png'
import _fondo_area_25 from '../../assets/Fondos/Fondo_A25.png'
import _fondo_area_26 from '../../assets/Fondos/Fondo_A26.png'
import _fondo_area_28 from '../../assets/Fondos/Fondo_A28.png'
import _fondo_area_30 from '../../assets/Fondos/Fondo_A30.png'
import _fondo_area_31 from '../../assets/Fondos/Fondo_A31.png'
import _fondo_area_32 from '../../assets/Fondos/Fondo_A32.jpg'
import _fondo_area_33 from '../../assets/Fondos/Fondo_A33.png'
import _fondo_area_34 from '../../assets/Fondos/Fondo_A34.png'
import _fondo_area_35 from '../../assets/Fondos/Fondo_A35.png'
import _fondo_basta_mate from '../../assets/Fondos/Fondo_Basta_Matematico.png'
import _fondo_pantalla_incio from '../../assets/Fondos/Fondo_Pantalla_Inicio.jpg'
import _fondo_vegetacion from '../../assets/Fondos/Fondo_Seleccionar_Personaje.jpg'
import _fondo_formularios from '../../assets/Fondos/Fondo_Formularios.png'
import _fondo_instrucciones_preguntas from '../../assets/Fondos/InstruccionesPreguntas.png'
import _fondo_interior_casa_juan from '../../assets/Fondos/Interior_Casa_Juan_Cupul.jpg'
import _fondo_vendedor_tienda from '../../assets/Fondos/Fondo_Vendedor.png'
import _instruccion_basta_1 from '../../assets/Fondos/Instrucciones_Basta_1.jpg'
import _instruccion_basta_2 from '../../assets/Fondos/Instrucciones_Basta_2.jpg'
import _instruccion_basta_3 from '../../assets/Fondos/Instrucciones_Basta_3.jpg'
import _instruccion_basta_4 from '../../assets/Fondos/Instrucciones_Basta_4.jpg'
import _sprite_minijuego_pantalla_inicio from '../../assets/Fondos/MiniJuego_Pantalla_Inicio.png'
import _pantalla_narracion from '../../assets/Fondos/Narracion.jpg'
import _pantalla_controles from '../../assets/Fondos/Pantalla_Controles.png'
import _vidrio from '../../assets/Fondos/vidrio.png'

// Casas
import _casa_juan from '../../assets/Objetos/Casas/Casa_JP_Exterior.png'
import _casa_milpa from '../../assets/Objetos/Casas/Casa_Milpa.png'
import _casa_pueblo from '../../assets/Objetos/Casas/Casa_Pueblo.png'

//Armas
import _machete_1 from "../../assets/Objetos/Armas/Machete_Juan.png"

// Decoración
import _arbo_l from "../../assets/Objetos/Decoracion/Arbol_1.png"
import _arbo_2 from "../../assets/Objetos/Decoracion/Arbol_2.png"
import _arbo_3 from "../../assets/Objetos/Decoracion/Arbol_3.png"
import _arbo_4 from "../../assets/Objetos/Decoracion/Arbol_4.png"
import _arbo_5 from "../../assets/Objetos/Decoracion/Arbol_5.png"
import _arbo_6 from "../../assets/Objetos/Decoracion/Arbol_6.png"
import _arbo_7 from "../../assets/Objetos/Decoracion/Arbol_7.png"
import _arbo_8 from "../../assets/Objetos/Decoracion/Arbol_8.png"
import _arbo_centro from "../../assets/Objetos/Decoracion/Arbol_Centro.png"
import _arbo_naranjas from "../../assets/Objetos/Decoracion/Arbol_Naranjas.png"
import _barda_1 from "../../assets/Objetos/Decoracion/Barda_1.png"
import _bomba_1 from "../../assets/Objetos/Decoracion/Bomba_1.png"
import _caja_naranjas_1 from "../../assets/Objetos/Decoracion/Caja_Naranjas_1.png"
import _caja_verduras_1 from "../../assets/Objetos/Decoracion/Caja_Verduras_1.png"
import _caja_verduras_2 from "../../assets/Objetos/Decoracion/Caja_Verduras_2.png"
import _cama_1 from "../../assets/Objetos/Decoracion/Cama_1.png"
import _craneo_1 from "../../assets/Objetos/Decoracion/Craneo_1.png"
import _cubeta_1 from "../../assets/Objetos/Decoracion/Cubeta_1.png"
import _cubeta_2 from "../../assets/Objetos/Decoracion/Cubeta_2.png"
import _herramientas_1 from "../../assets/Objetos/Decoracion/Herramientas_1.png"
import _lavadero_1 from "../../assets/Objetos/Decoracion/Lavadero_1.png"
import _lenia_1 from "../../assets/Objetos/Decoracion/Leña_1.png"
import _letrero_1 from "../../assets/Objetos/Decoracion/Letrero_1.png"
import _maceta_1 from "../../assets/Objetos/Decoracion/Maceta_1.png"
import _maiz_1 from "../../assets/Objetos/Decoracion/Maiz_1.png"
import _mesa_1 from "../../assets/Objetos/Decoracion/Mesa_1.png"
import _mesa_2 from "../../assets/Objetos/Decoracion/mesa3.png"
import _piedra_1 from "../../assets/Objetos/Decoracion/Piedra_1.png"
import _piedra_2 from "../../assets/Objetos/Decoracion/Piedra_2.png"
import _piedra_3 from "../../assets/Objetos/Decoracion/Piedra_3.png"
import _pozo_1 from "../../assets/Objetos/Decoracion/Pozo_1.png"
import _rabano_blanco_1 from "../../assets/Objetos/Decoracion/Rabano_Blanco_1.png"
import _rabano_rojo_1 from "../../assets/Objetos/Decoracion/Rabano_Rojo_1.png"
import _ropero_1 from "../../assets/Objetos/Decoracion/Ropero_1.png"
import _saco_1 from "../../assets/Objetos/Decoracion/Saco_1.png"
import _silla_1 from "../../assets/Objetos/Decoracion/Silla_1.png"
import _tomates_1 from "../../assets/Objetos/Decoracion/Tomates_1.png"
import _vela_1 from "../../assets/Objetos/Decoracion/Vela_1.png"
import _zanahoria_1 from "../../assets/Objetos/Decoracion/Zanahoria_1.png"


export class PrecargaImagenes extends Phaser.Scene {

    constructor() {
        super({ key: 'precarga_imagenes' })
    }

    preload () {
        // Sprites
        this.load.spritesheet('_sprite_cesta_vendedor', _sprite_cesta_vendedor, { frameWidth: 208, frameHeight: 291 })
        this.load.spritesheet('_sprites_filberto', _sprites_filberto, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_gallina_1', _sprites_gallina_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_gallina_2', _sprites_gallina_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_gallina_3', _sprites_gallina_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_gallina_4', _sprites_gallina_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_globo_dialogo_guardar', _sprites_globo_dialogo_guardar, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprite_globo_dialogo', _sprite_globo_dialogo, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_guardar_pio', _sprites_guardar_pio, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_hombre', _sprites_hombre, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_juan_cupul', _sprites_juan_cupul, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_mujer', _sprites_mujer, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_novia_juan', _sprites_novia_juan, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprite_ojos_gato', _sprite_ojos_gato, { frameWidth: 208, frameHeight: 291 })
        this.load.spritesheet('_sprites_pavo_1', _sprites_pavo_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_pollito_1', _sprites_pollito_1, { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('_sprites_puerquito_1', _sprites_puerquito_1, { frameWidth: 96, frameHeight: 96 })
        this.load.spritesheet('_sprites_puerquito_2', _sprites_puerquito_2, { frameWidth: 96, frameHeight: 96 })
        this.load.spritesheet('_sprite_vendedor_tienda', _sprite_vendedor_tienda, { frameWidth: 208, frameHeight: 234 })
        this.load.spritesheet('_sprite_vendedor', _sprite_vendedor_mapa, { frameWidth: 128, frameHeight: 128 })

        //Banners
        this.load.image('_banner_dialogos', _banner_dialogos)
        this.load.image('_banner_contextos', _banner_contextos)

        //Fondos
        this.load.image('_fondo_area_02', _fondo_area_02)
        this.load.image('_fondo_area_03', _fondo_area_03)
        this.load.image('_fondo_area_04', _fondo_area_04)
        this.load.image('_fondo_area_05', _fondo_area_05)
        this.load.image('_fondo_area_06', _fondo_area_06)
        this.load.image('_fondo_area_08', _fondo_area_08)
        this.load.image('_fondo_area_13', _fondo_area_13)
        this.load.image('_fondo_area_14', _fondo_area_14)
        this.load.image('_fondo_area_16', _fondo_area_16)
        this.load.image('_fondo_area_17', _fondo_area_17)
        this.load.image('_fondo_area_22', _fondo_area_22)
        this.load.image('_fondo_area_23', _fondo_area_23)
        this.load.image('_fondo_area_24', _fondo_area_24)
        this.load.image('_fondo_area_25', _fondo_area_25)
        this.load.image('_fondo_area_26', _fondo_area_26)
        this.load.image('_fondo_area_28', _fondo_area_28)
        this.load.image('_fondo_area_30', _fondo_area_30)
        this.load.image('_fondo_area_31', _fondo_area_31)
        this.load.image('_fondo_area_32', _fondo_area_32)
        this.load.image('_fondo_area_33', _fondo_area_33)
        this.load.image('_fondo_area_34', _fondo_area_34)
        this.load.image('_fondo_area_35', _fondo_area_35)
        this.load.image('_fondo_basta_mate', _fondo_basta_mate)
        this.load.image('_fondo_pantalla_incio', _fondo_pantalla_incio)
        this.load.image('_fondo_vegetacion', _fondo_vegetacion)
        this.load.image('_fondo_vendedor_tienda', _fondo_vendedor_tienda)
        this.load.image('_fondo_formularios', _fondo_formularios)
        this.load.image('_fondo_instrucciones_preguntas', _fondo_instrucciones_preguntas)
        this.load.image('_fondo_interior_casa_juan', _fondo_interior_casa_juan)
        this.load.image('_instruccion_basta_1', _instruccion_basta_1)
        this.load.image('_instruccion_basta_2', _instruccion_basta_2)
        this.load.image('_instruccion_basta_3', _instruccion_basta_3)
        this.load.image('_instruccion_basta_4', _instruccion_basta_4)
        this.load.spritesheet('_sprite_minijuego_pantalla_inicio', _sprite_minijuego_pantalla_inicio, { frameWidth: 768, frameHeight: 432 })
        this.load.image('_pantalla_narracion', _pantalla_narracion)
        this.load.image('_pantalla_controles', _pantalla_controles)
        this.load.image('_vidrio', _vidrio)

        // Casas
        this.load.image('_casa_juan', _casa_juan)
        this.load.image('_casa_milpa', _casa_milpa)
        this.load.image('_casa_pueblo', _casa_pueblo)

        //Armas
        this.load.image('_machete_1', _machete_1)

        // Decoración
        this.load.image('_arbol_1', _arbo_l)
        this.load.image('_arbol_2', _arbo_2)
        this.load.image('_arbol_3', _arbo_3)
        this.load.image('_arbol_4', _arbo_4)
        this.load.image('_arbol_5', _arbo_5)
        this.load.image('_arbol_6', _arbo_6)
        this.load.image('_arbol_7', _arbo_7)
        this.load.image('_arbol_8', _arbo_8)
        this.load.image('_arbol_centro', _arbo_centro)
        this.load.image('_arbol_naranjas', _arbo_naranjas)
        this.load.image('_barda_1', _barda_1)
        this.load.image('_bomba_1', _bomba_1)
        this.load.image('_caja_naranjas_1', _caja_naranjas_1)
        this.load.image('_caja_verduras_1', _caja_verduras_1)
        this.load.image('_caja_verduras_2', _caja_verduras_2)
        this.load.image('_cama_1', _cama_1)
        this.load.spritesheet('_craneo_1', _craneo_1, { frameWidth: 133, frameHeight: 243 })
        this.load.image('_cubeta_1', _cubeta_1)
        this.load.image('_cubeta_2', _cubeta_2)
        this.load.image('_herramientas_1', _herramientas_1)
        this.load.image('_lavadero_1', _lavadero_1)
        this.load.image('_lenia_1', _lenia_1)
        this.load.image('_letrero_1', _letrero_1)
        this.load.image('_meceta_1', _maceta_1)
        this.load.image('_maiz_1', _maiz_1)
        this.load.image('_mesa_1', _mesa_1)
        this.load.image('_mesa_2', _mesa_2)
        this.load.image('_piedra_1', _piedra_1)
        this.load.image('_piedra_2', _piedra_2)
        this.load.image('_piedra_3', _piedra_3)
        this.load.image('_pozo_1', _pozo_1)
        this.load.image('_rabano_blanco_1', _rabano_blanco_1)
        this.load.image('_rabano_rojo_1', _rabano_rojo_1)
        this.load.image('_ropero_1', _ropero_1)
        this.load.image('_saco_1', _saco_1)
        this.load.image('_silla_1', _silla_1)
        this.load.image('_tomates_1', _tomates_1)
        this.load.spritesheet('_vela_1', _vela_1, { frameWidth: 120, frameHeight: 181 })
        this.load.image('_zanahoria_1', _zanahoria_1)

    }

    create () {

        // Ceación de animaciones de caminata Hombre
        crearAnimacion(this, '_sprites_hombre', 'walkDown_hombre', 0, 3);
        crearAnimacion(this, '_sprites_hombre', 'walkUp_hombre', 4, 7);
        crearAnimacion(this, '_sprites_hombre', 'walkLeft_hombre', 8, 11);
        crearAnimacion(this, '_sprites_hombre', 'walkRight_hombre', 12, 15);
        //Creación de animación Idle Hombre
        crearAnimacion(this, '_sprites_hombre', 'idleFront_hombre', 16, 19, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_hombre', 'idleBack_hombre', 20, 23, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_hombre', 'idleLeft_hombre', 24, 27, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_hombre', 'idleRight_hombre', 28, 31, { frecuencia_frames: 2.1 });

        // Ceación de animaciones de caminata Mujer
        crearAnimacion(this, '_sprites_mujer', 'walkDown_mujer', 0, 3);
        crearAnimacion(this, '_sprites_mujer', 'walkUp_mujer', 4, 7);
        crearAnimacion(this, '_sprites_mujer', 'walkLeft_mujer', 8, 11);
        crearAnimacion(this, '_sprites_mujer', 'walkRight_mujer', 12, 15);
        //Creación de animación Idle Mujer
        crearAnimacion(this, '_sprites_mujer', 'idleFront_mujer', 16, 19, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_mujer', 'idleBack_mujer', 20, 23, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_mujer', 'idleLeft_mujer', 24, 27, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_mujer', 'idleRight_mujer', 28, 31, { frecuencia_frames: 2.1 });

        // Ceación de animaciones de caminata Juan Cupul
        crearAnimacion(this, '_sprites_juan_cupul', 'walkDown_juan', 0, 3);
        crearAnimacion(this, '_sprites_juan_cupul', 'walkUp_juan', 4, 7);
        crearAnimacion(this, '_sprites_juan_cupul', 'walkLeft_juan', 8, 11);
        crearAnimacion(this, '_sprites_juan_cupul', 'walkRight_juan', 12, 15);
        //Creación de animación Idle Juan Cupul
        crearAnimacion(this, '_sprites_juan_cupul', 'idleFront_juan', 16, 19, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_juan_cupul', 'idleBack_juan', 20, 23, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_juan_cupul', 'idleLeft_juan', 24, 27, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_juan_cupul', 'idleRight_juan', 28, 31, { frecuencia_frames: 2.1 });

        // Ceación de animaciones de caminata Filberto
        crearAnimacion(this, '_sprites_filberto', 'walkDown_filberto', 0, 3);
        crearAnimacion(this, '_sprites_filberto', 'walkUp_filberto', 4, 7);
        crearAnimacion(this, '_sprites_filberto', 'walkLeft_filberto', 8, 11);
        crearAnimacion(this, '_sprites_filberto', 'walkRight_filberto', 12, 15);
        //Creación de animación Idle Filberto
        crearAnimacion(this, '_sprites_filberto', 'idleFront_filberto', 16, 19, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_filberto', 'idleBack_filberto', 20, 23, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_filberto', 'idleLeft_filberto', 24, 27, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_filberto', 'idleRight_filberto', 28, 31, { frecuencia_frames: 2.1 });

        // Ceación de animaciones de caminata Filberto
        crearAnimacion(this, '_sprites_novia_juan', 'walkDown_novia_juan', 0, 3);
        crearAnimacion(this, '_sprites_novia_juan', 'walkUp_novia_juan', 4, 7);
        crearAnimacion(this, '_sprites_novia_juan', 'walkLeft_novia_juan', 8, 11);
        crearAnimacion(this, '_sprites_novia_juan', 'walkRight_novia_juan', 12, 15);
        //Creación de animación Idle Filberto
        crearAnimacion(this, '_sprites_novia_juan', 'idleFront_novia_juan', 16, 19, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_novia_juan', 'idleBack_novia_juan', 20, 23, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_novia_juan', 'idleLeft_novia_juan', 24, 27, { frecuencia_frames: 2.1 });
        crearAnimacion(this, '_sprites_novia_juan', 'idleRight_novia_juan', 28, 31, { frecuencia_frames: 2.1 });


        // Animaciones de animales



        // Otras animaciones
        crearAnimacion(this, '_sprite_globo_dialogo', 'idle_dialogo', 0, 4, { frecuencia_frames: 5.5, repeticion: 0 });
        crearAnimacion(this, '_sprite_vendedor', 'idle_vendedor', 0, 9, 5);

        crearAnimacion(this, '_sprite_vendedor_tienda', 'idle_vendedro_tienda', 0, 8, { frecuencia_frames: 7, repeticion: 0 })
        crearAnimacion(this, '_sprite_ojos_gato', 'animacion_ojos_gato', 0, 6, { frecuencia_frames: 6, repeticion: 0 })
        crearAnimacion(this, '_sprite_cesta_vendedor', 'idle_cesta', 0, 6, { frecuencia_frames: 5 })

        crearAnimacion(this, '_sprite_minijuego_pantalla_inicio', 'animacion_minijuego_inicio', 0, 18, { frecuencia_frames: 6 })

        // Animaciones Decoraciones
        crearAnimacion(this, '_vela_1', 'idle_vela_1', 0, 3, { frecuencia_frames: 5 })
        crearAnimacion(this, '_craneo_1', 'idle_craneo_1', 0, 3, { frecuencia_frames: 5 })

        this.scene.start('LoginScene')
    }

    update () {

    }
}