import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

// Configurar rutas absolutas para compatibilidad con módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// 🔹 Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Aumenta el tiempo de espera
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error en la conexión a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Servir el frontend desde la carpeta `frontend/public`
const frontendPath = path.join(__dirname, "../../frontend/public");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Rutas de la API
import usuariosRouter from "./routes/usuarios.js";
import productosRouter from "./routes/productos.js";
import pedidosRouter from "./routes/pedidos.js";

app.use("/api/usuarios", usuariosRouter);
app.use("/api/productos", productosRouter);
app.use("/api/pedidos", pedidosRouter);

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
