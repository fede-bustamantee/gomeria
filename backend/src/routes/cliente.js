const express = require("express");
const RUTAS_CLIENTES = express.Router();

const { 
  obtenerClientes, 
  crearCliente, 
  eliminarCliente, 
  obtenerClientePorId,
  actualizarCliente 
} = require("../controllers/cliente");

RUTAS_CLIENTES.route("/")
  .get(obtenerClientes)
  .post(crearCliente);

RUTAS_CLIENTES.route("/:id")
  .get(obtenerClientePorId)
  .put(actualizarCliente)  
  .delete(eliminarCliente);

module.exports = RUTAS_CLIENTES;