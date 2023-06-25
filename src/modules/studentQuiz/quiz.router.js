import express from "express";
import { auth } from "../../middleware/authentication.js";

import * as quizController from "./quiz.controller.js";
import { allowedTo } from "../../middleware/authorization.js";
import { createQuizSchema, deleteQuizSchema, getAllQuizSchema, getQuizSchema, publishQuizSchema, updateQuizSchema } from "./quiz.validation.js";
import { validation } from "../../middleware/validation.js";

export const studentQuizRouter = express.Router();

//==================create quiz=============================
studentQuizRouter.post("/create",validation(createQuizSchema) , auth, allowedTo('teacher'), quizController.createQuiz);


//==================get quiz=============================
studentQuizRouter.get("/get/:quizId", validation(getQuizSchema) ,auth, allowedTo('teacher'), quizController.getQuiz);

//==================get all quiz=============================
studentQuizRouter.get("/get", validation(getAllQuizSchema) ,auth, allowedTo('teacher'), quizController.getAllQuiz);


//==================update quiz=============================
studentQuizRouter.put("/update/:quizId",validation(updateQuizSchema), auth, allowedTo('teacher'),  quizController.updateQuiz);


//==================delete quiz=============================
studentQuizRouter.delete("/delete/:quizId", validation(deleteQuizSchema) ,auth, allowedTo('teacher'), quizController.deleteQuiz);


//==================puplish quiz=============================
studentQuizRouter.patch("/publish/:quizId", validation(publishQuizSchema),auth, allowedTo('teacher'),  quizController.puplishQuiz);
