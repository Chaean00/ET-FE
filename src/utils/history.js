import api from "./api";

export const getUserHistory = async () => {
  try {
    const response = await api.get("users/history/count");
    const executedCount = response.data.count;

    return executedCount;
  } catch (error) {
    console.error("거래 내역 조회 실패:", error);
    return 0;
  }
};
