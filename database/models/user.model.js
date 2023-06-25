import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName:{
      type:String,
      minLength:[3,'name too short'],
      maxLength:[20,'name too long'],
      required:true,
    },
    firstName:{
      type:String,
      minLength:[3,'name too short'],
      maxLength:[20,'name too long'],
      required:true,
    },
    lastName:{
        type:String,
        minLength:[3,'name too short'],
        maxLength:[20,'name too long'],
        required:true,
      },
    email: {
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      minLength:[3,'name too short'],
      required:true

    },
    role: {
      type: String,
      enum: ["admin", "student","teacher"],
      default: "student",
    },
    profilePic:{
      type:String
    },
    confirmedEmail:{
      type:Boolean,
      default:false
    },
    code:{
      type:String,
      default:null

    },
    status: {
      type: String,
      enum: ["online","offline"],
      default: "online"
    },
    logOutAt:Date
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
