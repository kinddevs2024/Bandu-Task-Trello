// /lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.bandu.uz/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
