import mongoose, { Types } from "mongoose";

const newsSchema = mongoose.Schema(
  {
    news:{
      type:String,
      minLength:[5,'news too short'],
      required:true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "user",
      },
  },
  { timestamps: true }
);

export const newsModel = mongoose.model("news", newsSchema);
