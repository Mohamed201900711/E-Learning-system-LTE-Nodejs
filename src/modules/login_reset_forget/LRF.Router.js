import express from "express";
import { validation } from "../../middleware/validation.js";
import * as LRF_Controller from "./LRF.controller.js";
import * as LRFValidation from "./LRF.validation.js";

const LRF_Router = express.Router();

//====================signIn ===================================================
LRF_Router.post(
  "/signin",
  validation(LRFValidation.signInSchema),
  LRF_Controller.signin
);


//====================forgetPassword ==========================================
LRF_Router.patch(
  "/forgetPass",
  validation(LRFValidation.forgetPasswordSchema),
  LRF_Controller.forgetPassword
);

//====================resetPassword ==========================================
LRF_Router.patch(
  "/resetPass",
  validation(LRFValidation.resetPasswordSchema),
  LRF_Controller.resetPassword
);


export default LRF_Router;
