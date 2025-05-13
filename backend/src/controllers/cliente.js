const Cliente = require("../database/schemas/cliente");

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).send(clientes);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los clientes" });
  }
};

const crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).send(cliente);
  } catch (error) {
    res.status(500).send({ error: "Error al crear el cliente", detalles: error.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) return res.status(404).send({ error: "Cliente no encontrado" });
    res.status(200).send({ mensaje: "Cliente eliminado correctamente", cliente: clienteEliminado });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el cliente", detalles: error.message });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).send({ error: "Cliente no encontrado" });
    res.status(200).send(cliente);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el cliente", detalles: error.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!clienteActualizado) return res.status(404).send({ error: "Cliente no encontrado" });
    res.status(200).send(clienteActualizado);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar el cliente", detalles: error.message });
  }
};

module.exports = {
  obtenerClientes,
  crearCliente,
  eliminarCliente,
  obtenerClientePorId,
  actualizarCliente,
};