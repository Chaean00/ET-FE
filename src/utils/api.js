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
    if (token) {
      config.headers[AUTH_HEADER_KEY] = `${AUTH_HEADER_PREFIX} ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("인증 실패 - 로그아웃 처리");
      localStorage.removeItem(AUTH_HEADER_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
