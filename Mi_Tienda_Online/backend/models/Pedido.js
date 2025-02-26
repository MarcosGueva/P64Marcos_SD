const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    productos: [{ productoId: mongoose.Schema.Types.ObjectId, cantidad: Number }],
    total: Number,
    estado: { type: String, default: "Pendiente" }
});

module.exports = mongoose.model("Pedido", PedidoSchema);
