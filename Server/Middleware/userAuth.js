import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import * as dotenv from "dotenv";

dotenv.config();

const userLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const userId = decoded?.userId;

      const user = await User.findById(userId).select("-password");

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
  }
};

export { userLoggedIn };
