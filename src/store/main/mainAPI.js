import { createAxiosInstance } from "../../api";

export const login = async (data) => {
  return createAxiosInstance().post(`/api/auth/login`, data);
};

export const getCurrentUser = async () => {
  return createAxiosInstance().get(`/api/auth/`);
};

export const logout = async () => {
  return createAxiosInstance().post(`/api/auth/logout`);
};

export const signup = async (data) => {
  return createAxiosInstance().post(`/api/auth/register`, data);
};

const mainAPI = {
  login,
  logout,
  signup,
  getCurrentUser,
};

export default mainAPI;
