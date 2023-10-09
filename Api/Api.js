const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));

// Ruta de ejemplo
app.get('/holamundo', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
