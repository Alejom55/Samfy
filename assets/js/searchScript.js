
// Función para realizar la filtración
function aceptarFiltros(apartments) {
    console.log(apartments)
}
function filtrar(apartments) {
    // Obtener valores seleccionados
    const barrio = document.getElementById('selectBarrio').value;
    const habitaciones = document.getElementById('selectHabitaciones').value;
    // Obtener otros valores según sea necesario

    // Filtrar los resultados según los criterios seleccionados
    const resultadosFiltrados = apartments.apartamentos.filter(apartment => {
        return (
            (barrio === '' || apartment.barrio === barrio) &&
            (habitaciones === '' || apartment.habitaciones.toString() === habitaciones)
            // Añade más condiciones según tus criterios de filtrado
        );
    });

    // Vuelve a renderizar la tabla con los resultados filtrados
    // renderizarTabla(resultadosFiltrados);
}

// Función para restablecer los filtros
function resetearFiltros(apartments) {
    // Restablecer valores de los selects
    document.getElementById('selectBarrio').value = '';
    document.getElementById('selectHabitaciones').value = '';
    // Restablecer otros selects según sea necesario

    // Renderizar la tabla con todos los resultados
    renderizarTabla(apartments.apartamentos);
}

// Función para renderizar la tabla con los resultados proporcionados
function renderizarTabla(resultados) {
    const tbody = document.querySelector('#datatable-search');
    tbody.innerHTML = ''; // Limpiar el contenido existente

    resultados.forEach(function (apartment) {
        // Renderizar cada fila con los resultados filtrados
        tbody.innerHTML += `
      <tr>
        <td style="padding-left: 2rem;">${apartment.imagen}</td>
        <td>${apartment.barrio}</td>
        <td>${apartment.dueño}</td>
        <td>${apartment.area_m2}</td>
        <td>${apartment.habitaciones}</td>
        <td>${apartment.baños}</td>
        <td>${apartment.negociable ? 'Sí' : 'No'}</td>
        <td>${apartment.precio}</td>
      </tr>
    `;
    });
}

// Renderizar la tabla inicialmente con todos los resultados
// renderizarTabla(apartments.apartamentos);
