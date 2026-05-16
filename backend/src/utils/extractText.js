import fs from "fs";

export const extractTextFromFile = async (file) => {
  const filePath = file.path;
  const mimeType = file.mimetype;

  if (mimeType === "text/plain") {
    const text = fs.readFileSync(filePath, "utf-8");
    return text;
  }

  throw new Error("Only TXT files are supported right now");
};