import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
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
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );

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

export const apiUpdateProfileImage = (data) =>
  api.post("/api/update-profile-image", data);

export const apiUpdateProfile = (data) => api.post("/api/update-profile", data);

export const apiForgotPassword = (data) =>
  api.post("/api/forgot-password", data);

export const apiNewPost = (data) => api.post("/api/new-post", data);

export const apiUploadImage = (data) =>
  api.post("/api/upload-post-image", data);

export const apiGetPosts = () => api.get("/api/get-posts");

export const apiGetPost = (id) => api.get(`/api/get-post/${id}`);

export const apiGetUserPosts = () => api.get("/api/get-user-posts");

export const apiDeletePost = (id) => api.post(`/api/delete-post/${id}`);

export const apiLikePost = (id) => api.post(`/api/like-post/${id}`);

export const apiUnLikePost = (id) => api.post(`/api/unlike-post/${id}`);

export const apiIsLikedPost = (id) => api.get(`/api/is-liked/${id}`);

export const apiTotalLikes = (id) => api.get(`/api/total-likes/${id}`);

export const apiUpdatePost = (id, data) =>
  api.post(`/api/update-post/${id}`, data);

export const apiNewComment = (id, message) =>
  api.post(`/api/new-comment/${id}`, message);

export const apiGetComments = (id) => api.get(`/api/get-comments/${id}`);

export default api;
