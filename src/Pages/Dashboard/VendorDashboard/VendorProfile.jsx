import React from "react";
import UseAuth from "../../../Hooks/UseAuth";

const VendorProfile = () => {
  const { user } = UseAuth();

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-6">

      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co/YyW7q4g/blank-profile-picture.png"}
          alt="Vendor Avatar"
          className="w-28 h-28 rounded-full object-cover border"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4">
          {user?.displayName || "Unknown Vendor"}
        </h2>

        {/* Email */}
        <p className="text-gray-600 text-sm mt-1">
          {user?.email || "No email available"}
        </p>

        {/* Role */}
        <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          Vendor
        </span>
      </div>

      {/* Extra info section */}
      <div className="mt-6 border-t pt-4">

        <p className="text-gray-700">
          <span className="font-semibold">Account Created:</span>{" "}
          {user?.metadata?.creationTime || "N/A"}
        </p>

        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Last Login:</span>{" "}
          {user?.metadata?.lastSignInTime || "N/A"}
        </p>

      </div>
    </div>
  );
};

export default VendorProfile;