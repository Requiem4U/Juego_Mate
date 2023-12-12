import Phaser from 'phaser';
import imagen1 from '../../assets/Iconos/edit.png'
import imagen2 from '../../assets/Iconos/cleare.png'
import { apiUrl, styleButtom } from './configuracion_general';

export class ver_QTE extends Phaser.Scene {
    constructor() {
        super({ key: 'ver_QTE' });
    }

    preload () {

    }
    create () {
        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_basta_mate'
        ).setOrigin(0.5).setScale(0.756)

        this.add.image(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            '_fondo_formularios'
        ).setOrigin(0.5).setScale(1)

        this.add.text(774, 100, 'QTEs', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#000000',
        }).setOrigin(0.5);


        //Mostrar datos
        // Obtener los datos de la API
        fetch(`${apiUrl}/api/preguntas?pagination[page]=1&pagination[pageSize]=80`)
            .then(response => response.json())
            .then(data => {

                // Crear un contenedor en Phaser para la tabla
                const tableContainer = this.add.dom(20, 125).createElement('div');

                // Crear una tabla
                const table = document.createElement('table');

                // Crear encabezados de la tabla
                const headers = ['QTE', 'Contexto', 'Pregunta', 'Qué', 'Quién', 'Operaciones', 'Resultado', ' ', ' '];
                const headerRow = document.createElement('tr');
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                // Iterar sobre los datos y crear filas de la tabla
                data.data.forEach(item => {
                    const attributes = item.attributes;
                    const row = document.createElement('tr');
                    const rowData = [
                        attributes.QTE,
                        attributes.contexto,
                        attributes.pregunta,
                        attributes.que,
                        attributes.quien,
                        attributes.operaciones,
                        attributes.respuesta,
                    ];
                    rowData.forEach(cellData => {
                        const cell = document.createElement('td');
                        cell.textContent = cellData;
                        row.appendChild(cell);
                    });

                    // Agregar imágenes a la fila
                    const imgCell1 = document.createElement('td');
                    const img1 = document.createElement('img');
                    img1.src = imagen1;
                    img1.style.width = '50px';
                    img1.style.height = '50px';
                    img1.style.cursor = 'pointer';
                    img1.onclick = () => {
                        // Función que se ejecuta al hacer clic en la primera imagen
                        // Puedes acceder a item.id aquí para usarlo en la función
                        const dataString = JSON.stringify(item);
                        localStorage.setItem('itemModificarQTE', dataString)
                        this.scene.start('modificarQTEScene')
                    };
                    imgCell1.appendChild(img1);
                    row.appendChild(imgCell1);

                    const imgCell2 = document.createElement('td');
                    const img2 = document.createElement('img');
                    img2.src = imagen2;
                    img2.style.width = '70px';
                    img2.style.height = '70px';
                    img2.style.cursor = 'pointer';
                    img2.onclick = () => {
                        const rowId = item.id; // Supongamos que 'item.id' es el ID asociado a la fila

                        // Realizar la solicitud DELETE al servidor para eliminar el elemento correspondiente al ID
                        fetch(`${apiUrl}/api/preguntas/${rowId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                // Otros encabezados necesarios, como tokens de autorización, etc.
                            },
                        })
                            .then(response => {
                                if (response.ok) {
                                    // Eliminación exitosa en el servidor
                                    console.log(`Se eliminó el elemento con ID: ${rowId}`);
                                    this.scene.start('ver_QTE')
                                } else {
                                    // No se pudo eliminar el elemento en el servidor
                                    console.error(`No se pudo eliminar el elemento con ID: ${rowId}`);
                                }
                            })
                            .catch(error => {
                                // Error al realizar la solicitud DELETE
                                console.error('Error al intentar eliminar:', error);
                            });
                    };
                    imgCell2.appendChild(img2);
                    row.appendChild(imgCell2);

                    table.appendChild(row);
                });

                // Agregar estilos CSS al contenedor div
                tableContainer.node.style.marginTop = '20px'; // Ajusta el margen superior
                tableContainer.node.style.fontFamily = 'Arial, sans-serif'; // Cambia la fuente
                tableContainer.node.style.maxWidth = '1525px'; // Por ejemplo, un ancho máximo de 1450px
                tableContainer.node.style.height = '500px'; // Altura fija para la tabla
                tableContainer.node.style.overflowY = 'auto'; // Habilita el desplazamiento vertical

                // Estilos para las celdas de la tabla
                const tableCells = table.getElementsByTagName('td');
                Array.from(tableCells).forEach(cell => {
                    cell.style.border = '1px solid #dddddd'; // Establece el borde
                    cell.style.padding = '8px'; // Añade relleno
                    cell.style.maxWidth = '200px'; // Establecer un ancho máximo para las celdas, por ejemplo, 200px
                    cell.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    cell.style.overflow = 'auto';
                });

                // Estilos para los encabezados de la tabla
                const tableHeaders = table.getElementsByTagName('th');
                Array.from(tableHeaders).forEach(header => {
                    header.style.border = '1px solid #dddddd'; // Establece el borde
                    header.style.padding = '8px'; // Añade relleno
                    header.style.backgroundColor = '#f2f2f2'; // Cambia el color de fondo
                    header.style.fontStyle = 'bold';
                });

                // Agregar la tabla al contenedor
                tableContainer.node.appendChild(table);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

        const volverButton = this.add.dom(774, 700).createFromHTML(`<button style="${styleButtom}">Volver</button>`);
        volverButton.addListener('click');
        volverButton.on('click', function () {
            this.scene.start('Eleccion_Admin');
        }, this);
    }
}
export default ver_QTE;