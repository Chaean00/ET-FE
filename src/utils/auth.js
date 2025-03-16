import api from "./api";

export const signup = async (uid, pwd, name) => {
  try {
    const response = await api.post("/auth/signup", {
      uid,
      pwd,
      name,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (uid, password) => {
  try {
    const response = await api.post("/auth/login", {
      uid,
      pwd: password,
    });

    if (response.data?.token) {
      localStorage.setItem("Authorization", response.data.token);
      localStorage.setItem("userUid", uid);
      return response.data;
    } else {
      throw new Error("로그인 실패: 토큰이 없습니다.");
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("Authorization");
  localStorage.removeItem("userUid");
  window.location.href = "/login";
};
