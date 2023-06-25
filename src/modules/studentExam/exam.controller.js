import { catchAsyncErr } from "../../utils/catchErr.js";
import Quiz from "../../../database/models/quiz.js";
import Report from "../../../database/models/report.model.js";

//====================start exam====================
const startExam = catchAsyncErr(async (req, res, next) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId, {
    name: 1,
    questions_list: 1,
    is_published: 1,
  });

  if (!quiz) {
    res.status(404).json({ message: "exam not found " });
  } else {
    if (!quiz.is_published) {
      res.status(405).json({ message: "exam is not published!" });
    }else{
      res.json({ message: "exam started successfully" , quiz});
    }
  }
});

// //====================submit exam====================
const submitExam = catchAsyncErr(async (req, res, next) => {

  const quizId = req.params.quizId;
  const attempted_question = req.body.attempted_question;
  
  const quiz = await Quiz.findById(quizId, { answers: 1 });
  const answers = quiz.answers;
  
  const userId = req.user.user._id;
  const allQuestions = Object.keys(answers);
  const total = allQuestions.length;
  
  let score = 0;
  
  for (let i = 0; i < total; i++) {
    let question_number = allQuestions[i];
    if (
      !!attempted_question[question_number] &&
      answers[question_number] == attempted_question[question_number]
    ) {
      score = score + 1;
    }
  }
  
  const report = new Report({ userId, quizId, score, total });
  const data = await report.save();
  res.json({message:"Exam submit successfully",total, score, ReportId: data._id})
  
})
  




export { startExam,submitExam};
