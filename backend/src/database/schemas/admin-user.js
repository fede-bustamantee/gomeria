const mongoose = require("mongoose");

const UsuariosSchema = new mongoose.Schema({
    email: String,
    password: String,
    nombre: String,
    apellido: String,
    fechaActivo: Date,
    activo: Boolean,
});
// luego exportamos este esquema para utilizarlo en adm-user.js/controllers
module.exports = mongoose.model("admin-user", UsuariosSchema); // 1 nombre DB, 2 el esquema
