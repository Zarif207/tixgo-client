import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const AdminProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading: authLoading } = UseAuth();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const res = await axiosSecure.get("/admin/profile");
        setAdmin(res.data);
      } catch (err) {
        console.error("Admin profile error:", err);
        setError("Failed to load admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [axiosSecure, user, authLoading]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-error font-semibold">{error}</p>
      </div>
    );
  }

  const avatar =
    admin?.photoURL ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${admin?.name || "Admin"}&background=165dfc&color=fff&size=256`;

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-100 border border-base-300 rounded-2xl shadow-sm p-6">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <img
          src={avatar}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border border-base-300 shadow-sm"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4 text-base-content">
          {admin?.name || user?.displayName || "Admin"}
        </h2>

        {/* Role */}
        <span className="mt-2 px-4 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">
          {admin?.role?.toUpperCase()}
        </span>

        <div className="divider my-4"></div>

        {/* Info */}
        <div className="w-full space-y-2 text-left text-base-content">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {admin?.email || user?.email}
          </p>

          <p>
            <span className="font-semibold">Joined:</span>{" "}
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