const express = require("express");
const RUTAS_CHOFERES = express.Router();
const {
  obtenerChoferes,
  crearChofer,
  eliminarChofer,
  obtenerChoferPorId,
  actualizarChofer
} = require("../controllers/chofer");

RUTAS_CHOFERES.route("/")
  .get(obtenerChoferes)
  .post(crearChofer);

RUTAS_CHOFERES.route("/:id")
  .get(obtenerChoferPorId)
  .put(actualizarChofer)
  .delete(eliminarChofer);

module.exports = RUTAS_CHOFERES;
