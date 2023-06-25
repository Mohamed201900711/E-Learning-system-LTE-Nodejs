import mongoose, { Types } from "mongoose";

const photoSchema = mongoose.Schema(
  {
    title: String,

    path: String,

    createdBy: { type: Types.ObjectId, ref: "user" },
  },

  { timestamps: true }
);

export const photoModel = mongoose.model("photo", photoSchema);
