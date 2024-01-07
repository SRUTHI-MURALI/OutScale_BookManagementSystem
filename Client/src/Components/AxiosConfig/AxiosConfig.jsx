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
  return api.get(`/books/published`);
};

export const getUserBooks = (id) => {
  return api.get(`/books/user/${id}`);
};

export const addBooks = (
  title,
  summary,
  genre,
  price,
  image,
  userId,
  userName
) => {
  return api.post(`/books/publishnewbook`, {
    title,
    summary,
    genre,
    image,
    price,
    userId,
    userName,
  });
};

export const tagingBooks = (id, userId) => {
  
  return api.put(`/books/managetags/${id}`, { userId });
};
export const publishBooks = (id) => {
  return api.put(`/books/publish/${id}`);
};
export const unPublishBooks = (id) => {
  return api.put(`/books/unpublish/${id}`);
};

export const getEditBooks = (id) => {
  return api.get(`/books/geteditbook/${id}`);
};

export const editBook = ( title, summary, genre,price,id) => {
  return api.put(`/books/editbooks/${id}`, { title, summary, genre,price});
};

export const searchBooks = (searchItem) => {
  return api.post(`/books/search`,{searchItem});
};

export const taggedBooks = (id) => {
  return api.get(`/books/getTaggedBooks/${id}`);
};

export const getUserProfile = (id) => {
  return api.get(`/auth/profile/${id}`);
};


export const userEditProfile = ( id,name, phone, email,password,gender,age,country) => {
  return api.put(`/auth/editprofile/${id}`, {name, phone, email,password,gender,age,country});
};

export const userEditProfileImage = (id,photo)=>{
  return api.put(`/auth/editprofileimage/${id}`,{photo})
}

export default api;
