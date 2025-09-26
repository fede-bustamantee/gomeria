const express = require("express");
const router = express.Router();
const { asignarServicio, listarServiciosAsignados } = require("../controllers/asignar-servicio");

// Crear servicio asignado (vehículo, cubierta, chofer o flota)
router.post("/", asignarServicio);

// Listar servicios asignados
router.get("/", listarServiciosAsignados);

module.exports = router;
