const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose"); // 🔹 Importar Mongoose
require("dotenv").config(); // 🔹 Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 4000;

// 🔹 Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {

    serverSelectionTimeoutMS: 15000 // Aumenta el tiempo de espera
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error en la conexión a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Servir el frontend desde la carpeta 'frontend/public'
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Rutas de la API
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/pedidos", require("./routes/pedidos"));

// 🔹 Cargar `index.html` en cualquier ruta no definida
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
