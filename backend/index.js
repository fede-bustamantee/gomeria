// Importacion de libreria
require("dotenv").config(); // utiliza las variables de entorno .env
const express = require("express");
const cors = require("cors"); //  para permitir solicitudes desde el frontend.

//Importacion de archivos(controllers, routes,etc...)
const connectDB = require("./src/database/connection"); // conexion mongodb
const RUTAS_USUARIOS = require("./src/routes/admin-user"); // rutas get/ post/
const RUTAS_CLIENTES = require("./src/routes/cliente"); // rutas get/ post/
const RUTAS_VEHICULO = require("./src/routes/vehiculo"); // rutas get/ post/
const RUTAS_CHOFER = require("./src/routes/chofer"); // rutas get/ post/
const RUTAS_CUBIERTA = require("./src/routes/cubierta"); // rutas get/ post/
const RUTAS_SERVICIO = require("./src/routes/servicio"); // rutas get/ post/
const RUTAS_VENTA = require("./src/routes/venta"); // rutas get/ post/
const RUTAS_FLOTA = require("./src/routes/flota"); // rutas get/ post/
const RUTAS_ASIGNARSERVICIO = require("./src/routes/asignar-servicio");

// Instanciacion de EXPRESS(servidor)
const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json()); // para que interprete Json().

// Declaraciones de servidor(rutas que se usan, middleware,etc)
app.use("/auth", RUTAS_USUARIOS);
app.use("/cliente", RUTAS_CLIENTES);
app.use("/vehiculo", RUTAS_VEHICULO);
app.use("/chofer", RUTAS_CHOFER);
app.use("/cubierta", RUTAS_CUBIERTA);
app.use("/servicio", RUTAS_SERVICIO);
app.use("/venta", RUTAS_VENTA);
app.use("/flota", RUTAS_FLOTA);
app.use("/asignar-servicio", RUTAS_ASIGNARSERVICIO);

// Inicializacion del servidor
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
    connectDB();
});