const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Ruta de ejemplo
app.get('/holamundo', (req, res) => {
    console.log(`Recibí :${req}`);
    res.send('¡Hola, mundo!');
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        console.log("algo1");
        const usuarios = await pool.query('SELECT nombre, apellido1, apellido2 FROM usuarios');
        console.log("algo2");
        res.json(usuarios.rows);
        console.log("algo3");
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
