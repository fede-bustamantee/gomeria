const Servicio = require("../database/schemas/servicio");

// Solo mostrar servicios NO asignados (vehiculoId == null y cubiertaId == null)
const obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find({ vehiculoId: null, cubiertaId: null });
    res.status(200).send(servicios);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los servicios" });
  }
};

// Crear un servicio BASE (sin asignar a vehículo ni cubierta)
const crearServicio = async (req, res) => {
  try {
    const { descripcion, tipo, costo, observaciones } = req.body;

    // No permitir crear servicios asignados desde esta API
    if (req.body.vehiculoId || req.body.cubiertaId) {
      return res.status(400).send({ error: "No se puede asignar un servicio desde esta API" });
    }

    const servicio = await Servicio.create({ descripcion, tipo, costo, observaciones });
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
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).send({ error: "Servicio no encontrado" });
    res.status(200).send(servicio);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener el servicio", detalles: error.message });
  }
};

const actualizarServicio = async (req, res) => {
  try {
    // Evitar que se le agregue vehiculoId/cubiertaId desde esta API
    if (req.body.vehiculoId || req.body.cubiertaId) {
      return res.status(400).send({ error: "No se puede asignar un servicio desde esta API" });
    }

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