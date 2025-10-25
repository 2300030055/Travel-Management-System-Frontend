import axios from "axios";

// Use Vite env variable VITE_API_BASE, fallback to localhost:8081
const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:8081";

const api = axios.create({
  baseURL,
  // You can set defaults like headers here if needed
  // headers: { 'Content-Type': 'application/json' }
});

export default api;
