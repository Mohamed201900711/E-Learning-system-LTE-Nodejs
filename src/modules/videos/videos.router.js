import express from "express";
import { auth } from "../../middleware/authentication.js";
import { videoUpload } from "../../utils/videos.js";
import * as videosController from "./videos.controller.js";
import { allowedTo } from "../../middleware/authorization.js";

export const videosRouter = express.Router();

//==================add photo=============================
videosRouter.post(
  "/addvideo",
  auth,
  allowedTo("teacher", "admin"),
  videoUpload("path"),
  videosController.addvideo
);

//==================delete photo=============================
videosRouter.delete(
  "/deletevideo/:_id",
  auth,
  allowedTo("teacher", "admin"),
  videosController.deletevideo
);

//==================get all photos=============================
videosRouter.get(
  "/getAllvideos",
  auth,
  videosController.getAllvideos
);
