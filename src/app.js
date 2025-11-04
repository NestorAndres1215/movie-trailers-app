import express from "express";
import ejsMate from "ejs-mate";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/movie.routes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración del motor de plantillas
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Middlewares
app.use(express.urlencoded({ extended: true })); // Parsear body forms
app.use(express.json()); // Parsear JSON
app.use(express.static(path.resolve("src/public"))); // Archivos estáticos

// Rutas
app.use("/", router);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

// Configurar puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor listo en http://localhost:${PORT}`);
});
