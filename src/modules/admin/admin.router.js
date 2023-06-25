import express from "express";
import { auth } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import * as adminController from "./admin.controller.js";
//import { PublishNewsSchema, answerQuestionSchema, forgetPasswordSchema, resetPasswordSchema, searchByNameSchema, signInSchema, signUpSchema, updateUserSchema } from './admin.validation.js'
import * as adminValidation from "./admin.validation.js";
import { allowedTo } from "../../middleware/authorization.js";

const adminRouter = express.Router();

//====================signUp(add) =============================================
adminRouter.post(
  "/signup",
  validation(adminValidation.signUpSchema),
  adminController.signup
);

//====================verify ==================================================
adminRouter.get(
  "/verify/:token",
  validation(adminValidation.verifySchema),
  adminController.verify
);




//======================PublishNews=======================================
adminRouter.post(
  "/PublishNews",
  validation(adminValidation.PublishNewsSchema),
  auth,
  allowedTo("admin"),
  adminController.PublishNews
);

//======================delete user=======================================
adminRouter.delete(
  "/deleteUser/:id",
  validation(adminValidation.deleteUserSchema),
  auth,
  allowedTo("admin"),
  adminController.deleteUser
);

//======================update user=================================
adminRouter.patch(
  "/updateUser/:id",
  validation(adminValidation.updateUserSchema),
  auth,
  allowedTo("admin"),
  adminController.updateUser
);

//======================answer Question=================================
adminRouter.post(
  "/answerQuestion",
  validation(adminValidation.answerQuestionSchema),
  auth,
  allowedTo("admin"),
  adminController.answerQuestion
);

//======================search users =================================
adminRouter.get(
  "/searchUser",
  validation(adminValidation.searchByNameSchema),
  auth,
  allowedTo("admin"),
  adminController.searchUsers
);

//======================get Admin News =================================
adminRouter.get(
  "/getAdminNews",
  // validation(adminValidation.getAdminNewsSchema),
  auth,
  adminController.getAdminNews
);

//=======================get All Admin=========================================
adminRouter.get(
  "/getAllAdmin/",
  validation(adminValidation.getAllAdminSchema),
  auth,
  allowedTo("admin"),
  adminController.getAllAdmin
);

//========================get All Teacher=========================
adminRouter.get(
  "/getAllTeacher/",
  validation(adminValidation.getAllTeacherSchema),
  auth,
  allowedTo("admin"),
  adminController.getAllTeacher
);

//========================get All Student=========================
adminRouter.get(
  "/getAllStudent/",
  validation(adminValidation.getAllStudentSchema),
  auth,
  allowedTo("admin"),
  adminController.getAllStudent
);

export default adminRouter;
