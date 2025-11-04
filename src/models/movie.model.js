import pool from "../config/db.js";

// Constantes de mensajes
const MOVIE_MESSAGES = {
  NOT_FOUND: "Película no encontrada",
  CREATE_SUCCESS: "Película creada correctamente",
  UPDATE_SUCCESS: "Película actualizada correctamente",
  DELETE_SUCCESS: "Película eliminada correctamente",
};

export const MovieModel = {

  // Obtener todas las películas
  async getAll() {
    try {
      const [movies] = await pool.query("SELECT * FROM movies ORDER BY id DESC");
      return movies;
    } catch (error) {
      throw new Error(`Error al obtener películas: ${error.message}`);
    }
  },

  // Obtener película por ID
  async getById(id) {
    try {
      const [movies] = await pool.query("SELECT * FROM movies WHERE id = ?", [id]);
      if (movies.length === 0) throw new Error(MOVIE_MESSAGES.NOT_FOUND);
      return movies[0];
    } catch (error) {
      throw new Error(`Error al obtener película: ${error.message}`);
    }
  },

  // Crear nueva película
  async create({ title, description, year, genre, image, trailerUrl }) {
    try {
      const sql = `
        INSERT INTO movies (title, description, year, genre, image, trailer_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [title, description, year, genre, image, trailerUrl];
      const [result] = await pool.query(sql, params);
      return { id: result.insertId, message: MOVIE_MESSAGES.CREATE_SUCCESS };
    } catch (error) {
      throw new Error(`Error al crear película: ${error.message}`);
    }
  },

  // Actualizar película
  async update(id, { title, description, year, genre, image, trailerUrl }) {
    try {
      const sql = `
        UPDATE movies
        SET title = ?, description = ?, year = ?, genre = ?, image = ?, trailer_url = ?
        WHERE id = ?
      `;
      const params = [title, description, year, genre, image, trailerUrl, id];
      const [result] = await pool.query(sql, params);

      if (result.affectedRows === 0) throw new Error(MOVIE_MESSAGES.NOT_FOUND);

      return { affectedRows: result.affectedRows, message: MOVIE_MESSAGES.UPDATE_SUCCESS };
    } catch (error) {
      throw new Error(`Error al actualizar película: ${error.message}`);
    }
  },

  // Eliminar película
  async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM movies WHERE id = ?", [id]);

      if (result.affectedRows === 0) throw new Error(MOVIE_MESSAGES.NOT_FOUND);

      return { affectedRows: result.affectedRows, message: MOVIE_MESSAGES.DELETE_SUCCESS };
    } catch (error) {
      throw new Error(`Error al eliminar película: ${error.message}`);
    }
  },

  // Obtener solo título
  async getTitle(id) {
    const movie = await this.getById(id);
    return movie.title;
  },

  // Obtener solo género
  async getGenre(id) {
    const movie = await this.getById(id);
    return movie.genre;
  },

  // Obtener solo año
  async getYear(id) {
    const movie = await this.getById(id);
    return movie.year;
  }
};
