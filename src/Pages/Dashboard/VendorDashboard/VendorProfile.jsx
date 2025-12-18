import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { FaUserTie, FaEnvelope, FaClock } from "react-icons/fa";

const VendorProfile = () => {
  const { user } = UseAuth();

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="card bg-base-100 shadow-xl p-6">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/YyW7q4g/blank-profile-picture.png"
              }
              alt="Vendor Avatar"
              className="w-28 h-28 rounded-full object-cover border border-base-300"
            />
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {user?.displayName || "Unknown Vendor"}
          </h2>

          <div className="flex items-center gap-2 mt-1 opacity-80">
            <FaEnvelope />
            <span className="text-sm">{user?.email || "No email available"}</span>
          </div>

          <span className="badge badge-primary mt-3 px-4 py-2">
            Vendor
          </span>
        </div>

        {/* DIVIDER */}
        <div className="divider my-6"></div>

        {/* INFO SECTION */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <FaClock className="text-primary" />
            <p>
              <span className="font-semibold">Account Created:</span>{" "}
              {user?.metadata?.creationTime || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-primary" />
            <p>
              <span className="font-semibold">Last Login:</span>{" "}
              {user?.metadata?.lastSignInTime || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;