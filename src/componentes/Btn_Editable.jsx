
export default function BtnEditable({
  txtContenido,
  nombreClaseCss,
  funcionClick,
}) {
  return (
    <>
      <button className={nombreClaseCss} onClick={funcionClick}>{txtContenido}</button>
    </>
  );
}
