import api from "./api";

export const getUserHistory = async () => {
  try {
    const response = await api.get("/users/history");
    console.log("거래 내역 조회 성공:", response.data);
    return response.data.length;
  } catch (error) {
    console.error("거래 내역 조회 실패:", error);
    return 0;
  }
};
