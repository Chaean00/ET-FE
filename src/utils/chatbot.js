import api from "./api";

const getChatBotResponse = async (msg) => {
  try {
    const response = await api.post("/chat", { message: msg });
    return response.data;
  } catch (error) {
    console.error("API 응답 실패:", error);
  }
};

export default getChatBotResponse;
