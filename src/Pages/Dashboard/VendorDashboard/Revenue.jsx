import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🎯 Centralized colors
const COLORS = {
  revenue: "#16a34a", // green
  sold: "#2563eb",    // blue
  added: "#9333ea",   // purple
};

const Revenue = () => {
  const axiosSecure = UseAxiosSecure();

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    ticketsSold: 0,
    ticketsAdded: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/admin/revenue-overview")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <p className="p-6">Loading revenue data...</p>;

  // -----------------------------
  // Chart Data
  // -----------------------------
  const revenueData = [
    { name: "Revenue", value: summary.totalRevenue },
  ];

  const ticketData = [
    { name: "Tickets Sold", value: summary.ticketsSold },
    { name: "Tickets Added", value: summary.ticketsAdded },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold">Revenue Overview</h2>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p
            className="text-3xl font-bold"
            style={{ color: COLORS.revenue }}
          >
            ৳{summary.totalRevenue}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Tickets Sold</h3>
          <p
            className="text-3xl font-bold"
            style={{ color: COLORS.sold }}
          >
            {summary.ticketsSold}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Tickets Added</h3>
          <p
            className="text-3xl font-bold"
            style={{ color: COLORS.added }}
          >
            {summary.ticketsAdded}
          </p>
        </div>
      </div>

      {/* ================= DONUT CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Donut */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Total Revenue
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={6}
                dataKey="value"
              >
                <Cell fill={COLORS.revenue} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tickets Donut */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Tickets Overview
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketData}
                innerRadius={70}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill={COLORS.sold} />
                <Cell fill={COLORS.added} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Revenue;