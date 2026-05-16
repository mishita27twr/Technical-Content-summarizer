import express from "express";
import multer from "multer";
import { summarizeText } from "../controllers/summarizeController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", summarizeText);

router.post("/file", upload.single("file"), summarizeText);

export default router;