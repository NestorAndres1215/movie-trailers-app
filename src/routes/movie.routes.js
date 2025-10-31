import express from "express";
import { MovieController } from "../controllers/movie.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", MovieController.home);
router.get("/public", MovieController.publicList);
router.get("/admin", MovieController.adminList);

router.get("/create", MovieController.createForm);
router.post("/create", upload.single("image"), MovieController.create);

router.get("/edit/:id", MovieController.editForm);
router.post("/edit/:id", upload.single("image"), MovieController.update);

router.get("/delete/:id", MovieController.delete);
router.get("/detail/:id", MovieController.detail);

export default router;
