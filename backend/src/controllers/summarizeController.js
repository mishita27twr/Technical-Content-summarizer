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
            "You are a professional AI summarizer. Follow the summary type instructions carefully.",
        },

        {
          role: "user",

          content: `
You are an AI summarizer.

Summary type selected: ${summaryType || "short"}

Instructions:

1. If summaryType is "short":
Start with:
"Here's a short summary of the text:"

Then give a concise summary in 2-3 lines only.

2. If summaryType is "detailed":
Start with:
"Here's a detailed summary of the text:"

Then explain the important points clearly in detailed paragraph form.

3. If summaryType is "bullets":
Start with:
"Here's the bullet points of the text:"

Then give ONLY bullet points.
Each bullet point must start with "-".

4. Keep the original meaning unchanged.
5. Make the response clean and readable.

Text:
${text}
          `,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI summarization failed",
      error: error.message,
    });
  }
};