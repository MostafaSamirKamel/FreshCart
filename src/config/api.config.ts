import axios from "axios";
import { getCookie } from "@/Utils/cookie.util";

const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach token from cookies to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
