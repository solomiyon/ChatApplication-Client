import axios from "axios";
import Auth from "./Auth";

export const interceptors = axios.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
