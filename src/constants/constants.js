import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
});

// Interceptor para anexar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@CookAI:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
