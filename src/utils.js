import { jwtDecode } from "jwt-decode";
import { createAxiosInstance } from "./api";
import SweetAlert from "sweetalert2";

export const getPositionFromPostcode = async (postcode) => {
  try {
    return (
      await createAxiosInstance().post(`/api/teachers/postcode`, { postcode })
    ).data;
  } catch (error) {
    return { ok: -1 };
  }
};
export const showErrorMessage = (message) => {
  SweetAlert.fire({
    icon: "error",
    imageHeight: "100px",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#0099FF",
  });
};

export const setToken = (value) => {
  localStorage.setItem("mathsAuthToken", value);
};

export const getToken = () => {
  const token = localStorage.getItem("mathsAuthToken");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      removeToken();
      return null;
    } else return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const removeToken = () => {
  localStorage.removeItem("mathsAuthToken");
};

export const isProfileCompleted = (profileUser) => {
  const {
    about,
    qualifications,
    title,
    online,
    faceToFace,
    gender,
    isAgency,
    publish,
    email,
    phone,
    exam,
    level,
    avatar,
  } = profileUser;

  const isQualificationAdded = Object.keys(qualifications).some(
    (k) => qualifications[k] !== -1
  );
  // const isEmailOrPhoneAdded = !!(email || phone)
  const isPersonalDetailsAdded =
    isAgency !== -1 &&
    title &&
    gender !== -1 &&
    publish !== -1 &&
    about &&
    avatar
      ? true
      : false;
  const isStatusAdded = !!(online || faceToFace);
  // const isExamAdded = (Object.keys(exam).some(k => exam[k])) ? true : false
  const isLevelAdded = Object.keys(level).some((k) => level[k]);

  const isCompleted =
    isQualificationAdded &&
    isPersonalDetailsAdded &&
    isStatusAdded &&
    isLevelAdded
      ? true
      : false;
  return isCompleted;
};

export const isProfileReadyForSubmission = (profileUser) => {
  const {
    about,
    qualifications,
    title,
    online,
    avatar,
    faceToFace,
    gender,
    isAgency,
    publish,
    level,
  } = profileUser;

  const isQualificationAdded = Object.keys(qualifications).some(
    (k) => qualifications[k] !== -1
  );
  const isPersonalDetailsAdded =
    isAgency !== -1 &&
    title &&
    gender !== -1 &&
    publish !== -1 &&
    about &&
    avatar
      ? true
      : false;
  const isStatusAdded = !!(online || faceToFace);
  const isLevelAdded = Object.keys(level).some((k) => level[k]);

  const isProfileReady =
    isQualificationAdded &&
    isPersonalDetailsAdded &&
    isStatusAdded &&
    isLevelAdded
      ? true
      : false;
  return isProfileReady;
};
