const express = require("express");
const RUTAS_FLOTAS = express.Router();
const {
  obtenerFlotas,
  crearFlota,
  eliminarFlota,
  obtenerFlotaPorId,
  actualizarFlota
} = require("../controllers/flota");

RUTAS_FLOTAS.route("/")
  .get(obtenerFlotas)
  .post(crearFlota);

RUTAS_FLOTAS.route("/:id")
  .get(obtenerFlotaPorId)
  .put(actualizarFlota)
  .delete(eliminarFlota);

module.exports = RUTAS_FLOTAS;