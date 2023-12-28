const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// *Crear el servidor de express
const app = express();

// * Data Base
dbConnection();

// *CORS
app.use(cors());

// *Directorio publico
app.use( express.static('public') );

// * Lectura y parseo del body
app.use(express.json());

// *Root
app.use('/api/auth', require('./routes/auth')); //Autenticación
app.use('/api/events', require('./routes/events')); //CRUD para los eventos

// *Escuchar peticiones

app.listen(process.env.PORT,()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})

