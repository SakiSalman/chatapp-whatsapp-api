import express from "express";
import multer from "multer";
import path from "path";
import tokenVerify from "../middlewares/tokenVerify.js";
import { createChats, getAllChat } from "../controllers/chatController.js";


const __dirname = path.resolve();
// init router
const router = express.Router();

// Multer For Slider
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    // console.log(file);
     cb(null, path.join(__dirname, "/public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const image = multer({ storage }).array("images", 10);
// use verify token
router.use(tokenVerify);

router.post('/', createChats);
router.get('/:id', getAllChat);
export default router;
