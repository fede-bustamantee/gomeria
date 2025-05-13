const Chofer = require("../database/schemas/chofer");

const obtenerChoferes = async (req, res) => {
  try {
    const choferes = await Chofer.find().populate("flotaId", "nombre");
    res.status(200).send(choferes);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los choferes" });
  }
};

const crearChofer = async (req, res) => {
  try {
    const chofer = await Chofer.create(req.body);
    res.status(201).send(chofer);
  } catch (error) {
    res.status(500).send({ error: "Error al crear el chofer", detalles: error.message });
  }
};

const eliminarChofer = async (req, res) => {
  try {
    const chofer = await Chofer.findByIdAndDelete(req.params.id);
    if (!chofer) return res.status(404).send({ error: "Chofer no encontrado" });
    res.status(200).send({ mensaje: "Chofer eliminado", chofer });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el chofer", detalles: error.message });
  }
};

const obtenerChoferPorId = async (req, res) => {
  try {
    const chofer = await Chofer.findById(req.params.id).populate("flotaId", "nombre");
    if (!chofer) return res.status(404).send({ error: "Chofer no encontrado" });
    res.status(200).send(chofer);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el chofer", detalles: error.message });
  }
};

const actualizarChofer = async (req, res) => {
  try {
    const chofer = await Chofer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chofer) return res.status(404).send({ error: "Chofer no encontrado" });
    res.status(200).send(chofer);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar el chofer", detalles: error.message });
  }
};

module.exports = {
  obtenerChoferes,
  crearChofer,
  eliminarChofer,
  obtenerChoferPorId,
  actualizarChofer,
};
