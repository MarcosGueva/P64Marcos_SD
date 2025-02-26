const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const router = express.Router();

// Registro de Usuario
router.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const usuario = new Usuario({ nombre, email, password: hashedPassword });
        await usuario.save();
        res.status(201).json({ mensaje: "Usuario registrado" });
    } catch (error) {
        res.status(400).json({ error: "Error al registrar usuario" });
    }
});

// Login de Usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
