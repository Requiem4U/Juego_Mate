import '../css/btn_pantalla_inicio.css'

export default function BtnPantallainicio({txtContenido, funcionClick}){
    return(
        <>
        <button className='btnPantallaInicio'>{txtContenido}</button>
        </>
    )

}