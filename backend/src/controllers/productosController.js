import { pool } from "../config/db.js";

// Listar todos
export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar por código de barras
export const getProductoByCodigo = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE codigo_barra = ?", [req.params.codigo]);
    if (rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar por ID ✅
export const getProductoById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "✅ Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id, codigo_barra, nombre, descripcion, precio, stock, fecha_caducidad, imagen, tienda_id } = req.body;
    await pool.query(
      "UPDATE productos SET codigo_barra=?, nombre=?, descripcion=?, precio=?, stock=?, fecha_caducidad=?, imagen=?, tienda_id=? WHERE id=?",
      [codigo_barra, nombre, descripcion, precio, stock, fecha_caducidad, imagen, tienda_id, id]
    );
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
