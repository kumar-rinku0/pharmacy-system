import User from "../models/user.js";
import { setUser } from "../utils/jwt.js";
import { isRightUser } from "../utils/functions.js";
import bcrypt from "bcryptjs";
import { createMailSystem } from "../utils/mail.js";

const handleUserSignUp = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const userbyemail = await User.findOne({ email });
  if (userbyemail) {
    return res
      .status(500)
      .send({ message: "user already exist.", user: userbyemail });
  }
  const user = new User({
    fullName,
    email,
    phone,
    password,
  });
  await user.save();
  await createMailSystem({
    address: user.email,
    type: "verify",
    _id: user._id,
  });
  return res.status(200).send({ message: "user created.", user: user });
};

const handleUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await isRightUser(email, password);
  if (user?.message) {
    return res.status(401).json({ message: user.message, status: 401 });
  }
  const token = setUser(user);
  res.cookie("JWT_TOKEN", token, {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  return res.status(200).json({ user: user, message: "login successful" });
};

const handleUserLogout = async (req, res) => {
  res.cookie("JWT_TOKEN", "");
  return res.status(200).json({ message: "logout successful" });
};

const handleGetOneUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "invailid user id." });
  }
  return res.status(200).json({ user: user, message: "ok!" });
};

// verify user
const handleUserVerify = async (req, res) => {
  const { TOKEN } = req.query;
  console.log(TOKEN);
  const user = await User.findOne({ verifyToken: TOKEN });
  if (user && user.verifyTokenExpire > Date.now()) {
    const info = await User.findByIdAndUpdate(
      user._id,
      {
        isVerified: true,
        verifyToken: null,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User verified.", user: info, status: 200 });
  }
  return res.status(400).json({ message: "Invalid token.", status: 400 });
};

const handleUserSendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found." });
  }
  await createMailSystem({
    address: user.email,
    type: "verify",
    _id: user._id,
  });
  return res.status(200).json({ message: "verify email sent." });
};

// reset password
const handleUserSendResetEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found." });
  }
  await createMailSystem({ address: email, type: "reset", _id: user._id });
  return res.status(200).json({ message: "reset email sent." });
};

const handleUserResetPassword = async (req, res) => {
  const { TOKEN } = req.query;
  const { password } = req.body;
  const user = await User.findOne({ resetToken: TOKEN });
  if (!user) {
    return res.status(400).json({ message: "Invalid token." });
  }
  if (user.resetTokenExpire < Date.now()) {
    return res.status(400).json({ message: "Token expired." });
  }
  const salt = await bcrypt.genSalt(10);
  const hexcode = await bcrypt.hash(password.trim(), salt);
  const info = await User.findByIdAndUpdate(
    user._id,
    {
      password: hexcode,
      resetToken: null,
    },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Password reset successful.", user: info });
};

export {
  handleUserSignUp,
  handleUserSignIn,
  handleUserLogout,
  handleGetOneUser,
  handleUserVerify,
  handleUserResetPassword,
  handleUserSendVerifyEmail,
  handleUserSendResetEmail,
};
