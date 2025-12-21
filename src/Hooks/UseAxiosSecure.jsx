import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tixgo-server.vercel.app",
   
});

const UseAxiosSecure = () => {
  const { signOutUser } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken(true);
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          await signOutUser();
          navigate("/auth/login", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default UseAxiosSecure;
