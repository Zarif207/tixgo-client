import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const AdminProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchAdminProfile = async () => {
      try {
        const res = await axiosSecure.get(
          `/admin/profile?email=${user.email}`
        );
        setAdmin(res.data);
      } catch (err) {
        console.error("Admin profile error:", err);
        setError("Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border mt-10">
      <div className="flex flex-col items-center text-center">
        <img
          src={
            admin?.photo ||
            user?.photoURL ||
            `https://ui-avatars.com/api/?name=${admin?.name || "Admin"}&background=0D8ABC&color=fff&size=256`
          }
          alt="Admin"
          className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
        />

        <h2 className="text-2xl font-semibold">
          {admin?.name || "Admin"}
        </h2>

        <span className="px-4 py-1 mt-2 text-sm font-medium bg-green-100 text-green-600 rounded-full">
          {admin?.role?.toUpperCase()}
        </span>

        <hr className="w-full my-4" />

        <div className="w-full text-left space-y-2 text-gray-700">
          <p><strong>Email:</strong> {admin?.email}</p>
          <p><strong>Phone:</strong> {admin?.phone || "N/A"}</p>
          <p>
            <strong>Joined:</strong>{" "}
            {admin?.createdAt
              ? new Date(admin.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;