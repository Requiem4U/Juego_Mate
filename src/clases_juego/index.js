import { Game } from './entornoPruebas.js';
import { Escena_Seleccion_Personaje } from './seleccion_personaje/seleccion_personaje.js';
import { Escena_Confirmacion_Seleccion_Personaje } from './seleccion_personaje/confirmacion_seleccion_personaje.js';
import { Escena_Vendedor_Pantalla_Principal } from './vendedor/pantalla_principal_vendedor.js';
import { Interior_Casa_Juan } from './historia/casa_juan_interior.js';
import { Exterior_Casa_Juan } from './historia/casa_juan_exterior.js';
import { Pantalla_Inicio } from './pantalla_inicio_juego.js';
import { Mapa_Parte_1 } from './historia/mapa_parte_1.js';

window.onload = ()=>{

  const config = {
    type: Phaser.AUTO,
    width: 1536,
    height: 792,
    scale:{
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'contenedor_juego',
    scene: [Game,Pantalla_Inicio,Escena_Seleccion_Personaje, Escena_Confirmacion_Seleccion_Personaje, Interior_Casa_Juan, Escena_Vendedor_Pantalla_Principal, 
          Exterior_Casa_Juan, Mapa_Parte_1],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    }
  }

  let game = new Phaser.Game(config);
}