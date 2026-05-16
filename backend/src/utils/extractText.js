import fs from "fs";
import { createRequire } from "module";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

export const extractTextFromFile = async (file) => {
  const filePath = file.path;
  const mimeType = file.mimetype;

  if (mimeType === "text/plain") {
    return fs.readFileSync(filePath, "utf-8");
  }

  if (mimeType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  if (
    mimeType === "image/png" ||
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg"
  ) {
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;
  }

  throw new Error(
    `Unsupported file type: ${mimeType}. Please upload TXT, PDF, DOCX, PNG, JPG, or JPEG.`
  );
};