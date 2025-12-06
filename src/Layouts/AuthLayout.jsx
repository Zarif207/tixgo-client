import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/ticket-auth.jpg";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const AuthLayout = () => {
  return (
    <div>
    <Navbar/>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex items-center justify-center p-6">
          <img
            src={authImg}
            alt="Auth Illustration"
            className=" object-cover rounded-xl h-[300] w-[300] "
          />
        </div>

        {/* RIGHT SIDE OUTLET */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
           <Outlet/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AuthLayout;
