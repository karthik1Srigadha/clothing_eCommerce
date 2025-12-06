import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",   // must end with /api
  withCredentials: true,
});

export default api;
