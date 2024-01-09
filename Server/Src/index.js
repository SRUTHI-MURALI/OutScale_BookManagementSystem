import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan'
import connectDB from "../Connection/connection.js";
import userRouter from "../Routes/userRouter.js";
import bookRouter from "../Routes/bookRouter.js";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const app = express();
// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());
dotenv.config();

app.use(express.json());
connectDB();
const corsOption = {
  origin: '*'
};
app.use(cors(corsOption));
const PORT = process.env.port;
app.use(morgan('tiny'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);

app.use(express.static(path.join(__dirname, "../../Client/dist"))); 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../Client/dist/index.html'))
});

app.listen(PORT || 3000);