import { MovieModel } from "../models/movie.model.js";
import youtube from "../utils/youtube.js";

export const MovieController = {
  home(req, res) {
    res.render("pages/home");
  },

  async publicList(req, res) {
    try {
      const movies = await MovieModel.getAll();
      res.render("pages/public-list", { movies, message: null });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error", { message: "Error al cargar películas públicas" });
    }
  },

  async adminList(req, res) {
    try {
      const movies = await MovieModel.getAll();
      res.render("pages/admin-list", { movies, message: null });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error", { message: "Error al cargar películas de administración" });
    }
  },

  createForm(req, res) {
    res.render("pages/create", { errors: [], movie: {}, message: null });
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
        return res.render("pages/create", { errors, movie: req.body, message: null });
      }

      await MovieModel.create({
        title: title.trim(),
        description: description.trim(),
        year: Number(year),
        genre: genre.trim(),
        image,
        trailerUrl: trailer_url.trim(),
      });

      // Mensaje de éxito antes de redirigir
      req.flash("success", "Película creada correctamente");
      return res.redirect("/admin");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/create", {
        errors: [error.message],
        movie: req.body,
        message: "Ocurrió un error al crear la película"
      });
    }
  },

  async editForm(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      if (!movie) throw new Error("Película no encontrada");
      res.render("pages/edit", { movie, errors: [], message: null });
    } catch (error) {
      console.error(error);
      res.status(404).render("pages/error", { message: error.message });
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
        return res.render("pages/edit", { errors, movie, message: null });
      }

      await MovieModel.update(id, {
        title: title.trim(),
        description: description.trim(),
        year: Number(year),
        genre: genre.trim(),
        image,
        trailerUrl: trailer_url.trim(),
      });

      req.flash("success", "Película actualizada correctamente");
      return res.redirect("/admin");

    } catch (error) {
      console.error(error);
      const movie = { id: req.params.id, ...req.body };
      res.status(500).render("pages/edit", {
        errors: [error.message],
        movie,
        message: "Ocurrió un error al actualizar la película"
      });
    }
  },

  async delete(req, res) {
    try {
      await MovieModel.delete(req.params.id);
      req.flash("success", "Película eliminada correctamente");
      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error", { message: `Error al eliminar película: ${error.message}` });
    }
  },

  async detail(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      if (!movie) throw new Error("Película no encontrada");
      const youtubeId = youtube(movie.trailer_url);
      res.render("pages/detail", { movie, youtubeId, message: null });
    } catch (error) {
      console.error(error);
      res.status(404).render("pages/error", { message: error.message });
    }
  },
};
