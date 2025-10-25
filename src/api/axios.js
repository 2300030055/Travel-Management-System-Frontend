import axios from "axios";

// Use Vite env variable VITE_API_BASE, fallback to localhost:8081
const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:8081";

const api = axios.create({
  baseURL,
});

// Request interceptor: attach token if present
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const auth = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        config.headers = config.headers || {};
        config.headers["Authorization"] = auth;
      }
    } catch (e) {
      // ignore localStorage errors in some environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      try {
        localStorage.clear();
      } catch (e) {}
      // redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
