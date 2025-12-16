import React from "react";
import { Link, Outlet } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";

const DashboardLayout = () => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold pb-2 border-b border-gray-700">
          Dashboard
        </h2>

        {/* USER INFO */}
        {user && (
          <div className="border-b border-gray-700 pb-4">
            <p className="font-semibold">{user.displayName || "User"}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        )}

        {/* BACK TO HOME */}
        <div>
          <Link
            to="/"
            className="text-blue-300 hover:text-white transition"
          >
            ⬅ Back to Home
          </Link>
        </div>

        {/* ADMIN */}
        {role === "admin" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Admin</h3>
            <ul className="space-y-1">
              <li><Link to="/dashboard/admin/profile">Admin Profile</Link></li>
              <li><Link to="/dashboard/admin/manage-tickets">Manage Tickets</Link></li>
              <li><Link to="/dashboard/admin/manage-users">Manage Users</Link></li>
              <li><Link to="/dashboard/admin/advertise-tickets">Advertise Tickets</Link></li>
            </ul>
          </div>
        )}

        {/* USER */}
        {role === "user" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">User</h3>
            <ul className="space-y-1">
              <li><Link to="/dashboard/user/profile">User Profile</Link></li>
              <li><Link to="/dashboard/user/my-booked-tickets">My Booked Tickets</Link></li>
              <li><Link to="/dashboard/user/transactions">Transaction History</Link></li>
            </ul>
          </div>
        )}

        {/* VENDOR */}
        {role === "vendor" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Vendor</h3>
            <ul className="space-y-1">
              <li><Link to="/dashboard/vendor/profile">Vendor Profile</Link></li>
              <li><Link to="/dashboard/vendor/add-ticket">Add Ticket</Link></li>
              <li><Link to="/dashboard/vendor/my-added-tickets">My Added Tickets</Link></li>
              <li><Link to="/dashboard/vendor/requested-bookings">Requested Bookings</Link></li>
              <li><Link to="/dashboard/vendor/revenue">Revenue Overview</Link></li>
            </ul>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;