const minWidth = 500; // Tamaño mínimo de ancho deseado
const minHeight = 350; // Tamaño mínimo de alto deseado

// Llama a la función para ajustar el tamaño de la ventana cuando se redimensiona
window.addEventListener('resize',  ()=>{
    window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
});