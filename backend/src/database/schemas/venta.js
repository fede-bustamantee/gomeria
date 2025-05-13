const mongoose = require("mongoose");

const Venta = new mongoose.Schema({
  vehiculoId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" },
  producto: String,
  cantidad: Number,
  costo: Number,
  fecha: Date,
  detalle: String
}, { timestamps: true });

module.exports = mongoose.model("Venta", Venta);