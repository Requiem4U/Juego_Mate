import { useEffect } from "react";

import "./css/juego.css";

export default function Juego() {
	useEffect(() => {
		async function initPhaser() {
			const Phaser = await import("phaser");
			const { _lista_escenas } = await import("./clases_juego/manejadores/importador_escenas");

			const phaserGame = new Phaser.Game({
				type: Phaser.AUTO,
				width: 1548,
				height: 792,
				scale: {
					mode: Phaser.Scale.FIT,
					autoCenter: Phaser.Scale.CENTER_BOTH,
				},
				dom: {
					createContainer: true,
				},
				parent: "contenedor_juego",
				scene: _lista_escenas,
				physics: {
					default: "arcade",
					arcade: {
						gravity: { y: 0 },
						debug: false,
					},
				},
				backgroundColor: "#000000",
			});
		}
		initPhaser();
	}, []);

	return (
		<>
			<div
				id="contenedor_juego"
				key="contenedor_juego"
				className="contenedorJuego"
			></div>
		</>
	);
}
