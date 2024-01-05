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
  return axios.post(`${Base_Url}/api/auth/signup`, {
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
  return axios.get(`${Base_Url}/api/books/published`);
 
};

export const addBooks = (title, summary, genre, price, image,userId) => {
  console.log(title, summary, genre,price, image, userId);
  return api.post(`/books/publish`,{
    title,
    summary,
    genre,
    image,
    price,
    userId,
  });
};



export default api;
