import { catchAsyncErr } from "../../utils/catchErr.js";
import Report from "../../../database/models/report.model.js";
import { userModel } from "../../../database/models/user.model.js";

//==================== get report====================
const getReport = catchAsyncErr(async (req, res, next) => {
  const reportId = req.params.reportId;
  let report = await Report.findById(reportId);
  if (report) {
    res.json({ message: "this is your report", report });
  } else {
    res.status(404).json({ message: "Report not found " });
  }
});

//==================== get user reports====================
const getUserReport = catchAsyncErr(async (req, res, next) => {
  let user = await userModel.findById(req.user.user._id);
  if (user) {
    let report = await Report.find({ userId: req.user.user._id });
    res.json({ message: "user reports displayed successfully", report });
  } else {
    res.status(404).json({ message: "user not found " });
  }
});

export { getReport, getUserReport };
