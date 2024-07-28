import dotenv from "dotenv";
import express from "express";
import colors from "colors";
import cors from "cors";
import path from "path"
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import useUserRouter from './routes/user.js'
import mongoDBConnect from "./config/db.js";
// init express
const app = express();
dotenv.config();

// directory
const __dirname = path.resolve();

// config cors
app.use(cors());
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/api/public")));
// init env variabels
const PORT = process.env.PORT || 8000;

app.use(`${process.env.apiPrefix}/user`, useUserRouter)

// express error handler
app.use(errorHandler);

// listen server
app.listen(PORT, () => {
    mongoDBConnect();
    console.log(`server running on port ${PORT}`.bgGreen.black);
  });