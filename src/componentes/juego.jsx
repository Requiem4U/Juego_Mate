import React, { useEffect, useState } from "react";

import "../css/juego.css";

export default function Juego() {
  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { Juego } = await import("../clases_juego/entornoPruebas.js");

      const phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1536,
        height: 792,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        parent: "contenedor_juego",
        scene: [Juego],
        pixelArt: true,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        backgroundColor: '#000000'
      });

    }

    initPhaser()

  }, []);

  return (
    <>
      <div id="contenedor_juego" key='contenedor_juego' className="contenedorJuego"></div>
    </>
  );
}
