import mongoose, { Types } from "mongoose";

const videoSchema = mongoose.Schema(
  {
    title: String,

    path: String,

    createdBy: { type: Types.ObjectId, ref: "user" },
  },

  { timestamps: true }
);

export const videoModel = mongoose.model("video", videoSchema);
