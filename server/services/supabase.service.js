const { createClient } = require("@supabase/supabase-js");

// Verificar si las variables de entorno están disponibles
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
  console.error("⚠️ Error: Variables de entorno SUPABASE_URL o SUPABASE_API_KEY no encontradas");
  console.error("Por favor, crea un archivo .env basado en .env-example");
}

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// Verificar la conexión
supabase.auth.getSession()
  .then(() => console.log("✅ Conexión con Supabase establecida correctamente"))
  .catch(err => console.error("❌ Error al conectar con Supabase:", err.message));

module.exports = supabase;