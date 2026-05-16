import axios from "axios";

const API_BASE_URL = "https://technical-content-summarizer.onrender.com";

export type SummaryType = "short" | "detailed" | "bullet_points";

export interface SummaryResponse {
  summary: string;
  error?: string;
}

export const summarizeApi = {
  summarizeText: async (text: string, summaryType: SummaryType): Promise<string> => {
    try {
      const response = await axios.post<SummaryResponse>(`${API_BASE_URL}/api/summarize`, {
        text,
        summaryType,
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      return response.data.summary;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.message || "Failed to generate summary");
    }
  },

  summarizeFile: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post<SummaryResponse>(`${API_BASE_URL}/api/summarize/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      return response.data.summary;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.message || "Failed to generate summary from file");
    }
  },
};
