import axios from "axios";

export const setupAxios = (logoutUser, user) => {
  axios.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Session expired (axios). Logging out...");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
};
