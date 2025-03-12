import axios from "axios";
import {
  API_BASE_URL,
  API_TIMEOUT,
  AUTH_HEADER_KEY,
  AUTH_HEADER_PREFIX,
} from "./apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_HEADER_KEY);
    if (token && token !== "null" && token !== "undefined") {
      config.headers[AUTH_HEADER_KEY] = `${AUTH_HEADER_PREFIX} ${token}`;
      console.info("요청에 인증 토큰 추가됨:", config.headers[AUTH_HEADER_KEY]);
    }
    return config;
  },
  (error) => {
    console.error("요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.error(`응답 오류 (${status}):`, error);

    if (status === 401) {
      console.warn("인증 실패 - 로그아웃 처리 중...");
      localStorage.removeItem(AUTH_HEADER_KEY);
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
