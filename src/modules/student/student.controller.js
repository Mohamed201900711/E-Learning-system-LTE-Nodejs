import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../emailing/user.email.js";
import { feeedbackModel } from "../../../database/models/feedback.model.js";
import { emailHtml } from "../../emailing/email.html.js";
import { questionModel } from "../../../database/models/userQuestions.model.js";
import { answerModel } from "../../../database/models/answer.model.js";

//====================1)signUp ====================
const signup = catchAsyncErr(async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (user) return res.json({ message: "email is already in use" });

  const hash = bcrypt.hashSync(password, Number(process.env.ROUND));

  await userModel.insertMany({
    userName,
    email,
    firstName,
    lastName,
    password: hash,
  });
  var token = jwt.sign({ email }, process.env.JWT_KEY);
  sendEmail({ email, html: emailHtml(token) });
  res.json({ message: "inserted success" });
});

//====================3)verify ====================
const verify = catchAsyncErr(async (req, res) => {
  let { token } = req.params;
  jwt.verify(token, "email", async function (err, decoded) {
    if (!err) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { confirmedEmail: true }
      );
      res.json({ message: "verified" });
    } else {
      res.json(err);
    }
  });
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

// ====================5)Ask frequent questions ====================
const AskFrequentQuestions = catchAsyncErr(async (req, res) => {
  const { questionType, question } = req.body;
  let users = await userModel.findById(req.user.user._id);
  if (users) {
    let Fquestion = await questionModel.insertMany({
      questionType,
      question,
      createdBy: req.user.user._id,
    });
    res.json({ message: "Question Asked Successfully", Fquestion });
  } else {
    res.json({
      message: "Sorry can't Ask this Question ",
    });
  }
});

// =======================give feedback================
const giveFeedback = catchAsyncErr(async (req, res) => {
  const { feedback } = req.body;
  let giveFeedback = await feeedbackModel.insertMany({
    feedback,
    createdBy: req.user.user._id,
  });
  if (giveFeedback) {
    res.json({ message: "Feedback Recieved", giveFeedback });
  } else {
    res.json({ message: "Feedback Falied" });
  }
});

// ====================6)Ask content’s questions  ====================
const AskContentQuestions = catchAsyncErr(async (req, res) => {
  const { questionType, question } = req.body;
  let users = await userModel.findById(req.user.user._id);
  if (users) {
    let Cquestion = await questionModel.insertMany({
      questionType,
      question,
      createdBy: req.user.user._id,
    });
    res.json({ message: "Question Asked Successfully", Cquestion });
  } else {
    res.json({
      message: "Sorry can't Ask this Question ",
    });
  }
});

// ====================8)get student feedback ====================
const getStudentFeedback = catchAsyncErr(async (req, res) => {
    let feedback = await feeedbackModel
      .find({}, " -__v -createdAt -updatedAt")
      .populate([{ path: "createdBy", select: "userName -_id" }]);
    res.json({ message: "feedback displayed successfully", feedback });
});
// ====================9)get student frequent ques ====================
const getStudentFrequentQues = catchAsyncErr(async (req, res) => {
  const frequenQues = await questionModel
    .find({ questionType: "frequent" }, "-__v -createdAt -updatedAt -createdBy -questionType")
    .lean();

  const questionIds = frequenQues.map(question => question._id);
  const answers = await answerModel.find({ questionId: { $in: questionIds } }
    , "-__v -createdAt -updatedAt ").lean();

  const frequentQuestionsWithAnswers = frequenQues.map(question => {
    const questionId = question._id.toString();
    const questionAnswers = answers.filter(answer => answer.questionId.toString() === questionId);
    return { question, answers: questionAnswers };
  });

  res.json({ message: "Questions and answers displayed successfully", frequentQuestionsWithAnswers });
});
// ====================10)get student content ques ====================
const getStudentContentQues = catchAsyncErr(async (req, res) => {
  const frequenQues = await questionModel
    .find({ questionType: "content" }, "-__v -createdAt -updatedAt -createdBy -questionType")
    .lean();

  const questionIds = frequenQues.map(question => question._id);
  const answers = await answerModel.find({ questionId: { $in: questionIds } }
    , "-__v -createdAt -updatedAt ").lean();

  const frequentQuestionsWithAnswers = frequenQues.map(question => {
    const questionId = question._id.toString();
    const questionAnswers = answers.filter(answer => answer.questionId.toString() === questionId);
    return { question, answers: questionAnswers };
  });

  res.json({ message: "Questions and answers displayed successfully", frequentQuestionsWithAnswers });
});


export {
  signup,
  verify,
  updateUser,
  AskFrequentQuestions,
  giveFeedback,
  AskContentQuestions,
  //logOut,
  getStudentFeedback,
  getStudentFrequentQues,
  getStudentContentQues,
};
