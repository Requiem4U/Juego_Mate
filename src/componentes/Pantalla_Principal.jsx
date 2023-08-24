
import '../css/pantalla_principal.css'
import '../css/btn_opcion_inicioJuego.css'
import '../css/btn_opcion_inicio.css'

import BtnEditable from './Btn_Editable';

export default function PantallaPrincipal() {
  return (
    <>
      <div className="contenedorInicio">
        <div className="bannerTitulo"> <span>Conquista Matemática</span></div>

        <div className="contenedorElementosOpcion">
            <div className="contenedorOpciones">
              <BtnEditable nombreClaseCss='btnPantallaInicio' txtContenido="Jugar"></BtnEditable>
              <BtnEditable nombreClaseCss='btnPantallaInicio' txtContenido="Cargar"></BtnEditable>
              <BtnEditable nombreClaseCss='btnPantallaInicio' txtContenido="Salir"></BtnEditable>
            </div>
        </div>

        <BtnEditable nombreClaseCss='btnConfiguracion'></BtnEditable>
        <BtnEditable nombreClaseCss='btnAyuda'></BtnEditable>
      </div>
    </>
  );
}
