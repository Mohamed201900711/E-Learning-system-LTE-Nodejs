import express from "express";
import { auth } from "../../middleware/authentication.js";

import * as reportController from "./report.controller.js";
import { getReportSchema, getUserReportsSchema } from "./report.validation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo } from "../../middleware/authorization.js";

export const studentReportRouter = express.Router();


//==================get one report for one user=============================
studentReportRouter.get("/getReport/:reportId", validation(getReportSchema) ,auth,allowedTo("student","teacher","admin"), reportController.getReport);

//==================get all reports for one user=============================
studentReportRouter.get("/userReports",validation(getUserReportsSchema), auth,allowedTo("student","teacher","admin"),  reportController.getUserReport);

export default studentReportRouter;
