const mongoose = require("mongoose");

const Vehiculo = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  flotaId: { type: mongoose.Schema.Types.ObjectId, ref: "Flota", default: null }, // 👈 agregado
  patente: String,
  marca: String,
  modelo: String,
  anio: Number,
  tipo: String
}, { timestamps: true });

module.exports = mongoose.model("Vehiculo", Vehiculo);
