import express from "express";
import ejsMate from "ejs-mate";
import path from "path";
import router from "./routes/movie.routes.js";

const app = express();

// Configuración de motor de plantillas con ejs-mate
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Body Form
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.resolve("src/public")));

// Rutas
app.use("/", router);

// Server
app.listen(3000, () => console.log("✅ Servidor listo: http://localhost:3000"));
