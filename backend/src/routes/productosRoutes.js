import { Router } from "express";
import { 
  getProductos, 
  getProductoByCodigo, 
  getProductoById,   // 👈 importa esta
  actualizarProducto, // 👈 y esta
   eliminarProducto    // ✅ importar
} from "../controllers/productosController.js";

const router = Router();

router.get("/", getProductos);
router.get("/by-barcode/:codigo", getProductoByCodigo);
router.get("/:id", getProductoById);      // ✅ ya no marca error
router.put("/", actualizarProducto);      // ✅ actualización
router.delete("/:id", eliminarProducto);   // ✅ eliminar producto

export default router;


