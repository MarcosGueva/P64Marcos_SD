const express = require("express");
const Pedido = require("../models/Pedido");
const router = express.Router();

// Crear un pedido
router.post("/", async (req, res) => {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json({ mensaje: "Pedido creado" });
});

// Obtener todos los pedidos
router.get("/", async (req, res) => {
    const pedidos = await Pedido.find().populate("usuarioId productos.productoId");
    res.json(pedidos);
});

module.exports = router;
