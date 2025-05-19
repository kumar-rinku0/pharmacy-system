import { Router } from "express";
import wrapAsync from "../utils/async-wrap.js";
import {
  handleUserSignUp,
  handleUserSignIn,
  handleUserLogout,
  handleGetOneUser,
  handleUserVerify,
  handleUserSendVerifyEmail,
  handleUserSendResetEmail,
  handleUserResetPassword,
} from "../controllers/user.js";

const route = Router();

route.route("/").get((req, res) => {
  return res.status(200).json({ msg: "ok" });
});

route.route("/verify").get(wrapAsync(handleUserVerify));
route.route("/verify").post(wrapAsync(handleUserSendVerifyEmail));

route.route("/reset").post(wrapAsync(handleUserSendResetEmail));
route.route("/reset").put(wrapAsync(handleUserResetPassword));

route.route("/userId/:userId").get(wrapAsync(handleGetOneUser));

route.route("/signin").post(wrapAsync(handleUserSignIn));
route.route("/signup").post(wrapAsync(handleUserSignUp));

route.route("/logout").get(wrapAsync(handleUserLogout));

export default route;
