

const express = require("express");
const path = require("path");
const { createServer } = require("http");
const cors = require("cors");  // Asegurarse de que cors esté importado

const usersRouter = require("./server/routes/users.router");
const screen1EventsRouter = require("./server/routes/screen1Events.router");
const databaseRouter = require("./server/routes/database.router");
const { initSocketInstance } = require("./server/services/socket.service");

const PORT = process.env.PORT || 5050;

const app = express();
const httpServer = createServer(app);

// Middlewares
app.use(cors());  // Permitir solicitudes cross-origin
app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('El servidor está funcionando correctamente');
});

// Ruta para verificar la conexión con Supabase
app.get('/check-supabase', async (req, res) => {
  const supabase = require('./server/services/supabase.service');
  try {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) throw error;
    res.json({ status: 'ok', message: 'Conexión con Supabase establecida', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Routes
app.use("/", usersRouter);
app.use("/", screen1EventsRouter);
app.use("/", databaseRouter);

// Services
initSocketInstance(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);