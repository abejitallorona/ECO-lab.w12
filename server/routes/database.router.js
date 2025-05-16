const express = require("express");
const router = express.Router();
const {
  // Tarea 1
  setupProductsTable,
  getAllProductsHandler,
  
  // Tarea 2
  setupSampleProducts,
  getProductsUnder50Handler,
  
  // Tarea 3
  setupUsersTable,
  setupSampleUsers,
  getUsernameAndEmailsHandler,
  
  // Tarea 4
  setupOrdersTable,
  setupSampleOrders,
  getOrdersByDateDescHandler
} = require("../controllers/database.controller");

// Rutas para configuración
router.post("/setup/products", setupProductsTable);
router.post("/setup/products/sample", setupSampleProducts);
router.post("/setup/users", setupUsersTable);
router.post("/setup/users/sample", setupSampleUsers);
router.post("/setup/orders", setupOrdersTable);
router.post("/setup/orders/sample", setupSampleOrders);

// Rutas para consultas

// Tarea 1: Obtener todos los registros de una tabla
router.get("/products", getAllProductsHandler);

// Tarea 2: Filtrar por una condición simple
router.get("/products/under-50", getProductsUnder50Handler);

// Tarea 3: Seleccionar campos específicos
router.get("/users/username-email", getUsernameAndEmailsHandler);

// Tarea 4: Ordenar resultados por una columna
router.get("/orders/by-date", getOrdersByDateDescHandler);

module.exports = router;