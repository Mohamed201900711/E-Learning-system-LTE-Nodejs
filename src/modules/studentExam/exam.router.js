import express from "express";
import { auth } from "../../middleware/authentication.js";
import * as examController from "./exam.controller.js";
import { startExamSchema, submitExamSchema } from "./exam.validation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo } from "../../middleware/authorization.js";

export const studentExamRouter = express.Router();



//==================start exam=============================
studentExamRouter.post("/start/:quizId",validation(startExamSchema) , auth,allowedTo("student"), examController.startExam);


//==================submit exam=============================
studentExamRouter.post("/submit/:quizId", validation(submitExamSchema) ,auth,allowedTo("student"), examController.submitExam);
