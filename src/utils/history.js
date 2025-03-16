import api from "./api";

export const getUserHistory = async () => {
  try {
    const response = await api.get("users/history/count");
    const executedCount = response.data.count;

    return executedCount;
  } catch (error) {
    return 0;
  }
};
