import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaTicketAlt,
  FaMoneyBillWave,
  FaPlaneDeparture,
} from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const NavProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const email = user?.email;

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["navProfile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const role = profile?.role || "user";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ================= HEADER ================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl">
        <div className="p-8 flex flex-col md:flex-row gap-6 items-center">
          <img
            src={profile?.photo || user?.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">
              {profile?.name || user?.displayName}
            </h2>

            <p className="flex items-center justify-center md:justify-start gap-2 text-white/90 mt-1">
              <FaEnvelope />
              {profile?.email}
            </p>

            <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold bg-black/30 capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ROLE PANELS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* USER */}
        {role === "user" && (
          <RolePanel
            title="User Access"
            items={[
              "View booked tickets",
              "Manage profile",
              "Track booking history",
            ]}
          />
        )}

        {/* VENDOR */}
        {role === "vendor" && (
          <RolePanel
            title="Vendor Panel"
            items={[
              "Add new tickets",
              "Manage your tickets",
              "View bookings",
              "Track revenue",
            ]}
          />
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <RolePanel
            title="Admin Control"
            items={[
              "Manage users",
              "Approve vendors",
              "Monitor platform activity",
              "Handle fraud reports",
            ]}
          />
        )}
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ icon, label, value }) => (
  <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition">
    <div className="card-body">
      <div className="flex items-center gap-4">
        <span className="text-primary text-3xl">{icon}</span>
        <div>
          <p className="text-sm text-base-content/60">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

const RolePanel = ({ title, items }) => (
  <div className="card bg-base-100 border border-base-300 shadow-lg">
    <div className="card-body">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 text-base-content/80">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 items-center">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default NavProfile;