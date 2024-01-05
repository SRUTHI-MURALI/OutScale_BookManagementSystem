import axios from "axios";
import { Base_Url } from "../../../Config/Config.jsx";

const api = axios.create({
  baseURL: `${Base_Url}/api`,
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
  return axios.post(`${Base_Url}/api/auth/signin`, {
    name,
    email,
    phone,
    password,
  });
};

export const VerifyOtp = (verificationCode) => {
 
  return axios.post(`${Base_Url}/api/auth/verifyOtp`, { verificationCode });
};

export const userLogin = (email, password) => {
  return axios.post(`${Base_Url}/api/auth/login`, { email, password });
};

export const getBooks = () => {
  return api.get(`/books/published`);
};



export default api;
