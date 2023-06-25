import { catchAsyncErr } from "../../utils/catchErr.js";
import Quiz from "../../../database/models/quiz.js";

//====================create quiz====================
const createQuiz = catchAsyncErr(async (req, res, next) => {
  const created_by = req.user.user._id;
  // const name = req.body;
  // const questions_list = req.body.questions_list;
  const answers = req.body.answers;
  const { name, questions_list } = req.body

  const quiz = new Quiz({ name, questions_list, answers, created_by });
  const result = await quiz.save();
  res.json({ message: "success" });
});

//====================get quiz====================
const getQuiz = catchAsyncErr(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId, {
    name: 1,
    questions_list: 1,
    answers: 1,
    created_by: 1,
  });
  if (!quiz) {
    res.status(404).json({ message: "quiz not found " });
  } else {
    res.json({ message: "quiz displayed successfully ", quiz })
  }
});

//====================update quiz====================
const updateQuiz = catchAsyncErr(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404).json({ message: "quiz not found " });
  }
  else {
    if (quiz.is_published) {
      res.status(405).json({ message: "You cannot update, published Quiz!" });
    }
    else {
      quiz.questions_list = req.body.questions_list;
      quiz.answers = req.body.answers;
       quiz.name = req.body.name;

      await quiz.save();
      res.json({ message: "quiz updated successfully", quiz })
    }

  }
})

//====================delete quiz====================
const deleteQuiz = catchAsyncErr(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404).json({ message: "quiz not found " });
  }
  else {
    console.log(quiz.is_published);
    if (quiz.is_published) {
      res.status(405).json({ message: "You cannot delete, published Quiz!" });
    }
    else {
      let deletedQuiz = await Quiz.deleteOne({ _id: quizId });
      res.json({ message: "quiz deleted successfully", deletedQuiz })
    }

  }
})

//====================puplish quiz====================
const puplishQuiz = catchAsyncErr(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404).json({ message: "quiz not found " });
  }
  else {
    if (quiz.is_published) {
      res.status(405).json({ message: "Quiz is already published!" });
    }
    else {
      quiz.is_published = true;
      await quiz.save();
      res.json({ message: "quiz published successfully", quiz })
    }
  }
})


//====================get all quizzes====================
const getAllQuiz = catchAsyncErr(async (req, res, next) => {
  const quiz = await Quiz.find();
  if (!quiz) {
    res.status(404).json({ message: "no quizzes to show " });
  } else {
    res.json({ message: "quizzes displayed successfully ", quiz })
  }
});



export {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  puplishQuiz,
  getAllQuiz
}
