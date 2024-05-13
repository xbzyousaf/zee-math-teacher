import { createAxiosInstance } from "../../api";

export const getProfile = async () => {
  return createAxiosInstance().get(`/api/teachers/`);
};

export const getMyMessages = async () => {
  return createAxiosInstance().get(`/api/messages/`);
};

export const saveProfile = async (profile) => {
  return createAxiosInstance().post(`/api/teachers/draft`, profile);
};

export const deactivateProfile = async (profile) => {
  return createAxiosInstance().post(`/api/teachers/deactivate`, profile);
};

export const submitProfile = async (profile) => {
  return createAxiosInstance().post(`/api/teachers/`, profile);
};

export const readMessages = async () => {
  return createAxiosInstance().post(`/api/messages/read`);
};
export const getGuestProfile = async () => {
  return createAxiosInstance().get(`/api/guests/`);
};
export const updateGuestProfile = async (data) => {
  return createAxiosInstance().post(`/api/guests/update`, data);
};

const profileAPI = {
  getProfile,
  saveProfile,
  submitProfile,
  getMyMessages,
  readMessages,
  deactivateProfile,
  getGuestProfile,
  updateGuestProfile,
};

export default profileAPI;
