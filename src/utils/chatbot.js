import api from "./api";

const getChatBotResponse = async (msg) => {
  try {
    const response = await api.post("/chat", { message: msg });
    return response.data;
  } catch (error) {
  }
};

export default getChatBotResponse;
