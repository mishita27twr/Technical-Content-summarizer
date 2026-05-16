import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRoutes from "./routes/summarizeRoutes.js";

dotenv.config();

console.log("=================================");
console.log(
  "Groq Key Loaded:",
  process.env.GROQ_API_KEY ? "YES" : "NO"
);

if (process.env.GROQ_API_KEY) {
  console.log(
    "Key starts with:",
    process.env.GROQ_API_KEY.slice(0, 8)
  );
}
console.log("=================================");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/summarize", summarizeRoutes);

app.get("/", (req, res) => {
  res.send("SummarizeMate AI Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});