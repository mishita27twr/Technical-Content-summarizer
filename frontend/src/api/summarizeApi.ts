import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
  
export type SummaryType = "Short" | "Detailed" | "Bullets";

export interface SummaryResponse {
  success?: boolean;
  summary: string;
  error?: string;
  message?: string;
}

export const summarizeApi = {
  summarizeText: async (
    text: string,
    summaryType: SummaryType
  ): Promise<string> => {
    try {
      const response = await axios.post<SummaryResponse>(
        `${API_BASE_URL}/api/summarize`,
        {
          text,
          summaryType,
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.summary;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to generate summary"
      );
    }
  },

  summarizeFile: async (
    file: File,
    summaryType: SummaryType
  ): Promise<string> => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("summaryType", summaryType);

      const response = await axios.post<SummaryResponse>(
        `${API_BASE_URL}/api/summarize/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data.summary;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to generate summary from file"
      );
    }
  },
};