import mongoose, { Types } from "mongoose";

const answerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      minLength: [5, "session too short"],
      required: true,
    },
    questionId: {
      type: Types.ObjectId,
      ref: "question",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    }
    // questionType: {
    //   type: String,
    //   required: true,
    //   enum: ["frequent", "content"],
    // },
  },
  { timestamps: true }
);

export const answerModel = mongoose.model("answer", answerSchema);
