import mongoose, { Types } from "mongoose";

const questionSchema = mongoose.Schema(
  {
    questionType:{
        type:String,
        required:true,
        enum:["frequent","content"]
      },
      question:{
        type:String,
        minLength:[10,'session too short'],
        required:true,
      },
      createdBy: {
        type: Types.ObjectId,
        ref: "user",
      }
      
  },
  { timestamps: true }
);

export const questionModel = mongoose.model("question", questionSchema);
