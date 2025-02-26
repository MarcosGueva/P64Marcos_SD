const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true },
    password: String,
    rol: { type: String, default: "cliente" }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
