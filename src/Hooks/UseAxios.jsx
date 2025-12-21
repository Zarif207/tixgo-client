import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tixgo-server.vercel.app",
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
