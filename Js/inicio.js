
    // Menu para pantallas moviles
function toggleMenu() {
    const menu = document.getElementById('men');
    menu.classList.toggle('hidden');
}

// Menu clasificación 
document.getElementById('menu_clasificacion').addEventListener('click', function (event) {
    event.preventDefault();
    let menu_desplegable = document.getElementById('menu_desplegable');

    if (menu_desplegable.style.display == "block") {
        menu_desplegable.style.display = "none";
    } else {
        menu_desplegable.style.display = "block";
    }
});

// Evento para cerrar el Menu clasificación con un click en cualquier parte de la pág 
window.addEventListener('click', function (event) {
    let menu_desplegable = document.getElementById('menu_desplegable');
    if (!event.target.matches('.men_clas')) {
        menu_desplegable.style.display = "none";
    }
});

// Funcion para mostrar las imagenes en el modal
function mostrarImagen(deporte) {
    try {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        const paginacion = document.getElementById('paginacion');

        if (!modal || !modalContent) {
            console.error("No se encontro el modal o el modal-content");
            return;
        }

        modalContent.innerHTML = ""; // Limpiar el contenido previo

        const galeria = document.getElementById(deporte + '-galeria');

        if (!galeria) {
            console.error("No se escontro la galeria: " + deporte);
            return;
        }

        // Mostrar todas las imágenes de la galería sin paginación
        galeria.querySelectorAll('img').forEach(img => {
            const newImg = img.cloneNode();
            newImg.onclick = function () { expandImage(newImg); };
            modalContent.appendChild(newImg);
        });

        // Ocultar el menú de paginación
        paginacion.style.display = "none";

        // Desactivar el evento de scroll
        modalContent.removeEventListener('scroll', manejarScrollPaginacion);

        // Mostrar el modal
        modal.style.display = 'flex';

    } catch (err) {
        console.error("Ocurrio un error al mostras las imagenes del deporte: ", err);
    }
}

// Para expandir o colocar mas grande la imagen
function expandImage(img) {
    img.classList.toggle('expanded');
}

// Boton cerrar del modal
function cerrar() {
    const modal = document.getElementById('modal');
    const paginacion = document.getElementById('paginacion');
    modal.style.display = "none";
    paginacion.style.display = "none"; // Ocultar el menú de paginación al cerrar el modal
}

// Actualizar la fecha y hora
function actualizar() {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-Es', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const hora = now.toLocaleTimeString('es-Es', { hour: '2-digit', minute: '2-digit', hour12: true });
    document.getElementById('fecha-hora').innerHTML = `<p>${hora}</p><p>${fecha}</p>`;
}

// Inicializar la fecha y la hora al cargar la pagina
actualizar();
setInterval(actualizar, 60000);

// Variables globales para las funciones
let totalPaginas = 0;
let paginaActual = 1;
const imagenesPorPagina = 16;

// Funcion de paginación
function mostrarImagenesPaginadas(imagenes) {
    const modalContent = document.getElementById('modal-content');
    if (!modalContent) {
        console.error("No se encontró el modal-content");
        return;
    }
    modalContent.innerHTML = "";

    const inicio = (paginaActual - 1) * imagenesPorPagina;
    const fin = inicio + imagenesPorPagina;
    const imagenesPagina = Array.from(imagenes).slice(inicio, fin);

    imagenesPagina.forEach(img => {
        const newImg = img.cloneNode();
        newImg.onclick = function () { expandImage(newImg); };
        modalContent.appendChild(newImg);
    });

    actualizarPaginacion(imagenes.length);
}

function actualizarPaginacion(totalimagenes) {
    const paginacion = document.getElementById('paginacion');
    if (!paginacion) {
        console.error("No se encontró el elemento de paginación");
        return;
    }
    totalPaginas = Math.ceil(totalimagenes / imagenesPorPagina);

    paginacion.innerHTML = "";

    if (totalPaginas > 1) {
        // Botón anterior
        const btnAnterior = document.createElement('button');
        btnAnterior.innerText = "Anterior";
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.onclick = () => {
            if (paginaActual > 1) {
                paginaActual--;
                mostrarImagenesPaginadas(document.querySelectorAll('.galeria img'));
            }
        };
        paginacion.appendChild(btnAnterior);

        // Indicador de páginas
        const indicador = document.createElement('span');
        indicador.innerText = `Página ${paginaActual} de ${totalPaginas}`;
        paginacion.appendChild(indicador);

        // Botón siguiente
        const btnSiguiente = document.createElement('button');
        btnSiguiente.innerText = "Siguiente";
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.onclick = () => {
            if (paginaActual < totalPaginas) {
                paginaActual++;
                mostrarImagenesPaginadas(document.querySelectorAll('.galeria img'));
            }
        };
        paginacion.appendChild(btnSiguiente);
    }
}

// Mostrar la barra de paginación u ocultar
function manejarScrollPaginacion() {
    const modalContent = document.getElementById('modal-content');
    const paginacion = document.getElementById('paginacion');

    if (!paginacion || !modalContent) {
        console.error("No se encontraron los elementos de paginación o modal-content");
        return;
    }

    if (modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight) {
        paginacion.style.display = "flex";
    } else {
        paginacion.style.display = "none";
    }
}

// Función para el modal de todas las imagenes
function todasImagenes() {
    try {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        const paginacion = document.getElementById('paginacion');

        if (!modal || !modalContent) {
            console.error("No se encuentra el modal o el modal content");
            return;
        }

        const galeria = document.getElementById('galeria');

        if (!galeria) {
            console.error("No se encontró el contenedor de la galería");
            return;
        }

        paginaActual = 1;
        mostrarImagenesPaginadas(galeria.querySelectorAll('.galeria img'));

        // Mostrar el menú de paginación
        paginacion.style.display = "none"; // Inicialmente oculto
        modalContent.addEventListener('scroll', manejarScrollPaginacion);

        // Mostrar el modal
        modal.style.display = "flex";

    } catch (err) {
        console.error("Ocurrió un error al mostrar las imágenes: " + err);
    }
}