import mongoose, { Types } from "mongoose";

const PDFSchema = mongoose.Schema(
  {
    title: String,

    path: String,

    createdBy: { type: Types.ObjectId, ref: "user" },
  },

  { timestamps: true }
);

export const PDFModel = mongoose.model("PDF", PDFSchema);
