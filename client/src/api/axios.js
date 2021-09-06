import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const apiRegister = (data) => api.post("/api/register", data);

export const apiCheckEmail = (email) => api.get(`/api/check-email/${email}`);

export const apiLogin = (data) => api.post("/api/login", data);

export default api;
