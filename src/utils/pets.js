import api from "./api";

export const getPets = async () => {
  try {
    const response = await api.get("/pets");
    return response.data;
  } catch (error) {
    console.error("펫 조회 실패:", error);
    return [];
  }
};

export const postPets = async () => {
  try {
    const response = await api.post("/pets");
    return response.data;
  } catch (error) {
    console.error("펫 지급 실패:", error);
    throw error;
  }
};
