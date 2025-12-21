import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import {
  FaBusAlt,
  FaTrain,
  FaShip,
  FaPlane,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT VISUAL SECTION */}
        <div
          className="
            hidden lg:flex items-center justify-center
            bg-gradient-to-br
            from-base-200 via-base-100 to-base-200
            dark:from-base-300 dark:via-base-200 dark:to-base-300
            p-12
            relative
          "
        >
          {/* Soft ambient glow */}
          <div className="absolute -inset-32 bg-primary/10 blur-3xl rounded-full"></div>

          <div className="relative max-w-lg space-y-10">

            {/* Heading */}
            <div>
              <h2 className="text-4xl font-extrabold mb-3 tracking-tight">
                Welcome to <span className="text-primary">TixGo</span>
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed">
                Book bus, train, launch, and flight tickets from verified vendors
                worldwide with confidence.
              </p>
            </div>

            {/* Travel Icons */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: FaBusAlt, label: "Bus", color: "text-blue-500" },
                { icon: FaTrain, label: "Train", color: "text-green-500" },
                { icon: FaShip, label: "Launch", color: "text-cyan-500" },
                { icon: FaPlane, label: "Flight", color: "text-purple-500" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="
                      bg-base-100/80 backdrop-blur
                      rounded-2xl p-4 mb-2
                      shadow-lg hover:shadow-xl
                      transition
                    "
                  >
                    <item.icon className={`text-3xl mx-auto ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div
              className="
                space-y-4
                bg-base-100/80 backdrop-blur
                rounded-2xl p-6
                shadow-lg
              "
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-xl text-success" />
                <span className="font-medium">
                  Instant booking confirmation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-xl text-primary" />
                <span className="font-medium">
                  Secure & encrypted payments
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-xl text-secondary" />
                <span className="font-medium">
                  24/7 customer support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="flex items-center justify-center px-4 py-12 bg-base-100">
          <div className="w-full max-w-md">

            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <h1 className="text-2xl font-extrabold mb-3">
                Travel Booking
              </h1>
              <div className="flex justify-center gap-4 text-2xl">
                <FaBusAlt className="text-blue-500" />
                <FaTrain className="text-green-500" />
                <FaShip className="text-cyan-500" />
                <FaPlane className="text-purple-500" />
              </div>
            </div>

            {/* Form Container */}
            <div
              className="
                bg-base-100
                border border-base-300
                rounded-3xl
                shadow-2xl
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