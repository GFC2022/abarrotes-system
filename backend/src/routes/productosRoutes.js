import express from "express";
import { getProductos, getProductoByCodigo } from "../controllers/productosController.js";

const router = express.Router();

// GET /api/productos
router.get("/", getProductos);
router.get("/by-barcode/:codigo", getProductoByCodigo);

export default router;


