import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-k9ox.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
