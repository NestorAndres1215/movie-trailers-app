import { MovieModel } from "../models/movie.model.js";
import youtube from "../utils/youtube.js";  // <-- importa la función

export const MovieController = {
  home(req, res) {
    res.render("pages/home");
  },

  async publicList(req, res) {
    const movies = await MovieModel.getAll();
    res.render("pages/public-list", { movies });
  },

  async adminList(req, res) {
    const movies = await MovieModel.getAll();
    res.render("pages/admin-list", { movies });
  },

  createForm(req, res) {
    res.render("pages/create");
  },

  async create(req, res) {
    const { title, description, year, genre, trailer_url } = req.body;
    const image = req.file ? req.file.filename : null;
    const errors = [];
    if (!title || title.trim() === "") errors.push("El título es obligatorio.");
    if (!description || description.trim() === "") errors.push("La descripción es obligatoria.");
    if (!year || isNaN(Number(year))) errors.push("El año es obligatorio y debe ser un número.");
    if (!genre || genre.trim() === "") errors.push("El género es obligatorio.");
    if (!trailer_url || trailer_url.trim() === "") errors.push("La URL del trailer es obligatoria.");

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    await MovieModel.create({ title, description, year, genre, image, trailer_url });
    res.redirect("/admin");
  },

  async editForm(req, res) {
    const movie = await MovieModel.getById(req.params.id);
    res.render("pages/edit", { movie });
  },

  async update(req, res) {
    const { title, description, year, genre, trailer_url, oldImage } = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : oldImage;
      const errors = [];
      if (!title || title.trim() === "") errors.push("El título es obligatorio.");
      if (!description || description.trim() === "") errors.push("La descripción es obligatoria.");
      if (!year || isNaN(Number(year))) errors.push("El año es obligatorio y debe ser un número.");
      if (!genre || genre.trim() === "") errors.push("El género es obligatorio.");
      if (!trailer_url || trailer_url.trim() === "") errors.push("La URL del trailer es obligatoria.");

      if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
      }
    await MovieModel.update(id, { title, description, year, genre, image, trailer_url });
    res.redirect("/admin");
  },

  async delete(req, res) {
    await MovieModel.delete(req.params.id);
    res.redirect("/admin");
  },

  // <-- Aquí se modifica para pasar el ID de YouTube a la vista
  async detail(req, res) {
    const movie = await MovieModel.getById(req.params.id);
    const youtubeId = youtube(movie.trailer_url); // extrae ID
    res.render("pages/detail", { movie, youtubeId });
  }
};
