import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";

export const extractTextFromFile = async (file) => {
  const filePath = file.path;
  const mimeType = file.mimetype;

  // TXT FILES
  if (mimeType === "text/plain") {
    const text = fs.readFileSync(filePath, "utf-8");
    return text;
  }

  // PDF FILES
  if (mimeType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    return pdfData.text;
  }

  // DOCX FILES
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  // DOC FILES
  if (mimeType === "application/msword") {
    throw new Error(
      "DOC files are not fully supported yet. Please convert to DOCX."
    );
  }

  // IMAGE FILES
  if (
    mimeType === "image/png" ||
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg"
  ) {
    const result = await Tesseract.recognize(
      filePath,
      "eng"
    );

    return result.data.text;
  }

  throw new Error(
    "Unsupported file type. Please upload TXT, PDF, DOCX, PNG, JPG, or JPEG files."
  );
};