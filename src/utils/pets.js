import api from "./api";

export const getPets = async () => {
  try {
    const response = await api.get("/pets");
    console.log("펫 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("펫 목록 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};
