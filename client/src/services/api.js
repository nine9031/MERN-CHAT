import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

console.log("BASE URL:", baseURL);

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
