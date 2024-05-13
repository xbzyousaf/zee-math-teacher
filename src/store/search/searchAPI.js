import { createAxiosInstance } from "../../api";

export const fetchTutors = async (params) => {
  return await createAxiosInstance().get(`/api/teachers/search`, { params });
};

export const fetchMoreTutors = async (body) => {
  return createAxiosInstance().post(`/api/teachers/more`, body);
};

const profileAPI = {
  fetchTutors,
  fetchMoreTutors,
};

export default profileAPI;
