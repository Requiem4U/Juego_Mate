import Phaser from 'phaser'
import { crearAnimacion } from "./manejador_elementos_escena";

// Sprites Personajes
import _sprites_mujer from '../../assets/Personajes/Mujer_Style_Sheets_128x128.png'
import _sprites_hombre from '../../assets/Personajes/Hombre_Style_Sheets_128x128.png'
import _sprites_juan_cupul from '../../assets/Personajes/Juan_C_Sprite_Style_Sheets.png'
import _sprite_vendedor_mapa from '../../assets/Personajes/Vendedor_Style_Sheet_128x128.png'
import _sprite_globo_dialogo from '../../assets/Personajes/GloboDialogo.png'
import _sprite_vendedor_tienda from '../../assets/Personajes/Vendedor_PP_Style_Sheet.png'
import _sprite_minijuego_pantalla_inicio from '../../assets/Fondos/MiniJuego_Pantalla_Inicio.png'

//Banners
import _banner_dialogos from '../../assets/Banners/Banner_General_Textos.png'
import _banner_contextos from '../../assets/Banners/Baner_Contextos_Vendedor.png'

//Fondos
import _fondo_pantalla_incio from '../../assets/Fondos/Fondo_Pantalla_Inicio.jpg'
import _fondo_minijuego_principal from '../../assets/Fondos/MiniJuego_Pantalla_Inicio.png'
import _fondo_vegetacion from '../../assets/Fondos/Fondo_Seleccionar_Personaje.jpg'
import _fondo_interior_casa_juan from '../../assets/Fondos/Interior_Casa_Juan_Cupul.jpg'
import _fondo_exterior_casa_juan from '../../assets/Fondos/Fondo_Camino_Normal_S.jpg'
import _fondo_area_33 from '../../assets/Fondos/Fondo_A33.png'
import _fondo_area_35 from '../../assets/Fondos/Fondo_A35.png'
import _fondo_basta_mate from '../../assets/Fondos/Fondo_Basta_Matematico.png'

// Casas
import _casa_juan from '../../assets/Objetos/Casas/Casa_JP_Exterior.png'
import _casa_milpa from '../../assets/Objetos/Casas/Casa_Milpa.png'

// Decoración
import _machete_1 from "../../assets/Objetos/Armas/Machete_Juan.png"
import _arbo_l from "../../assets/Objetos/Decoracion/Arbol_1.png"
import _cama_1 from "../../assets/Objetos/Decoracion/Cama_1.png"
import _cubeta_1 from "../../assets/Objetos/Decoracion/Cubeta_1.png"
import _mesa_1 from "../../assets/Objetos/Decoracion/Mesa_1.png"
import _mesa_2 from "../../assets/Objetos/Decoracion/mesa3.png"
import _pozo_1 from "../../assets/Objetos/Decoracion/Pozo_1.png"
import _ropero_1 from "../../assets/Objetos/Decoracion/Ropero_1.png"
import _silla_1 from "../../assets/Objetos/Decoracion/Silla_1.png"

//Complementos
import _sprite_cesta_vendedor from '../../assets/Personajes/Cesta_Vendedor_Style_Sheet.png'
import _sprite_ojos_gato from '../../assets/Personajes/Ojos_Gato_Vendedor_Style_Sheet.png'


export class PrecargaImagenes extends Phaser.Scene {

    constructor() {
        super({ key: 'precarga_imagenes' })
    }

    preload () {
        // Sprites
        this.load.spritesheet('_sprites_mujer', _sprites_mujer, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_hombre', _sprites_hombre, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprites_juan_cupul', _sprites_juan_cupul, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprite_vendedor', _sprite_vendedor_mapa, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprite_globo_dialogo', _sprite_globo_dialogo, { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('_sprite_vendedor_tienda', _sprite_vendedor_tienda, { frameWidth: 208, frameHeight: 234 })
        this.load.spritesheet('_sprite_minijuego_pantalla_inicio', _sprite_minijuego_pantalla_inicio, { frameWidth: 768, frameHeight: 432 })

        //Banners
        this.load.image('_banner_dialogos', _banner_dialogos)
        this.load.image('_banner_contextos', _banner_contextos)

        //Fondos
        this.load.image('_fondo_pantalla_incio', _fondo_pantalla_incio)
        this.load.image('_fondo_minijuego_principal', _fondo_minijuego_principal)
        this.load.image('_fondo_vegetacion', _fondo_vegetacion)
        this.load.image('_fondo_interior_casa_juan', _fondo_interior_casa_juan)
        this.load.image('_fondo_exterior_casa_juan', _fondo_exterior_casa_juan)
        this.load.image('_fondo_area_33', _fondo_area_33)
        this.load.image('_fondo_area_35', _fondo_area_35)
        this.load.image('_fondo_basta_mate', _fondo_basta_mate)

        // Casas
        this.load.image('_casa_juan', _casa_juan)
        this.load.image('_casa_milpa', _casa_milpa)

        // Decoración
        this.load.image('_machete_1', _machete_1)
        this.load.image('_arbol_1', _arbo_l)
        this.load.image('_cama_1', _cama_1)
        this.load.image('_cubeta_1', _cubeta_1)
        this.load.image('_mesa_1', _mesa_1)
        this.load.image('_mesa_2', _mesa_2)
        this.load.image('_pozo_1', _pozo_1)
        this.load.image('_ropero_1', _ropero_1)
        this.load.image('_silla_1', _silla_1)

        //Complementos
        this.load.spritesheet('_sprite_cesta_vendedor', _sprite_cesta_vendedor, { frameWidth: 208, frameHeight: 291 })
        this.load.spritesheet('_sprite_ojos_gato', _sprite_ojos_gato, { frameWidth: 208, frameHeight: 291 })
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

        crearAnimacion(this, '_sprite_globo_dialogo', 'idle_dialogo', 0, 4, { frecuencia_frames: 5.5, repeticion: 0 });
        crearAnimacion(this, '_sprite_vendedor', 'idle_vendedor', 0, 9, 5);

        crearAnimacion(this, '_sprite_vendedor_tienda', 'idle_vendedro_tienda', 0, 8, { frecuencia_frames: 7, repeticion: 0 })
        crearAnimacion(this, '_sprite_ojos_gato', 'animacion_ojos_gato', 0, 6, { frecuencia_frames: 6, repeticion: 0 })
        crearAnimacion(this, '_sprite_cesta_vendedor', 'idle_cesta', 0, 6, { frecuencia_frames: 5 })

        this.scene.start('game')
        //this.scene.start('pantalla_inicio')
        //this.scene.start('area_32_interior')
        //this.scene.start('area_35', { entrada: 'der' })
        //this.scene.start('area_04', { entrada: 'arriba' })
        //this.scene.start('basta_matematico')
        //this.scene.start('vendedor_pantalla_principal')
        //this.scene.start('pantalla_preguntas')
    }

    update () {

    }
}