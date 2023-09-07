import { Game } from './game.js';
import { Escena_Seleccion_Personaje } from './seleccion_personaje/seleccion_personaje.js';
import { Escena_Confirmacion_Seleccion_Personaje } from './seleccion_personaje/confirmacion_seleccion_personaje.js';
import { Escena_Vendedor_Pantalla_Principal } from './vendedor/pantalla_principal_vendedor.js';

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
    scene: [Escena_Seleccion_Personaje, Escena_Confirmacion_Seleccion_Personaje, Escena_Vendedor_Pantalla_Principal],
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