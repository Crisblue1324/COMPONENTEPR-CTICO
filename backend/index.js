const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error al conectar MongoDB:", err));

// === Conexión SQLite ===
const sqlite = require("./db/sqlite");
(async () => {
  try {
    await sqlite.authenticate();
    await sqlite.sync(); // crea tablas si no existen
    console.log("SQLite conectado");
  } catch (error) {
    console.error("Error al conectar SQLite:", error);
  }
})();

// Importar Middleware de Autenticación
const authMiddleware = require("./middleware/authMiddleware");

// Rutas
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const sqliteRoutes = require("./routes/sqliteRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/logs", authMiddleware, sqliteRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));