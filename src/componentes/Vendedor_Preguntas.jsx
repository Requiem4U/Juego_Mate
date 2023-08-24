import '../css/vendedor_Preguntas.css'

export default function Vendedor_Preguntas(){
    
    return(
        <>
        <div id="fondoVendedor"className='contenedor_fondo_vendedor'>
            <div className="img_vendedor"></div>
            <div className='background_respuesta'>
                <div id="respuesta" className='texto_respuesta'contentEditable></div>
            </div>
            <div id="txtContexto" className='contexto'></div>
        </div>
        </>
    )
}