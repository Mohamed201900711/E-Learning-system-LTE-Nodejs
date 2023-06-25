import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";
import { v4 as uuidv4 } from "uuid";
import { sendCodeEmail } from "../../emailing/forget.email.js";
uuidv4();

//====================2)signIn ====================
const signin = catchAsyncErr(async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.json({ message: "incorrect email or password" });
  }
  user["password"] = undefined;
  var token = jwt.sign({ user }, process.env.JWT_KEY);
  var role=user.role;
  res.json({ message: "login successfully", token,role });
});


//====================4)forget Password ====================
const forgetPassword = catchAsyncErr(async (req, res) => {
  let { email } = req.body;
  const code = uuidv4();
  await userModel.findOneAndUpdate({ email }, { code });
  const user = sendCodeEmail(email,"forget password !",`<h1>code:<span>${code}</span></h1>`);
  return user
    ? res.json({ message: "code sent successfully " })
    : res.json({ message: "not exist" });
});

//====================5)reset Password ====================
const resetPassword = catchAsyncErr(async (req, res) => {
  let { email, code, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user && code == user.code) {
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
    const user = await userModel.findOneAndUpdate(
      { email },
      { password: hash, $unset: { code: 1 } }
    );
    if (user) {
      res.json({ message: "code valid and password reset successfully " });
    }
  }
  else {
    res.json({ message: "code invalid and not matched" })
  }
});



export {
  signin,
  forgetPassword,
  resetPassword

};
