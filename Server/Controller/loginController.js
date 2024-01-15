import userSchema from "../Model/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../TokenGenerator/generateToken.js";
import generateOtp from "../OtpGenerator/generateOtp.js";
import verifyOtp from "../OtpGenerator/verifyOtp.js";
import jwt from "jsonwebtoken";
import sanitize from "mongo-sanitize";

let globalData = {};
/**************************** User Register Send Otp *************************************/

const userRegisterSendOtp = async (req, res) => {
  try {
   
    const { name, email, phone, password } = req.body;

    const emailfind = await userSchema.findOne({ email });

    if (emailfind) {
     
      res.status(400).json({error:"email already existing"});
    } else {
      const message = "Your OTP for email verification";
      const subject = "Email Authentication Otp";
      const otp = await generateOtp(email, message, subject, res);
      res.status(200).json({ message: "OTP sent successfully" });
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .json("Some error occurred while hashing the password");
          return;
        }

        const newuser = {
          name: sanitize(name),
          email: sanitize(email),
          password: sanitize(hash),
          phone: sanitize(phone),
        };

        globalData.user = newuser;
        globalData.otp = otp;
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User Register Verify Otp *************************************/

const userRegisterVerifyOtp = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    const otpResponse = await verifyOtp(verificationCode, globalData?.otp, res);

    if (!otpResponse) {
      return res.status(400).json({ message: "OTP verification failed" });
    }

    const newUser = await userSchema.create(globalData.user);
    globalData.user = null;
    globalData.otp = null;
    const token = generateToken(newUser._id);

    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      token,
    });
  } catch (error) {}
};

/**************************** User Login  *************************************/

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const token = generateToken(user._id);
        res.status(201).json({
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          tagged: user?.tagged,
          token,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**************************** User Google Login  *************************************/

const googleLogin = async (req, res) => {
  try {
    const { id_token } = req.body;

    const decodedToken = jwt.decode(id_token);

    const { name, email, jti, phone } = decodedToken;
    const emailfind = await userSchema.findOne({ email });

    if (emailfind) {
      const existingUser = emailfind;

      const token = generateToken(existingUser?._id);

      return res.status(200).json({
        _id: existingUser?._id,
        name: existingUser?.name,
        email: existingUser?.email,
        phone: existingUser?.phone,
        tagged: existingUser?.tagged,
        token,
      });
    } else {
      const addUser = await userSchema.create({
        name: sanitize(name),
        email: sanitize(email),
        jti: sanitize(jti),
        phone: sanitize(phone),
      });

      const token = generateToken(addUser._id);
      return res.status(200).json({
        _id: addUser?._id,
        name: addUser?.name,
        email: addUser?.email,
        phone: addUser?.phone,
        tagged: addUser?.tagged,
        token,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

/**************************** User Profile  *************************************/

const userProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetails = await userSchema.findById(id);
    if (userDetails) {
      res.status(201).json({
        userDetails,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**************************** User Edit Profile  *************************************/

const userEditProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, password, gender, age, country } = req.body;
    const userDetails = await userSchema.findByIdAndUpdate(
      id,
      {
        name: sanitize(name),
        phone: sanitize(phone),
        email: sanitize(email),
        password: sanitize(password),
        gender: sanitize(gender),
        age: sanitize(age),
        country: sanitize(country),
      },
      { new: true }
    );
    if (userDetails) {
      res.status(201).json({
        userDetails,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**************************** User Edit Profile  *************************************/
const userEditProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.body;
    const userImage = await userSchema.findByIdAndUpdate(
      id,
      {
        photo:sanitize (photo),
      },
      { new: true }
    );
    if (userImage) {
      res.status(201).json({
        userImage,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
/**************************** User Reset Password otp *************************************/

const resetPasswordSentOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const emailfind = await userSchema.findOne({ email });

    if (emailfind != null) {
      const message = "Your OTP for reset password";
      const subject = "Email Authentication Otp";
      const otp = await generateOtp(email, message, subject, res);

      res.status(200).json({ message: "OTP sent successfully" });
      globalData.otp = otp;
    } else {
      res.status(400).json({ message: "No Email Exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** User verify Password otp  *************************************/

const PasswordVerifyOtp = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }
    const otpResponse = await verifyOtp(verificationCode, globalData?.otp, res);

    if (!otpResponse) {
      return res.status(400).json({ message: "OTP verification failed" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in resetting password:", error);
    return res.status(500).json(error);
  }
};

/**************************** User reset Password   *************************************/

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (hashedPassword) {
      userSchema
        .findOneAndUpdate(
          { email: email },
          { password:sanitize (hashedPassword) },
          { new: true }
        )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with ID: ${email}. User not found.`,
            });
          } else {
            return res
              .status(200)
              .json({ message: "Password reset successfully" });
          }
        })
        .catch(() => {
          return res.status(500).json({ message: "Password reset failed" });
        });
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password reset error" });
  }
};

export {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
  userEditProfile,
  userProfile,
  resetPassword,
  PasswordVerifyOtp,
  resetPasswordSentOtp,
  userEditProfileImage,
  googleLogin,
};
