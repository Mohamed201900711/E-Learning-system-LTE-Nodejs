import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";
import { teacherQuestionModel } from "../../../database/models/teacherQuestions.js";
import { emailHtmlSession } from "../../emailing/liveSessionEmail.html.js";
import { sendEmail } from "../../emailing/user.email.js";
import { questionModel } from "../../../database/models/userQuestions.model.js";
import { answerModel } from "../../../database/models/answer.model.js";
import jwt from "jsonwebtoken";
//====================10)answer FQ question ====================
const answerQuestion = catchAsyncErr(async (req, res) => {
  const { questionId,answer } = req.body;
  let question = await questionModel.findById(questionId);
  if (question && question.questionType=="content") {
    let answers = await answerModel.insertMany({ answer, questionId });
    res.json({ message: "Answered Sussessfully", answers });
  } else {
    res.json({ message: "question not found" });
  }
});
//====================4)update user ====================
const updateUser = catchAsyncErr(async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  let users = await userModel.findByIdAndUpdate(req.user.user._id, {
    userName,
    firstName,
    lastName,
    password,
  });
  if (users) {
    res.json({ message: "Update Successfull", users });
  } else {
    res.json({ message: "Update Failed" });
  }
});

//===============add questions===============
const addQuestion = catchAsyncErr(async (req, res) => {
  const { question } = req.body;
  let isExist = await userModel.findById(req.user.user._id);
  if (isExist && isExist.role == "teacher") {
    let teacherQuestion = await teacherQuestionModel.insertMany({
      question,
      createdBy: req.user.user._id,
    });
    res.json({ message: "Question added successfully", teacherQuestion });
  } else {
    res.json({ message: "Question add failed" });
  }
});
//===============delete questions===============
const deleteQuestion = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  let isExist = await teacherQuestionModel.findById(id);
  if (isExist) {
    let teacherQuestion = await teacherQuestionModel.findByIdAndDelete(id);
    res.json({ message: "Question deleted successfully" });
  } else {
    res.json({ message: "Question delete failed" });
  }
});
//===============update questions===============
const updateQuestion = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const { updatedQuestion } = req.body;
  let isExist = await teacherQuestionModel.findById(id);
  if (isExist) {
    let teacherQuestion = await teacherQuestionModel.findByIdAndUpdate(id, {
      question: updatedQuestion,
    });
    res.json({ message: "Question update successfully" });
  } else {
    res.json({ message: "Question update failed" });
  }
});
//===============get all teacher questions===============
const getAllQuestions = catchAsyncErr(async (req, res) => {
  let user = await userModel.findById(req.user.user._id);
  if (user) {
    let questions = await teacherQuestionModel.find({}, " -__v -createdAt -updatedAt")
      .populate([{ path: "createdBy", select: "userName -_id" }])
    res.json({ message: "teacher questions displayed successfully", questions});
  } else {
    res.json({ message: "sorry ,not allowed to ", });
  }
});
//====================6)attend live session ====================
const attendSessionEmail = catchAsyncErr(async (req, res) => {
  let users = await userModel.find()
  if (users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].role == "student") {
        var token = jwt.sign(users[i].email, process.env.JWT_KEY);
        sendEmail({ email: users[i].email, html: emailHtmlSession(token) })
      }
    }
  }

  res.json({ message: "email sent successfully" })
})


export {
  updateUser,
  addQuestion,
  getAllQuestions,
  //logOut,
  deleteQuestion,
  updateQuestion,
  attendSessionEmail,
  answerQuestion,
};
