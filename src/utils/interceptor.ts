import axios, { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("si_her");
    if (!config.headers || !(config.headers instanceof AxiosHeaders)) {
      config.headers = new AxiosHeaders();
    }
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("si_her");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
