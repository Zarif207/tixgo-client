import React from "react";
import { Link } from "react-router";
import { FaHome, FaTicketAlt } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6">
      <div className="max-w-3xl w-full text-center">
        {/* BIG 404 */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-primary leading-none">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mt-4">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-base-content/70 mt-4 max-w-xl mx-auto">
          The page you are looking for doesn’t exist or may have been moved.
          Don’t worry — let’s get you back on track with Tixgo.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary btn-wide flex items-center gap-2"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            to="/all-tickets"
            className="btn btn-outline btn-wide flex items-center gap-2"
          >
            <FaTicketAlt />
            Browse Tickets
          </Link>
        </div>

        {/* FOOT NOTE */}
        <p className="mt-10 text-sm text-base-content/50">
          © {new Date().getFullYear()} Tixgo — Your journey starts here.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;