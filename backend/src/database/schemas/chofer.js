const mongoose = require("mongoose");

const Chofer = new mongoose.Schema({
  nombre: String,
  dni: String,
  telefono: String,
  licencia: String,
  flotaId: { type: mongoose.Schema.Types.ObjectId, ref: "Flota" }
}, { timestamps: true });

module.exports = mongoose.model("Chofer", Chofer);
