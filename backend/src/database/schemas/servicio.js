const mongoose = require("mongoose");

const Servicio = new mongoose.Schema({
  vehiculoId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" },
  cubiertaId: { type: mongoose.Schema.Types.ObjectId, ref: "Cubierta", default: null },
  descripcion: String,
  tipo: String,
  costo: Number,
  fecha: Date,
  observaciones: String,
  choferId: { type: mongoose.Schema.Types.ObjectId, ref: "Chofer", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Servicio", Servicio);
