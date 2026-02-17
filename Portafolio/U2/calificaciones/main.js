// Esperamos a que el DOM esté cargado para evitar errores de lectura de elementos
document.addEventListener('DOMContentLoaded', () => {

    // Referencias a los botones
    const btnCalcular = document.getElementById('btnCalcular');
    const btnLimpiar = document.getElementById('btnLimpiar');

    // Referencias a los inputs de entrada
    const inputNombre = document.getElementById('nombre');
    const inputU1 = document.getElementById('u1');
    const inputU2 = document.getElementById('u2');
    const inputU3 = document.getElementById('u3');

    // Referencias a los inputs de salida (readonly)
    const outputPromedio = document.getElementById('promedio');
    const outputEstatus = document.getElementById('estatus');

    // Función principal para calcular el promedio (Lógica del lado del cliente para Git)
    btnCalcular.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        const u1 = parseFloat(inputU1.value);
        const u2 = parseFloat(inputU2.value);
        const u3 = parseFloat(inputU3.value);

        // 1. Validamos que los campos tengan información y sean números válidos
        if (!nombre || isNaN(u1) || isNaN(u2) || isNaN(u3)) {
            alert('Por favor completa todos los campos con calificaciones válidas');
            return;
        }

        // 2. Cálculo del promedio
        const promedio = (u1 + u2 + u3) / 3;
        
        // 3. Determinamos el estatus (Aprobado >= 8 según el estándar de la UTC)
        let estatus = '';
        if (promedio >= 8) {
            estatus = 'APROBADO';
        } else {
            estatus = 'REPROBADO';
        }

        // 4. Actualizamos la interfaz directamente
        outputPromedio.value = promedio.toFixed(2);
        outputEstatus.value = estatus;
    });

    // Función para limpiar el formulario
    btnLimpiar.addEventListener('click', () => {
        inputNombre.value = '';
        inputU1.value = '';
        inputU2.value = '';
        inputU3.value = '';
        outputPromedio.value = '';
        outputEstatus.value = 'Esperando datos...';
    });

});
