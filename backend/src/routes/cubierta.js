const express = require("express");
const RUTAS_CUBIERTAS = express.Router();
const {
  obtenerCubiertas, crearCubierta, eliminarCubierta, obtenerCubiertaPorId, actualizarCubierta
} = require("../controllers/cubierta");

RUTAS_CUBIERTAS.route("/")
  .get(obtenerCubiertas)
  .post(crearCubierta);

RUTAS_CUBIERTAS.route("/:id")
  .get(obtenerCubiertaPorId)
  .put(actualizarCubierta)
  .delete(eliminarCubierta);

module.exports = RUTAS_CUBIERTAS;