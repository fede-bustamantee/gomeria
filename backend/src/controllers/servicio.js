const Servicio = require("../database/schemas/servicio");

const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find().populate("vehiculoId cubiertaId flotaId choferId");
    res.status(200).send(servicios);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los servicios" });
  }
};

const crearServicio = async (req, res) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).send(servicio);
  } catch (error) {
    res.status(500).send({ error: "Error al crear el servicio", detalles: error.message });
  }
};

const eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndDelete(req.params.id);
    if (!servicio) return res.status(404).send({ error: "Servicio no encontrado" });
    res.status(200).send({ mensaje: "Servicio eliminado", servicio });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el servicio", detalles: error.message });
  }
};

const obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id).populate("vehiculoId cubiertaId flotaId choferId");
    if (!servicio) return res.status(404).send({ error: "Servicio no encontrado" });
    res.status(200).send(servicio);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el servicio", detalles: error.message });
  }
};

const actualizarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!servicio) return res.status(404).send({ error: "Servicio no encontrado" });
    res.status(200).send(servicio);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar el servicio", detalles: error.message });
  }
};

module.exports = {
  obtenerServicios,
  crearServicio,
  eliminarServicio,
  obtenerServicioPorId,
  actualizarServicio,
};