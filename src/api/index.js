import axios from "axios";
import { getToken } from "../utils";
import { logout } from "../store/main";
import { initProfile } from "../store/setProfile";

let store;
export const injectStore = (_store) => {
  store = _store;
};

export const API_URL = process.env.NEXT_PUBLIC_APP_SERVER;

export const createAxiosInstance = () => {
  console.log("api url: " + API_URL);
  const token = getToken();
  const instance = axios.create({
    baseURL: API_URL, // Replace with your API base URL
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  // Add a response interceptor to handle 401 errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        if (!error.config.url.includes("logout")) {
          store.dispatch(logout());
          store.dispatch(initProfile());
          return Promise.resolve({ data: {} });
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};
// export const API_URL = "http://localhost:8800"
