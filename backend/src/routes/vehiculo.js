const express = require("express");
const RUTAS_VEHICULOS = express.Router();

const {
  obtenerVehiculos,
  crearVehiculo,
  eliminarVehiculo,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  obtenerVehiculosPorCliente, 
} = require("../controllers/vehiculo");

RUTAS_VEHICULOS.route("/")
  .get(obtenerVehiculos)
  .post(crearVehiculo);

RUTAS_VEHICULOS.route("/:id")
  .get(obtenerVehiculoPorId)
  .put(actualizarVehiculo)
  .delete(eliminarVehiculo);

RUTAS_VEHICULOS.get("/cliente/:id", obtenerVehiculosPorCliente);

module.exports = RUTAS_VEHICULOS;
