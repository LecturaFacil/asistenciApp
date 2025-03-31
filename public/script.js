// Inicialización del escáner QR
const video = document.getElementById('qr-video');
const qrScanner = new QrScanner(video, (result) => {
    // Cuando se escanea un QR
    const qrData = result.data;
    registrarEntradaSalida(qrData);
});

// Iniciar escaneo
qrScanner.start();

// Función para registrar la entrada/salida
async function registrarEntradaSalida(qrData) {
    const data = {
        idEmpleado: qrData,
        entrada: new Date().toISOString(), // Usamos la fecha y hora actual
        salida: null
    };

    try {
        const response = await fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error al registrar entrada/salida:', error);
        alert('Hubo un error al registrar los datos.');
    }
}

// Función para consultar los registros
async function consultarRegistros() {
    try {
        const response = await fetch('/api/consultar-registros');
        const registros = await response.json();

        const logsContainer = document.getElementById('logs');
        logsContainer.innerHTML = ''; // Limpiar registros previos

        registros.forEach(registro => {
            const logElement = document.createElement('div');
            logElement.textContent = `Empleado: ${registro.idEmpleado}, Entrada: ${registro.entrada}, Salida: ${registro.salida || 'No registrada'}`;
            logsContainer.appendChild(logElement);
        });
    } catch (error) {
        console.error('Error al consultar registros:', error);
        alert('Hubo un error al consultar los registros.');
    }
}
