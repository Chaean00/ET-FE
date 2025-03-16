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
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem(AUTH_HEADER_KEY);
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
