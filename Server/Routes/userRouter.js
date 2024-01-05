import express from "express";
const userRouter = express.Router();

import {userRegisterSendOtp,userRegisterVerifyOtp,userLogin} from "../Controller/loginController.js"

/**************************** User Register  *************************************/
userRouter.post("/signup", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);





/**************************** User Tag note   *************************************/
// userRouter.put("/tagNote/:id", userLoggedIn, usertagNote);

/**************************** User UnTag note   *************************************/
// userRouter.put("/untagNote/:id", userLoggedIn, userUntagNote);

/**************************** User tagged notes page   *************************************/
// userRouter.get("/getTaggedNotes/:id", userLoggedIn, userTaggedNotesPage);

export default userRouter;
