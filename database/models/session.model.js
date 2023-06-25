import mongoose, { Types } from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    url:{
      type:String,
      minLength:[3,'session too short'],
      required:true,
    },
    description:{
        type:String,
        minLength:[20,'session too short'],
        required:true,
      },
      createdBy: {
        type: Types.ObjectId,
        ref: "user",
      },
  },
  { timestamps: true }
);

export const sessionModel = mongoose.model("session", sessionSchema);
