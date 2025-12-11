import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import UseAuth from "./UseAuth";


const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  const { user, signOutUser } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      // config.headers.Authorization = `Bearer ${user?.accessToken}`;
      const token = user?.stsTokenManager?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );
    

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);
  return axiosSecure;
};

export default UseAxiosSecure;
