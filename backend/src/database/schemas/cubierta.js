const mongoose = require("mongoose");

const Cubierta = new mongoose.Schema({
  vehiculoId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" },
  marca: String,
  medida: String,
  dibujo: String,
  estado: String,
  posicion: String,
}, { timestamps: true });

module.exports = mongoose.model("Cubierta", Cubierta);