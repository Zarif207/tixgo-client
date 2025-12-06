import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/ticket-auth.jpg";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center">
        
        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center h-full p-8">
          <img
            src={authImg}
            alt="Auth"
            className="w-full max-w-lg object-cover rounded-2xl"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;