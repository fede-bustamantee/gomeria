const express = require("express");
const RUTAS_VENTAS = express.Router();
const {
  obtenerVentas,
  crearVenta,
  eliminarVenta,
  obtenerVentaPorId,
  actualizarVenta
} = require("../controllers/venta");

RUTAS_VENTAS.route("/")
  .get(obtenerVentas)
  .post(crearVenta);

RUTAS_VENTAS.route("/:id")
  .get(obtenerVentaPorId)
  .put(actualizarVenta)
  .delete(eliminarVenta);

module.exports = RUTAS_VENTAS;