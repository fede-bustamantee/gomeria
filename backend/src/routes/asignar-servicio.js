const express = require("express");
const router = express.Router();
const { asignarServicio, listarServiciosAsignados } = require("../controllers/asignar-servicio");

router.post("/", asignarServicio);
router.get("/", listarServiciosAsignados);

module.exports = router;
