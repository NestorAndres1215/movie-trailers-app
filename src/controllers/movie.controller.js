import { MovieModel } from "../models/movie.model.js";
import youtube from "../utils/youtube.js";

export const MovieController = {
  home(req, res) {
    res.render("pages/home");
  },

  async publicList(req, res) {
    try {
      const movies = await MovieModel.getAll();
      res.render("pages/public-list", { movies });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error", { message: "Error al cargar películas públicas" });
    }
  },

  async adminList(req, res) {
    try {
      const movies = await MovieModel.getAll();
      res.render("pages/admin-list", { movies });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error", { message: "Error al cargar películas de administración" });
    }
  },

  createForm(req, res) {
    res.render("pages/create");
  },

  async create(req, res) {
    try {
      const { title, description, year, genre, trailer_url } = req.body;
      const image = req.file ? req.file.filename : null;

      const errors = [];
      if (!title?.trim()) errors.push("El título es obligatorio.");
      if (!description?.trim()) errors.push("La descripción es obligatoria.");
      if (!year || isNaN(Number(year))) errors.push("El año es obligatorio y debe ser un número.");
      if (!genre?.trim()) errors.push("El género es obligatorio.");
      if (!trailer_url?.trim()) errors.push("La URL del trailer es obligatoria.");

      if (errors.length > 0) {
        return res.render("pages/create", { errors, movie: req.body });
      }

      await MovieModel.create({
        title: title.trim(),
        description: description.trim(),
        year: Number(year),
        genre: genre.trim(),
        image,
        trailerUrl: trailer_url.trim(),
      });

      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      return res.status(500).render("pages/error", { message: `Error al crear película: ${error.message}` });
    }
  },

  async editForm(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      res.render("pages/edit", { movie });
    } catch (error) {
      console.error(error);
      res.status(404).render("pages/error", { message: "Película no encontrada" });
    }
  },

  async update(req, res) {
    try {
      const { title, description, year, genre, trailer_url, oldImage } = req.body;
      const { id } = req.params;
      const image = req.file ? req.file.filename : oldImage;

      const errors = [];
      if (!title?.trim()) errors.push("El título es obligatorio.");
      if (!description?.trim()) errors.push("La descripción es obligatoria.");
      if (!year || isNaN(Number(year))) errors.push("El año es obligatorio y debe ser un número.");
      if (!genre?.trim()) errors.push("El género es obligatorio.");
      if (!trailer_url?.trim()) errors.push("La URL del trailer es obligatoria.");

      if (errors.length > 0) {
        const movie = { id, title, description, year, genre, trailer_url, image };
        return res.render("pages/edit", { errors, movie });
      }

      await MovieModel.update(id, {
        title: title.trim(),
        description: description.trim(),
        year: Number(year),
        genre: genre.trim(),
        image,
        trailerUrl: trailer_url.trim(),
      });

      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      return res.status(500).render("pages/error", { message: `Error al actualizar película: ${error.message}` });
    }
  },

  async delete(req, res) {
    try {
      await MovieModel.delete(req.params.id);
      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      return res.status(500).render("pages/error", { message: `Error al eliminar película: ${error.message}` });
    }
  },

  async detail(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      const youtubeId = youtube(movie.trailer_url); 
      res.render("pages/detail", { movie, youtubeId });
    } catch (error) {
      console.error(error);
      res.status(404).render("pages/error", { message: "Película no encontrada" });
    }
  },
};
