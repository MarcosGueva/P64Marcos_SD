const express = require("express");
const Producto = require("../models/Producto");
const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Agregar un producto
router.post("/", async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({ mensaje: "Producto agregado" });
});

module.exports = router;
