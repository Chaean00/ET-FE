import api from "./api";

export const login = async (uid, password) => {
  try {
    const response = await api.post("/auth/login", {
      uid,
      pwd: password,
    });

    if (response.data?.token) {
      localStorage.setItem("Authorization", response.data.token);
      return response.data;
    } else {
      throw new Error("로그인 실패: 토큰이 없습니다.");
    }
  } catch (error) {
    console.error("로그인 오류:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("Authorization");
  window.location.href = "/login";
};
