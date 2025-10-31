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
