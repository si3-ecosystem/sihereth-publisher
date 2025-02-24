import axios, { AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { useSelector } from "react-redux";
import store, { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { toast } from "react-hot-toast";
import Router from "next/router";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useSelector((state: RootState) => state.user?.token);
    if (!config.headers || !(config.headers instanceof AxiosHeaders)) {
      config.headers = new AxiosHeaders();
    }
    if (!token) {
      toast.error("Session expired, please login again.");
      Router.push("/login");
    } else {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorData = error.response?.data as { message?: string };
    const errorMessage = errorData?.message ?? "An error occurred. Please try again.";
    if (status === 401) {
      store.dispatch(logout());
      toast.error(errorMessage || "Unauthorized! Redirecting to login...");
      Router.push("/login");
    } else if (status === 500) {
      toast.error(errorMessage || "Server error. Please try again later.");
    } else {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
