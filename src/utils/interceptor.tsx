import axios, { AxiosError, AxiosResponse } from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  withCredentials: true,
  timeout: 30000
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    let errorMessage = "Something went wrong";
    if (data && typeof data === "object" && "message" in data) {
      errorMessage = data.message as string;
    }
    switch (status) {
      case 401:
        store.dispatch(logout());
        toast.error("Session expired. Please log in again.");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        break;
      case 500:
        toast.error("Server error. Please try again later.");
        break;
      default:
        toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
