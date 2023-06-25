import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import { newsModel } from "../../../database/models/news.model.js";
import { sendEmail } from "../../emailing/user.email.js";
import { catchAsyncErr } from "../../utils/catchErr.js";
import { questionModel } from "../../../database/models/userQuestions.model.js";
import { answerModel } from "../../../database/models/answer.model.js";
import { emailHtml } from "../../emailing/email.html.js";
import { v4 as uuidv4 } from "uuid";
uuidv4();
//====================1)signUp(add admin OR teacher) ====================
const signup = catchAsyncErr(async (req, res) => {
  const { userName, firstName, lastName, email, password, role } = req.body;
  let user = await userModel.findOne({ email });

  if (user) return res.json({ message: "email is already in use" });

  const hash = bcrypt.hashSync(password, Number(process.env.ROUND));

  await userModel.insertMany({
    userName,
    email,
    firstName,
    lastName,
    password: hash,
    role,
  });
  var token = jwt.sign({ email }, process.env.JWT_KEY);
  sendEmail({ email, html: emailHtml(token) });
  res.json({ message: "inserted success" });
});
//====================3)verify ====================
const verify = catchAsyncErr(async (req, res) => {
  let { token } = req.params;
  jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
    if (!err) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { confirmedEmail: true }
      );
      res.json({ message: "account verified successfully" });
    } else {
      res.json(err);
    }
  });
});

//====================7)Publish News ====================
const PublishNews = catchAsyncErr(async (req, res) => {
  const { news } = req.body;
  let users = await userModel.findById(req.user.user._id);
  if (users) {
    let NewNews = await newsModel.insertMany({
      news,
      createdBy: req.user.user._id,
    });
    res.json({ message: "News Published Successfully", NewNews });
  } else {
    res.json({ message: "Sorry can't Publish this news " });
  }
});

//====================8)delete user ====================
const deleteUser = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  let users = await userModel.findByIdAndDelete(id);
  if (users) {
    res.json({ message: "user DELETED SUCCESSFULLY" });
  } else {
    res.json({ message: "INCORRECT id .. can't DELETE this user" });
  }
});

//====================9)update user ====================
const updateUser = catchAsyncErr(async (req, res) => {
  const { id } = req.params;
  const { userName, firstName, lastName, password } = req.body;
  let users = await userModel.findByIdAndUpdate(id, {
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

//====================10)answer FQ question ====================
const answerQuestion = catchAsyncErr(async (req, res) => {
  const { questionId, answer } = req.body;
  let question = await questionModel.findById(questionId);
  if (question && question.questionType == "frequent") {
    let answers = await answerModel.insertMany({ answer, questionId });
    res.json({ message: "Answered Sussessfully", answers });
  } else {
    res.json({ message: "question not found" });
  }
});

//====================11)search user ====================
const searchUsers = catchAsyncErr(async (req, res) => {
  const { userName } = req.body;
  var pattern = "^" + userName.replace("'", '"');
  let user = await userModel.find({ userName: { $regex: pattern } });
  if (user) {
    res.json({ message: " successfully", user });
  } else {
    res.json({ message: " not exist" });
  }
});

//====================13)get admin news  ====================

const getAdminNews = catchAsyncErr(async (req, res) => {
  let allNews = await newsModel.find()
   res.json({ message: "this is your news", allNews });
  
});

//=================14)Get All Admin===================
const getAllAdmin = catchAsyncErr(async (req, res) => {
  let users = await userModel.find({ role: "admin" });
  if (users) {
    console.log(users);
    res.json({ message: "users found", users });
  } else {
    res.json({ message: "No users found" });
  }
});

//==============15)Get All Teacher=======================
const getAllTeacher = catchAsyncErr(async (req, res) => {
  let users = await userModel.find({ role: "teacher" });
  if (users) {
    console.log(users);
    res.json({ message: "users found", users });
  } else {
    res.json({ message: "No users found" });
  }
});

//====================16)Get All Student=====================
const getAllStudent = catchAsyncErr(async (req, res) => {
  let users = await userModel.find({ role: "student" });
  if (users) {
    console.log(users);
    res.json({ message: "users found", users });
  } else {
    res.json({ message: "No users found" });
  }
});
//==================get frequent question answers====================


export {
  signup,
  verify,
  PublishNews,
  //attendSessionEmail,
  deleteUser,
  updateUser,
  answerQuestion,
  searchUsers,
  getAdminNews,
  getAllAdmin,
  getAllTeacher,
  getAllStudent,
};
