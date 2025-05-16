// server/db/products.db.js
const supabaseCli = require("../services/supabase.service");

// Tarea 1: Obtener todos los registros de una tabla
// Crear tabla products
const createProductsTable = async () => {
  // En Supabase, las tablas se crean desde el panel de administración
  // Este es un ejemplo simulado de cómo sería la estructura de la tabla
  console.log("Para crear la tabla 'products' debes hacerlo desde el panel de Supabase con esta estructura:");
  console.log(`
    create table products (
      id uuid default uuid_generate_v4() primary key,
      name text not null,
      price decimal not null,
      category text
    );
  `);
  
  return { message: "Tabla products creada correctamente (simulación)" };
};

// Obtener todos los productos
const getAllProducts = async () => {
  const { data, error } = await supabaseCli
    .from("products")
    .select();
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data };
};

// Tarea 2: Filtrar por una condición simple
// Agregar productos de ejemplo (para pruebas)
const addSampleProducts = async () => {
  const sampleProducts = [
    { name: "Laptop", price: 899.99, category: "Electronics" },
    { name: "Mouse", price: 24.99, category: "Electronics" },
    { name: "Keyboard", price: 49.99, category: "Electronics" },
    { name: "Coffee Mug", price: 9.99, category: "Kitchen" },
    { name: "Headphones", price: 79.99, category: "Electronics" }
  ];
  
  const { data, error } = await supabaseCli
    .from("products")
    .insert(sampleProducts)
    .select();
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data, message: "Productos de muestra agregados correctamente" };
};

// Obtener productos con precio menor a 50
const getProductsUnder50 = async () => {
  const { data, error } = await supabaseCli
    .from("products")
    .select()
    .lt("price", 50);
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data };
};

// Tarea 3: Seleccionar campos específicos
// Crear tabla users
const createUsersTable = async () => {
  // En Supabase, las tablas se crean desde el panel de administración
  console.log("Para crear la tabla 'users' debes hacerlo desde el panel de Supabase con esta estructura:");
  console.log(`
    create table users (
      id uuid default uuid_generate_v4() primary key,
      username text not null,
      email text not null unique,
      created_at timestamp with time zone default now()
    );
  `);
  
  return { message: "Tabla users creada correctamente (simulación)" };
};

// Agregar usuarios de ejemplo
const addSampleUsers = async () => {
  const sampleUsers = [
    { username: "john_doe", email: "john@example.com" },
    { username: "jane_smith", email: "jane@example.com" },
    { username: "alex_wilson", email: "alex@example.com" }
  ];
  
  const { data, error } = await supabaseCli
    .from("users")
    .insert(sampleUsers)
    .select();
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data, message: "Usuarios de muestra agregados correctamente" };
};

// Obtener solo username y email de todos los usuarios
const getUsernameAndEmails = async () => {
  const { data, error } = await supabaseCli
    .from("users")
    .select("username, email");
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data };
};

// Tarea 4: Ordenar resultados por una columna
// Crear tabla orders
const createOrdersTable = async () => {
  console.log("Para crear la tabla 'orders' debes hacerlo desde el panel de Supabase con esta estructura:");
  console.log(`
    create table orders (
      id uuid default uuid_generate_v4() primary key,
      user_id uuid references users(id),
      total decimal not null,
      created_at timestamp with time zone default now()
    );
  `);
  
  return { message: "Tabla orders creada correctamente (simulación)" };
};

// Agregar órdenes de ejemplo
const addSampleOrders = async () => {
  // Primero necesitamos obtener IDs de usuarios existentes
  const { data: users, error: usersError } = await supabaseCli
    .from("users")
    .select("id")
    .limit(3);
  
  if (usersError) {
    console.error(usersError);
    return { error: usersError };
  }
  
  if (!users || users.length === 0) {
    return { error: "No hay usuarios para crear órdenes de ejemplo" };
  }
  
  // Crear órdenes con fechas distintas
  const now = new Date();
  const sampleOrders = [
    { 
      user_id: users[0].id, 
      total: 124.99, 
      created_at: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 días atrás
    },
    { 
      user_id: users[1].id, 
      total: 89.50, 
      created_at: new Date(now - 1000 * 60 * 60 * 24).toISOString() // 1 día atrás
    },
    { 
      user_id: users[0].id, 
      total: 45.75, 
      created_at: new Date().toISOString() // Ahora
    }
  ];
  
  const { data, error } = await supabaseCli
    .from("orders")
    .insert(sampleOrders)
    .select();
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data, message: "Órdenes de muestra agregadas correctamente" };
};

// Obtener órdenes ordenadas por fecha descendente
const getOrdersByDateDesc = async () => {
  const { data, error } = await supabaseCli
    .from("orders")
    .select()
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error(error);
    return { error };
  }
  
  return { data };
};

module.exports = {
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
};