import axios from "axios";
import { Base_Url } from "../../../Config/Config.jsx";

const api = axios.create({
  baseURL: `${Base_Url}/user`,
});

api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("userData");

    const parseData = userData ? JSON.parse(userData) : null;
    const token = parseData.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const SendOtp = (name, email, phone, password) => {
  return axios.post(`${Base_Url}/user/register`, {
    name,
    email,
    phone,
    password,
  });
};

export const VerifyOtp = (verificationCode) => {
  console.log("verify", verificationCode);
  return axios.post(`${Base_Url}/user/verifyOtp`, { verificationCode });
};

export const userLogin = (email, password) => {
  return axios.post(`${Base_Url}/user/login`, { email, password });
};



export default api;
