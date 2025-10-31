import pool from "../config/db.js";

export const MovieModel = {

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM movies ORDER BY id DESC");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [id]);
    return rows[0];
  },

  async create({ title, description, year, genre, image, trailer_url }) {
    const sql = `
      INSERT INTO movies (title, description, year, genre, image, trailer_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [title, description, year, genre, image, trailer_url];
    const [result] = await pool.query(sql, params);
    return result.insertId;
  },

  async update(id, { title, description, year, genre, image, trailer_url }) {
    const sql = `
      UPDATE movies
      SET title = ?, description = ?, year = ?, genre = ?, image = ?, trailer_url = ?
      WHERE id = ?
    `;
    const params = [title, description, year, genre, image, trailer_url, id];
    const [result] = await pool.query(sql, params);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM movies WHERE id = ?", [id]);
    return result.affectedRows;
  }
};
