import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import {
  FaBusAlt,
  FaTrain,
  FaShip,
  FaPlane,
} from "react-icons/fa";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 border-rounded-3xl overflow-hidden m-6 shadow-lg">

        {/* LEFT SECTION */}
        <div
          className="
            hidden lg:flex items-center justify-center
            bg-gradient-to-br from-blue-500/10 to-blue-700/10
            p-12 border-rounded-5xl
          "
        >
          <div className="max-w-lg space-y-10 text-center">

            <h2 className="text-4xl font-extrabold">
              Welcome to <span className="text-primary">TixGo</span>
            </h2>

            <p className="text-base-content/70 text-lg">
              Book tickets easily from trusted vendors worldwide.
            </p>

            {/* Icons */}
            <div className="grid grid-cols-4 gap-6">
              {[FaBusAlt, FaTrain, FaShip, FaPlane].map((Icon, i) => (
                <div
                  key={i}
                  className="
                    bg-white rounded-2xl p-4
                    shadow-md hover:shadow-lg
                    transition
                  "
                >
                  <Icon className="text-3xl mx-auto text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div
              className="
                bg-base-100
                border border-base-300
                rounded-3xl
                shadow-xl
                p-8
              "
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;