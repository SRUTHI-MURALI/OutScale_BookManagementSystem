import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../Connection/connection.js";
import userRouter from "../Routes/userRouter.js";
const app = express();

app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
const port = process.env.port;

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);