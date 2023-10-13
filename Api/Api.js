const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await pool.query('SELECT nombre, apellido1, apellido2 FROM qa.usuarios');
        res.json(usuarios.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para obtener todas las actas
app.get('/actas', async(req, res) =>{
    try{
        const actas = await pool.query("SELECT id, titulo, fecha, consecutivo, palabras_clave-> 'palabras_clave' as palabras_clave, url_archivo, agenda FROM p_actas.actas");
        res.json(actas.rows);
    } catch(error){
        console.error('Error al obtener actas:', error);
        res.status(500).json({ error: 'Error al obtener actas' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
