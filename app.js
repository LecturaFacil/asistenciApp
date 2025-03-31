const express = require('express');
const fs = require('fs');
const path = require('path'); // Para gestionar rutas absolutas
const app = express();
const port = 3000;

// Middleware para manejar cuerpos JSON
app.use(express.json());

// Ruta para registrar la entrada/salida
app.post('/api/registro', (req, res) => {
    const { idEmpleado, entrada, salida } = req.body;

    // Ruta absoluta donde se almacenará el archivo registros.json
    const registrosPath = path.join(__dirname, 'registros.json');

    // Leemos el archivo JSON donde guardaremos los registros (o crea uno si no existe)
    fs.readFile(registrosPath, 'utf8', (err, data) => {
        let registros = [];

        if (!err && data) {
            registros = JSON.parse(data); // Parsear el JSON existente
        }

        // Agregar el nuevo registro
        registros.push({ idEmpleado, entrada, salida });

        // Guardar de nuevo el archivo JSON
        fs.writeFile(registrosPath, JSON.stringify(registros, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar los registros.' });
            }

            return res.json({ message: 'Registro exitoso.' });
        });
    });
});

// Ruta para consultar registros
app.get('/api/consultar-registros', (req, res) => {
    const registrosPath = path.join(__dirname, 'registros.json');

    fs.readFile(registrosPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer los registros.' });
        }

        const registros = JSON.parse(data);
        res.json(registros);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
