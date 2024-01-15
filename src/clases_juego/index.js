import Phaser from "phaser";
import { _lista_escenas } from "./manejadores/importador_escenas";

window.onload = () => {

  const phaserGame = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1548,
    height: 792,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
      createContainer: true
    },
    parent: "contenedor_juego",
    scene: _lista_escenas,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    backgroundColor: "#000000",
  });
}