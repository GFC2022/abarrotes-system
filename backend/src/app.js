// app principal
import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";

const app = express();

// ✅ CORS dinámico: refleja el origen que venga en la petición
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*");
  },
  credentials: true
}));

app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("✅ API Abarrotes Angela funcionando en Express");
});

// Rutas
app.use("/api/productos", productosRoutes);

// Ruta de prueba para verificar conexión
app.get('/api/status', (req, res) => {
  res.json({ ok: true, message: 'Backend funcionando 🚀' });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
