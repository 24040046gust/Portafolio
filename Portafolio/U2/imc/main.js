document.getElementById('btnCalcular').addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (!peso || !altura || peso <= 0 || altura <= 0) {
        alert('Por favor introduce valores válidos para peso y altura');
        return;
    }

    // --- LÓGICA QUE ANTES ESTABA EN APP.JS ---
    // Cálculo del IMC: peso / (altura * altura)
    const imc = peso / (altura * altura);
    let estatus = '';

    if (imc < 18.5) {
        estatus = 'Bajo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        estatus = 'Peso normal';
    } else if (imc >= 25 && imc <= 29.9) {
        estatus = 'Sobrepeso';
    } else {
        estatus = 'Obesidad';
    }
    // -----------------------------------------

    // Actualizamos la interfaz directamente sin usar fetch
    document.getElementById('imc').value = imc.toFixed(2);
    document.getElementById('estatus').value = estatus;
});

document.getElementById('btnLimpiar').addEventListener('click', () => {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('imc').value = '';
    document.getElementById('estatus').value = '';
});