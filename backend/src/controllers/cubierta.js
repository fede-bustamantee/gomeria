const Cubierta = require("../database/schemas/cubierta");

const obtenerCubiertas = async (req, res) => {
  try {
    const cubiertas = await Cubierta.find().populate("vehiculoId", "patente");
    res.status(200).send(cubiertas);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener las cubiertas" });
  }
};

const crearCubierta = async (req, res) => {
  try {
    const cubierta = await Cubierta.create(req.body);
    res.status(201).send(cubierta);
  } catch (error) {
    res.status(500).send({ error: "Error al crear la cubierta", detalles: error.message });
  }
};

const eliminarCubierta = async (req, res) => {
  try {
    const cubierta = await Cubierta.findByIdAndDelete(req.params.id);
    if (!cubierta) return res.status(404).send({ error: "Cubierta no encontrada" });
    res.status(200).send({ mensaje: "Cubierta eliminada", cubierta });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar la cubierta", detalles: error.message });
  }
};

const obtenerCubiertaPorId = async (req, res) => {
  try {
    const cubierta = await Cubierta.findById(req.params.id).populate("vehiculoId", "patente");
    if (!cubierta) return res.status(404).send({ error: "Cubierta no encontrada" });
    res.status(200).send(cubierta);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener la cubierta", detalles: error.message });
  }
};

const actualizarCubierta = async (req, res) => {
  try {
    const cubierta = await Cubierta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cubierta) return res.status(404).send({ error: "Cubierta no encontrada" });
    res.status(200).send(cubierta);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar la cubierta", detalles: error.message });
  }
};

module.exports = {
  obtenerCubiertas,
  crearCubierta,
  eliminarCubierta,
  obtenerCubiertaPorId,
  actualizarCubierta,
};
