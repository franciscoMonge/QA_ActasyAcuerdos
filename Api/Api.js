const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


//Ruta: obtener acta
app.get('/obtener_consecutivo', async (req, res) => {
  try {
      const consecutivo = await pool.query('SELECT last_value FROM qa.actas_id_seq;');
      res.json(consecutivo.rows);
  } catch (error) {
      console.error('Error al obtener el consecutivo. Información:', error);
      res.status(500).json({ error: 'Error al obtener el consecutivo.' });
  }
});


//Ruta: agregar acta
//Pendiente: agregar las dos fechas y subir el link al archivo y no el nombre
app.post('/agregar_acta', async (req, res) => {
    try {
        const { 
            consecutivo,
            titulo,
            keyWordsTokens,
            agenda,
            fechaDesde,
            fechaHasta,
            nombreArchivo } = req.body;

        const sqlQuery = 'INSERT INTO qa.actas(titulo, fecha, consecutivo, palabras_clave, url_archivo, agenda) VALUES ($1, to_timestamp($2, \'YYYY-MM-DD\'), $3, $4, $5, $6)';
        pool.query(sqlQuery, 
            [titulo, fechaDesde, consecutivo, {palabras_clave: keyWordsTokens}, nombreArchivo, agenda],
            (error, result) => {
          if (error) {
            console.error('Error al insertar la entrada. Información: ', error);
            res.status(500).json({ mensaje: 'Error al insertar la entrada.' });
          } else {
            res.status(201).json({ mensaje: 'Entrada insertada con éxito.', resultado: result });
          }
        });
      } catch (error) {
        console.error('Error al insertar datos. Información:', error);
        res.status(500).json({ mensaje: 'Error al insertar la entrada.' });
      }
});

//Ruta: obtener acta
app.get('/obtener_acta', async (req, res) => {
  try {
      const actas = await pool.query('SELECT * FROM qa.actas');
      console.log(actas.rows);
      res.json(actas.rows);
  } catch (error) {
      console.error('Error al obtener las entradas. Información:', error);
      res.status(500).json({ error: 'Error al obtener las entradas.' });
  }
});

//Ruta: modificar acta
//Pendiente: agregar las dos fechas
app.post('/modificar_acta', async (req, res) => {
  try {
      const {
          id,
          titulo,
          keyWordsTokens,
          agenda,
          fechaDesde,
          fechaHasta} = req.body;

      console.log(req.body);

      const sqlQuery = 'UPDATE qa.actas SET titulo=$1, fecha=to_timestamp($2, \'YYYY-MM-DD\'), palabras_clave=$3, agenda=$4 WHERE id=$5';
      pool.query(sqlQuery, 
          [titulo, fechaDesde, {palabras_clave: keyWordsTokens}, agenda, id],
          (error, result) => {
        if (error) {
          console.error('Error al modificar la entrada. Información: ', error);
          res.status(500).json({ mensaje: 'Error al insertar la entrada.' });
        } else {
          res.status(201).json({ mensaje: 'Entrada insertada con éxito.', resultado: result });
        }
      });
    } catch (error) {
      console.error('Error al insertar la entrada. Información:', error);
      res.status(500).json({ mensaje: 'Error al insertar la entrada.' });
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
