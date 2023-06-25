import express from "express";
import { auth } from "../../middleware/authentication.js";
import { photoUpload } from "../../utils/photos.js";
import * as photosController from "./photos.controller.js";
import { allowedTo } from "../../middleware/authorization.js";

export const photosRouter = express.Router();

//==================add photo=============================
photosRouter.post(
  "/addPhoto",
  auth,
  allowedTo("teacher", "admin"),
  photoUpload("path"),
  photosController.addPhoto
);

//==================delete photo=============================
photosRouter.delete(
  "/deletePhoto/:_id",
  auth,
  allowedTo("teacher", "admin"),
  photosController.deletePhoto
);

//==================get all photos=============================
photosRouter.get(
  "/getAllPhotos",
  auth,
  photosController.getAllPhotos
);
