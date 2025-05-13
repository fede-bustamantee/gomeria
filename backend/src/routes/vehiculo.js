const express = require("express");
const RUTAS_VEHICULOS = express.Router();
const {
  obtenerVehiculos, crearVehiculo, eliminarVehiculo, obtenerVehiculoPorId, actualizarVehiculo
} = require("../controllers/vehiculo");

RUTAS_VEHICULOS.route("/")
  .get(obtenerVehiculos)
  .post(crearVehiculo);

RUTAS_VEHICULOS.route("/:id")
  .get(obtenerVehiculoPorId)
  .put(actualizarVehiculo)
  .delete(eliminarVehiculo);

module.exports = RUTAS_VEHICULOS;