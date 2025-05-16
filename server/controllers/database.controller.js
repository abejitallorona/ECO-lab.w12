const {
  // Tarea 1
  createProductsTable,
  getAllProducts,
  
  // Tarea 2
  addSampleProducts,
  getProductsUnder50,
  
  // Tarea 3
  createUsersTable,
  addSampleUsers,
  getUsernameAndEmails,
  
  // Tarea 4
  createOrdersTable,
  addSampleOrders,
  getOrdersByDateDesc
} = require("../db/products.db");

// Tarea 1: Obtener todos los registros de una tabla
const setupProductsTable = async (req, res) => {
  const result = await createProductsTable();
  res.send(result);
};

const getAllProductsHandler = async (req, res) => {
  const { data, error } = await getAllProducts();
  
  if (error) {
    return res.status(400).json({ error });
  }
  
  res.status(200).json(data);
};

// Tarea 2: Filtrar por una condición simple
const setupSampleProducts = async (req, res) => {
  const result = await addSampleProducts();
  res.send(result);
};

const getProductsUnder50Handler = async (req, res) => {
  const { data, error } = await getProductsUnder50();
  
  if (error) {
    return res.status(400).json({ error });
  }
  
  res.status(200).json(data);
};

// Tarea 3: Seleccionar campos específicos
const setupUsersTable = async (req, res) => {
  const result = await createUsersTable();
  res.send(result);
};

const setupSampleUsers = async (req, res) => {
  const result = await addSampleUsers();
  res.send(result);
};

const getUsernameAndEmailsHandler = async (req, res) => {
  const { data, error } = await getUsernameAndEmails();
  
  if (error) {
    return res.status(400).json({ error });
  }
  
  res.status(200).json(data);
};

// Tarea 4: Ordenar resultados por una columna
const setupOrdersTable = async (req, res) => {
  const result = await createOrdersTable();
  res.send(result);
};

const setupSampleOrders = async (req, res) => {
  const result = await addSampleOrders();
  res.send(result);
};

const getOrdersByDateDescHandler = async (req, res) => {
  const { data, error } = await getOrdersByDateDesc();
  
  if (error) {
    return res.status(400).json({ error });
  }
  
  res.status(200).json(data);
};

module.exports = {
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
};