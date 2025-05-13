const Flota = require("../database/schemas/flota");

const obtenerFlotas = async (req, res) => {
  try {
    const flotas = await Flota.find();
    res.status(200).send(flotas);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener las flotas" });
  }
};

const crearFlota = async (req, res) => {
  try {
    const flota = await Flota.create(req.body);
    res.status(201).send(flota);
  } catch (error) {
    res.status(500).send({ error: "Error al crear la flota", detalles: error.message });
  }
};

const eliminarFlota = async (req, res) => {
  try {
    const flota = await Flota.findByIdAndDelete(req.params.id);
    if (!flota) return res.status(404).send({ error: "Flota no encontrada" });
    res.status(200).send({ mensaje: "Flota eliminada", flota });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar la flota", detalles: error.message });
  }
};

const obtenerFlotaPorId = async (req, res) => {
  try {
    const flota = await Flota.findById(req.params.id);
    if (!flota) return res.status(404).send({ error: "Flota no encontrada" });
    res.status(200).send(flota);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener la flota", detalles: error.message });
  }
};

const actualizarFlota = async (req, res) => {
  try {
    const flota = await Flota.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flota) return res.status(404).send({ error: "Flota no encontrada" });
    res.status(200).send(flota);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar la flota", detalles: error.message });
  }
};

module.exports = {
  obtenerFlotas,
  crearFlota,
  eliminarFlota,
  obtenerFlotaPorId,
  actualizarFlota,
};