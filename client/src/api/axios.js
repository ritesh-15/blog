import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        const response = await axios.get("http://localhost:9000/api/refresh", {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {}
    }
    throw error;
  }
);

export const apiRegister = (data) => api.post("/api/register", data);

export const apiCheckEmail = (email) => api.get(`/api/check-email/${email}`);

export const apiLogin = (data) => api.post("/api/login", data);

export const apiLogOut = () => api.post("/api/logout");

export default api;
