document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('tipoConversion');
    const lblMonto = document.getElementById('lblMonto');
    const lblTasa = document.getElementById('lblTasa');
    const inputMonto = document.getElementById('monto');
    const inputTasa = document.getElementById('tipoCambio');
    const btnCalcular = document.getElementById('btnCalcular');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const output = document.getElementById('resultado');

    // Actualizar etiquetas según selección
    function actualizarEtiquetas() {
        if (selector.value === 'mxn-usd') {
            lblMonto.textContent = 'Ingresa los pesos mexicanos';
            lblTasa.textContent = 'Ingresa el valor del dólar (Ej. 17.17)';
            inputMonto.placeholder = 'Cantidad en MXN';
        } else {
            lblMonto.textContent = 'Ingresa los dólares USD';
            lblTasa.textContent = 'Ingresa el valor del dólar (Ej. 17.17)';
            inputMonto.placeholder = 'Cantidad en USD';
        }
        output.value = '';
    }

    selector.addEventListener('change', actualizarEtiquetas);
    actualizarEtiquetas(); // Estado inicial

    // Lógica de conversión
    btnCalcular.addEventListener('click', () => {
        const monto = parseFloat(inputMonto.value);
        const tasa = parseFloat(inputTasa.value);

        if (isNaN(monto) || isNaN(tasa) || monto <= 0 || tasa <= 0) {
            alert('❌ Ingresa valores numéricos válidos mayores a cero.');
            return;
        }

        let resultado;
        let moneda;

        if (selector.value === 'mxn-usd') {
            // Pesos → Dólares: (cantidad en pesos) / (precio del dólar)
            resultado = monto / tasa;
            moneda = 'USD';
        } else {
            // Dólares → Pesos: (cantidad en dólares) * (precio del dólar)
            resultado = monto * tasa;
            moneda = 'MXN';
        }

        // Formato con dos decimales
        output.value = `${resultado.toFixed(2)} $ ${moneda}`;
    });

    // Limpiar campos
    btnLimpiar.addEventListener('click', () => {
        inputMonto.value = '';
        inputTasa.value = '';
        output.value = '';
    });
});