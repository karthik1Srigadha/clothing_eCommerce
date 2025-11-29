import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-k9ox.onrender.com/api",   // must end with /api
  withCredentials: true,
});

export default api;
