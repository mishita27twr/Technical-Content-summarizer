import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { extractTextFromFile } from "../utils/extractText.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const summarizeText = async (req, res) => {
  try {
    let { text, summaryType } = req.body;

    if (req.file) {
      text = await extractTextFromFile(req.file);
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI summarizer. Summarize text clearly without changing the meaning.",
        },
        {
          role: "user",
          content: `Summarize this text in a ${
            summaryType || "simple"
          } way:\n\n${text}`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI summarization failed",
      error: error.message,
    });
  }
};