import express from "express";
import { auth } from "../../middleware/authentication.js";
import { pdfUpload } from "../../utils/PDFs.js";
import * as pdfController from "./PDFs.controller.js";
import { allowedTo } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { addPdfSchema, deletePdfSchema } from "./PDFs.validation.js";

export const pdfRouter = express.Router();

//==================add pdf=============================
pdfRouter.post(
  "/addPdf",
  validation(addPdfSchema),
  auth,
  allowedTo("teacher", "admin"),
  pdfUpload("path"),
  pdfController.addPdf
);

//==================delete pdf=============================
pdfRouter.delete(
  "/deletePdf/:_id",
  validation(deletePdfSchema),
  auth,
  allowedTo("teacher", "admin"),
  pdfController.deletePdf
);

//==================get all pdfs=============================
pdfRouter.get(
  "/getAllPdfs",
  auth,
  pdfController.getAllPdfs
);
