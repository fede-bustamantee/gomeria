const mongoose = require("mongoose");

const Flota = new mongoose.Schema({
  nombre: String,
  contacto: String,
  direccion: String
}, { timestamps: true });

module.exports = mongoose.model("Flota", Flota);