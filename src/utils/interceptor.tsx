import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    let errorMessage = "Something went wrong";
    if (data && typeof data === "object" && "message" in data) {
      errorMessage = data.message as string;
    }
    if (status === 401) {
      store.dispatch(logout());
      toast.error("Session expired. Please log in again.");
      if (store.getState().user.token) {
        window.location.href = "/login";
      }
    } else {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
