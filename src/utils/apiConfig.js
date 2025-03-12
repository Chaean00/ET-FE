const API_BASE_URL = `http://${import.meta.env.VITE_API_BASE_URL}:${
  import.meta.env.VITE_API_BASE_PORT
}/api`;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
const AUTH_HEADER_KEY = import.meta.env.VITE_AUTH_HEADER_KEY;
const AUTH_HEADER_PREFIX = import.meta.env.VITE_AUTH_HEADER_PREFIX;

export { API_BASE_URL, API_TIMEOUT, AUTH_HEADER_KEY, AUTH_HEADER_PREFIX };
