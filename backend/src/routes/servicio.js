const express = require("express");
const RUTAS_SERVICIOS = express.Router();
const {
  obtenerServicios,
  crearServicio,
  eliminarServicio,
  obtenerServicioPorId,
  actualizarServicio
} = require("../controllers/servicio");

RUTAS_SERVICIOS.route("/")
  .get(obtenerServicios)
  .post(crearServicio);

RUTAS_SERVICIOS.route("/:id")
  .get(obtenerServicioPorId)
  .put(actualizarServicio)
  .delete(eliminarServicio);

module.exports = RUTAS_SERVICIOS;