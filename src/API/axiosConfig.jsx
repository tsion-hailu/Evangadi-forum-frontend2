import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://evangadi-forum-backend-deploy-1-05zz.onrender.com/api",
});

export default axiosBase;
