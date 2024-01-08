import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../Connection/connection.js";
import userRouter from "../Routes/userRouter.js";
import bookRouter from "../Routes/bookRouter.js";
const app = express();

app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
const corsOption = {
  origin: '*'
};
app.use(cors(corsOption));
const PORT = process.env.port;

app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT || 3001);