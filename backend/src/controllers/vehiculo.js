const Vehiculo = require("../database/schemas/vehiculo");

const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate("clienteId flotaId", "nombre");
    res.status(200).send(vehiculos);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los vehículos" });
  }
};

const crearVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.create(req.body);
    res.status(201).send(vehiculo);
  } catch (error) {
    res.status(500).send({ error: "Error al crear el vehículo", detalles: error.message });
  }
};

const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) return res.status(404).send({ error: "Vehículo no encontrado" });
    res.status(200).send({ mensaje: "Vehículo eliminado", vehiculo });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el vehículo", detalles: error.message });
  }
};

const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id).populate("clienteId flotaId", "nombre");
    if (!vehiculo) return res.status(404).send({ error: "Vehículo no encontrado" });
    res.status(200).send(vehiculo);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el vehículo", detalles: error.message });
  }
};

const actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehiculo) return res.status(404).send({ error: "Vehículo no encontrado" });
    res.status(200).send(vehiculo);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar el vehículo", detalles: error.message });
  }
};

module.exports = {
  obtenerVehiculos,
  crearVehiculo,
  eliminarVehiculo,
  obtenerVehiculoPorId,
  actualizarVehiculo,
};
