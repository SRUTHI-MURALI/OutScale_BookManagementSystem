import express from "express";
const userRouter = express.Router();

import {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
  googleLogin,
  userProfile,
  userEditProfile,
  userEditProfileImage,
  resetPasswordSentOtp,
  PasswordVerifyOtp,
  resetPassword,
} from "../Controller/loginController.js";
import { userLoggedIn } from "../Middleware/userAuth.js";

/**************************** User Register  *************************************/
userRouter.post("/signup", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);
userRouter.post("/googlelogin", googleLogin);

/**************************** User Profile  *************************************/
userRouter.get("/profile/:id", userLoggedIn, userProfile);

/**************************** User Edit Profile  *************************************/
userRouter.put("/editprofile/:id", userLoggedIn, userEditProfile);
userRouter.put("/editprofileimage/:id", userLoggedIn, userEditProfileImage);

/**************************** User Forgot Password  *************************************/
userRouter.post("/resetpasswordsentotp", resetPasswordSentOtp);
userRouter.post("/verifyforgotpasswordotp", PasswordVerifyOtp);
userRouter.put("/resetpassword", resetPassword);

export default userRouter;
