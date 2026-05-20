import express from "express";
import { chatWithContent } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithContent);

export default router;