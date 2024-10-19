import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://new-evan-7.onrender.com/api"
});

export default axiosBase;
