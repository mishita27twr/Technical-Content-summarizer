import Groq from "groq-sdk";
import dotenv from "dotenv";
import { getSession } from "../services/sessionStore.js";
import { getEmbedding } from "../services/embeddingService.js";
import { findTopChunks } from "../services/vectorSearch.js";


dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithContent = async (req, res) => {
  try {
    const { sessionId, question } = req.body;

    if (!sessionId || !question) {
      return res.status(400).json({
        success: false,
        message: "sessionId and question are required",
      });
    }

    const session = getSession(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found. Please summarize the content again.",
      });
    }

    if (!session.chunksWithEmbeddings) {
      return res.status(400).json({
        success: false,
        message: "Vector data not found. Please summarize the content again.",
      });
    }

    const questionEmbedding = await getEmbedding(question);

    const topChunks = findTopChunks(
      questionEmbedding,
      session.chunksWithEmbeddings,
      3
    );

    const context = topChunks.map((chunk) => chunk.text).join("\n\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant. Answer only using the provided content. If the answer is not in the content, say you could not find it in the uploaded content.",
        },
        {
          role: "user",
          content: `
Relevant content chunks:
${context}

User question:
${question}
          `,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      answer,
      sourcesUsed: topChunks.length,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Chat failed",
      error: error.message,
    });
  }
};