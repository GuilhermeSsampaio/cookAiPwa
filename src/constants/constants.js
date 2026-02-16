import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
});

// Flag para evitar múltiplos refreshes simultâneos
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para anexar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@CookAI:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh automático quando o access_token expira
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se não é 401 ou já tentou refresh, rejeita normalmente
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Não tenta refresh em rotas de autenticação
    const authPaths = [
      "/auth/login",
      "/auth/refresh",
      "/cookai/users/login",
      "/cookai/users/register",
      "/auth/register",
    ];
    if (authPaths.some((path) => originalRequest.url?.includes(path))) {
      return Promise.reject(error);
    }

    // Se já está fazendo refresh, enfileira a request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("@CookAI:refresh_token");

    if (!refreshToken) {
      isRefreshing = false;
      // Sem refresh token → desloga
      localStorage.removeItem("@CookAI:token");
      localStorage.removeItem("@CookAI:refresh_token");
      localStorage.removeItem("@CookAI:user");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data;

      localStorage.setItem("@CookAI:token", access_token);
      localStorage.setItem("@CookAI:refresh_token", newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      processQueue(null, access_token);

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      // Refresh falhou → desloga
      localStorage.removeItem("@CookAI:token");
      localStorage.removeItem("@CookAI:refresh_token");
      localStorage.removeItem("@CookAI:user");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
