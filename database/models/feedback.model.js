import mongoose, { Types } from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    feedback:{
      type:String,
      minLength:[5,'feedback too short'],
      required:true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "user",
      }
  },
  
  { timestamps: true }
);

export const feeedbackModel = mongoose.model("feedback", feedbackSchema);
