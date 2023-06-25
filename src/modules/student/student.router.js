import express from "express";
import { auth } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import * as studentController from "./student.controller.js";
import {
  AskContentQuestionschema,
  AskFrequentQuestionschema,
  feedbackSchema,
  getStudentContentQuesSchema,
  getStudentFrequentQuesSchema,
  signUpSchema,
  updateUserSchema,
  verifySchema,
} from "./student.validation.js";
import { allowedTo } from "../../middleware/authorization.js";

const studentRouter = express.Router();

//====================signUp(add) =============================================
studentRouter.post(
  "/signup",
  validation(signUpSchema),
  studentController.signup
);

//====================verify ==================================================
studentRouter.get(
  "/verify/:token",
  validation(verifySchema),
  studentController.verify
);

//======================update user=================================
studentRouter.patch(
  "/updateUser",
  validation(updateUserSchema),
  auth,
  allowedTo("student"),
  studentController.updateUser
);

//====================Ask frequent questions ====================
studentRouter.post(
  "/AskFQ",
  validation(AskFrequentQuestionschema),
  auth,
  allowedTo("student"),
  studentController.AskFrequentQuestions
);

//=====================feedback================
studentRouter.post(
  "/givefeedback",
  validation(feedbackSchema),
  auth,
  allowedTo("student"),
  studentController.giveFeedback
);

//====================Ask Content questions ====================
studentRouter.post(
  "/AskCQ",
  validation(AskContentQuestionschema),
  auth,
  allowedTo("student"),
  studentController.AskContentQuestions
);

//======================log Out=================================
// studentRouter.patch("/logOut", auth, studentController.logOut);

//====================get student feedback ====================
studentRouter.get(
  "/getAllFeedback",
  studentController.getStudentFeedback
);

//====================get student Frequent ques====================
studentRouter.get(
  "/getStudentFQ",
  validation(getStudentFrequentQuesSchema),
  studentController.getStudentFrequentQues
);

//====================get student content ques ====================
studentRouter.get(
  "/getStudentCQ",
  validation(getStudentContentQuesSchema),
  studentController.getStudentContentQues
);

export default studentRouter;
