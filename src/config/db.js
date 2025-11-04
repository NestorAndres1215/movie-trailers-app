import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Validar variables de entorno
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
  throw new Error("❌ Faltan variables de entorno de la base de datos (DB_HOST, DB_USER, DB_PASS, DB_NAME)");
}

// Crear pool de conexiones
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0,       // Sin límite en cola de espera
});

pool.getConnection()
  .then(conn => {
    console.log("✅ Conexión a la base de datos establecida");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Error al conectar a la base de datos:", err.message);
  });

export default pool;
