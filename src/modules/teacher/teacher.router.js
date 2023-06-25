import express from "express";
import { auth } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import * as teacherController from "./teacher.controller.js";
import {
  ContentAnswersSchema,
  addQuestionSchema,
  answerQuestionSchema,
  deleteQuestionSchema,
  getAllQuestionsSchema,
  updateQuestionSchema,
  updateUserSchema,
} from "./teacher.validation.js";
import { allowedTo } from "../../middleware/authorization.js";

const teacherRouter = express.Router();
//======================update user=================================
teacherRouter.patch(
  "/updateUser",
  validation(updateUserSchema),
  auth,
  allowedTo("teacher"),
  teacherController.updateUser
);

//====================send email notification for live session =====================================
teacherRouter.post("/attend", auth,allowedTo("teacher"), teacherController.attendSessionEmail);



//======================answer Question=================================
teacherRouter.post(
  "/answerQuestion",
  validation(answerQuestionSchema),
  auth,
  allowedTo("teacher"),
  teacherController.answerQuestion
);
//======================add question=================================
teacherRouter.post(
  "/addQuestions",
  validation(addQuestionSchema),
  auth,
  allowedTo("teacher"),
  teacherController.addQuestion
);
//======================delete question=================================
teacherRouter.delete(
  "/deleteQuestions/:id",
  validation(deleteQuestionSchema),
  auth,
  allowedTo("teacher"),
  teacherController.deleteQuestion
);
//======================update question=================================
teacherRouter.put(
  "/updateQuestions/:id",
  validation(updateQuestionSchema),
  auth,
  allowedTo("teacher"),
  teacherController.updateQuestion
);
//======================get All Questions=================================
teacherRouter.get(
  "/getAllQuestions",
  validation(getAllQuestionsSchema),
  auth,
  teacherController.getAllQuestions
);


export default teacherRouter;
