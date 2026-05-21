import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoutes from "./routes/summarizeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

console.log("=================================");
console.log(
  "Groq Key Loaded:",
  process.env.GROQ_API_KEY ? "YES" : "NO"
);

console.log("=================================");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://technical-content-summarizer-j146.vercel.app",
  "https://technical-content-summarizer-e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/summarize", summarizeRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Context AI Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});