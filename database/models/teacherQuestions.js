import mongoose, { Types } from "mongoose";

const teacherQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      minLength: [10, 'session too short'],
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    }
      
  },{ timestamps: true }
);

export const teacherQuestionModel = mongoose.model("teacherQuestion", teacherQuestionSchema);
