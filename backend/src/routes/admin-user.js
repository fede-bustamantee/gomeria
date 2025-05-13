const express = require("express");
const RUTAS_USUARIOS = express.Router();
const { registrarUsuario, loginUsuario } = require("../controllers/admin-user"); // traemos la funcion de crearAlumno y ObtenerAlumnos

RUTAS_USUARIOS.route("/create-new-user").post(registrarUsuario);

RUTAS_USUARIOS.route("/login").post(loginUsuario);

module.exports = RUTAS_USUARIOS;