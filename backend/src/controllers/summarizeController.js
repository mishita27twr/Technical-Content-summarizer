import { v4 as uuidv4 } from "uuid";
import { saveSession } from "../services/sessionStore.js";
import { chunkText } from "../services/chunkText.js";
import { getEmbedding } from "../services/embeddingService.js";
import {
  isYouTubeUrl,
  extractYouTubeTranscript,
} from "../utils/extractYouTubeTranscript.js";
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
    if (text && isYouTubeUrl(text.trim())) {
  text = await extractYouTubeTranscript(text.trim());
}

    if (req.file) {
      text = await extractTextFromFile(req.file);
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const MAX_WORDS = 2500;

const safeText = text
  .split(" ")
  .slice(0, MAX_WORDS)
  .join(" ");

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
${safeText}
          `,
        },
      ],
    });

    const summary = completion.choices[0].message.content;

const chunks = chunkText(safeText);

const chunksWithEmbeddings = await Promise.all(
  chunks.map(async (chunk) => ({
    text: chunk,
    embedding: await getEmbedding(chunk),
  }))
);

const sessionId = uuidv4();

saveSession(sessionId, {
  originalText: safeText,
  chunks,
  chunksWithEmbeddings,
  summary,
  summaryType: summaryType || "short",
  createdAt: new Date(),
});

res.status(200).json({
  success: true,
  summary,
  sessionId,
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