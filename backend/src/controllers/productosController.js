// src/controllers/productosController.js
import pool from "../config/db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE codigo_barra = ?", [codigo]);
    if (rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error al buscar producto:", err);
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

