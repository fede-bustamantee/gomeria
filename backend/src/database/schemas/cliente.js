const mongoose = require("mongoose");

const Cliente = new mongoose.Schema({
  nombre: String,
  telefono: String,
  email: String,
  direccion: String,
}, { timestamps: true });

module.exports = mongoose.model("Cliente", Cliente);
