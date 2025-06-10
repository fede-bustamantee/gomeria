// routes/cubierta.js
const express = require("express");
const RUTAS_CUBIERTAS = express.Router();
const {
  obtenerCubiertas,
  crearCubierta,
  eliminarCubierta,
  obtenerCubiertaPorId,
  actualizarCubierta,
  obtenerCubiertasPorVehiculo,
} = require("../controllers/cubierta");

RUTAS_CUBIERTAS.route("/")
  .get(obtenerCubiertas)
  .post(crearCubierta);

RUTAS_CUBIERTAS.route("/:id")
  .get(obtenerCubiertaPorId)
  .put(actualizarCubierta)
  .delete(eliminarCubierta);

RUTAS_CUBIERTAS.get("/vehiculo/:vehiculoId", obtenerCubiertasPorVehiculo);

module.exports = RUTAS_CUBIERTAS;
