import React from "react";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold pb-2 border-b border-gray-700">
          Dashboard
        </h2>

        {/* 🔥 HOME LINK ADDED HERE */}
        <div>
          <ul>
            <li>
              <Link
                to="/"
                className="text-blue-300 hover:text-white transition"
              >
                ⬅ Back to Home
              </Link>
            </li>
          </ul>
        </div>

        {/* ADMIN */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Admin</h3>
          <ul className="space-y-1">
            <li><Link to="/dashboard/admin/profile">Admin Profile</Link></li>
            <li><Link to="/dashboard/admin/manage-tickets">Manage Tickets</Link></li>
            <li><Link to="/dashboard/admin/manage-users">Manage Users</Link></li>
            <li><Link to="/dashboard/admin/advertise-tickets">Advertise Tickets</Link></li>
          </ul>
        </div>

        {/* USER */}
        <div>
          <h3 className="text-lg font-semibold mb-2">User</h3>
          <ul className="space-y-1">
            <li><Link to="/dashboard/user/profile">User Profile</Link></li>
            <li><Link to="/dashboard/user/my-booked-tickets">My Booked Tickets</Link></li>
            <li><Link to="/dashboard/user/transactions">Transaction History</Link></li>
            <li><Link to="/dashboard/user/payment-success">Payment Success</Link></li>
            <li><Link to="/dashboard/user/payment-cancelled">Payment Cancelled</Link></li>
            <li><Link to="/dashboard/user/payment-failed">Payment Failed</Link></li>
          </ul>
        </div>

        {/* VENDOR */}
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
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;