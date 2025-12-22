import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { themedSwal, confirmAction, successAlert, errorAlert } from "../../../Utils/swal";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      errorAlert("Failed", "Could not load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    const res = await confirmAction({
      title: "Make Admin?",
      text: "This user will get full admin access.",
      confirmText: "Yes, make admin",
    });

    if (!res.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/users/${id}/make-admin`);
      successAlert("Updated", "User promoted to admin");
      fetchUsers();
    } catch {
      errorAlert("Error", "Failed to make admin");
    }
  };

  const makeVendor = async (id) => {
    const res = await confirmAction({
      title: "Make Vendor?",
      text: "This user will be able to sell tickets.",
      confirmText: "Yes, make vendor",
    });

    if (!res.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/users/${id}/make-vendor`);
      successAlert("Updated", "User promoted to vendor");
      fetchUsers();
    } catch {
      errorAlert("Error", "Failed to make vendor");
    }
  };

  const markFraud = async (id) => {
    const res = await themedSwal.fire({
      icon: "warning",
      title: "Mark vendor as fraud?",
      text: "All tickets from this vendor will be hidden permanently.",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Mark Fraud",
    });

    if (!res.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/users/${id}/mark-fraud`);
      successAlert("Updated", "Vendor marked as fraud");
      fetchUsers();
    } catch {
      errorAlert("Error", "Failed to mark fraud");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[55vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-5">Manage Users</h2>

      <div className="overflow-x-auto rounded-lg border border-base-300">
        <table className="w-full text-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr
                key={user._id}
                className="border-t border-base-300 hover:bg-base-200/40 transition"
              >
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{user.name || "—"}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span className="font-medium capitalize">{user.role}</span>
                  {user.isFraud && (
                    <span className="ml-2 text-xs text-error">(fraud)</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => makeAdmin(user._id)}
                      disabled={user.role === "admin"}
                      className="px-3 py-1.5 text-xs rounded border border-base-300 hover:bg-base-200 disabled:opacity-40"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => makeVendor(user._id)}
                      disabled={user.role === "vendor"}
                      className="px-3 py-1.5 text-xs rounded border border-base-300 hover:bg-base-200 disabled:opacity-40"
                    >
                      Make Vendor
                    </button>

                    {user.role === "vendor" && (
                      <button
                        onClick={() => markFraud(user._id)}
                        disabled={user.isFraud}
                        className="px-3 py-1.5 text-xs rounded text-error border border-error/40 hover:bg-error/10 disabled:opacity-40"
                      >
                        Mark Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="py-6 text-center text-base-content/60">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;