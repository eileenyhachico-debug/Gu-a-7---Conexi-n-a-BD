require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBD = require('./config/mongo');
const app = express();

// 1. Conectar a la base de datos
conectarBD();

// 2. Middlewares globales
app.use(cors());
app.use(express.json());

// 3. Rutas de la API
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));