import { YoutubeTranscript } from "youtube-transcript";

export const isYouTubeUrl = (text) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(text);
};

export const extractYouTubeTranscript = async (url) => {
  const transcript = await YoutubeTranscript.fetchTranscript(url);

  if (!transcript || transcript.length === 0) {
    throw new Error("No transcript found for this YouTube video.");
  }

  return transcript.map((item) => item.text).join(" ");
};