import api from "./api";

const getChatBotResponse = async (msg) => {
  try {
    const response = await api.post("/chat", { message: msg });
    // console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (error) {
    console.error("API 응답 실패:", error);
  }
};

export default getChatBotResponse;
