const Venta = require("../database/schemas/venta");

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate("vehiculoId flotaId productoId");
    res.status(200).send(ventas);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener las ventas" });
  }
};

const crearVenta = async (req, res) => {
  try {
    const venta = await Venta.create(req.body);
    res.status(201).send(venta);
  } catch (error) {
    res.status(500).send({ error: "Error al crear la venta", detalles: error.message });
  }
};

const eliminarVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).send({ error: "Venta no encontrada" });
    res.status(200).send({ mensaje: "Venta eliminada", venta });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar la venta", detalles: error.message });
  }
};

const obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id).populate("vehiculoId flotaId productoId");
    if (!venta) return res.status(404).send({ error: "Venta no encontrada" });
    res.status(200).send(venta);
  } catch (error) {
    res.status(500).send({ error: "Error al obtener la venta", detalles: error.message });
  }
};

const actualizarVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venta) return res.status(404).send({ error: "Venta no encontrada" });
    res.status(200).send(venta);
  } catch (error) {
    res.status(500).send({ error: "Error al actualizar la venta", detalles: error.message });
  }
};

module.exports = {
  obtenerVentas,
  crearVenta,
  eliminarVenta,
  obtenerVentaPorId,
  actualizarVenta,
};
