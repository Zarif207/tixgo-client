import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch users
  // -----------------------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // -----------------------------
  // Make Admin
  // -----------------------------
  const makeAdmin = async (id) => {
    await axiosSecure.patch(`/admin/users/${id}/make-admin`);
    fetchUsers();
  };

  // -----------------------------
  // Make Vendor
  // -----------------------------
  const makeVendor = async (id) => {
    await axiosSecure.patch(`/admin/users/${id}/make-vendor`);
    fetchUsers();
  };

  // -----------------------------
  // Mark Vendor as Fraud
  // -----------------------------
  const markFraud = async (id) => {
    const result = await Swal.fire({
      title: "Mark as Fraud?",
      text: "This vendor's tickets will be hidden permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, mark fraud",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/admin/users/${id}/mark-fraud`);
      fetchUsers();
      Swal.fire("Done!", "Vendor marked as fraud.", "success");
    }
  };

  if (loading) {
    return <p className="p-6">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name || "—"}</td>
                <td className="py-3 px-4">{user.email}</td>

                <td className="py-3 px-4 capitalize font-medium">
                  {user.role}
                  {user.isFraud && (
                    <span className="ml-2 text-red-600 font-semibold">
                      (Fraud)
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 flex gap-2 justify-center flex-wrap">
                  {/* Make Admin */}
                  <button
                    onClick={() => makeAdmin(user._id)}
                    disabled={user.role === "admin"}
                    className={`px-3 py-1 rounded text-white
                      ${
                        user.role === "admin"
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    Make Admin
                  </button>

                  {/* Make Vendor */}
                  <button
                    onClick={() => makeVendor(user._id)}
                    disabled={user.role === "vendor"}
                    className={`px-3 py-1 rounded text-white
                      ${
                        user.role === "vendor"
                          ? "bg-purple-300 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                  >
                    Make Vendor
                  </button>

                  {/* Mark Fraud */}
                  {user.role === "vendor" && (
                    <button
                      onClick={() => markFraud(user._id)}
                      disabled={user.isFraud}
                      className={`px-3 py-1 rounded text-white
                        ${
                          user.isFraud
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      Mark Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;