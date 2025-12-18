import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseRole from "../../../Hooks/UseRole";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  revenue: "#16a34a",
  sold: "#2563eb",
  added: "#9333ea",
};

const Revenue = () => {
  const axiosSecure = UseAxiosSecure();
  const { role, roleLoading } = UseRole();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleLoading || !role) return;

    setLoading(true);

    const endpoint =
      role === "admin" ? "/admin/revenue-overview" : "/vendor/revenue-overview";

    axiosSecure
      .get(endpoint)
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error("Revenue API error:", err);
        setSummary(null);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, role, roleLoading]);

  /* ================= LOADING ================= */

  if (loading || !summary) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const revenueData = [{ name: "Revenue", value: summary.totalRevenue }];

  const ticketData = [
    { name: "Tickets Sold", value: summary.ticketsSold },
    { name: "Tickets Added", value: summary.ticketsAdded },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold">
        {role === "admin"
          ? "Admin Revenue Overview"
          : "Vendor Revenue Overview"}
      </h2>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Stat
          title="Total Revenue"
          value={`৳${summary.totalRevenue}`}
          color={COLORS.revenue}
        />
        <Stat
          title="Tickets Sold"
          value={summary.ticketsSold}
          color={COLORS.sold}
        />
        <Stat
          title="Tickets Added"
          value={summary.ticketsAdded}
          color={COLORS.added}
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Donut
          title="Total Revenue"
          data={revenueData}
          colors={[COLORS.revenue]}
        />
        <Donut
          title="Tickets Overview"
          data={ticketData}
          colors={[COLORS.sold, COLORS.added]}
        />
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

const Stat = ({ title, value, color }) => (
  <div className="bg-base-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
    <h3 className="text-sm uppercase tracking-wide opacity-70">{title}</h3>
    <p className="text-3xl font-extrabold mt-2" style={{ color }}>
      {value}
    </p>
  </div>
);

/* ================= DONUT CHART ================= */

const Donut = ({ title, data, colors }) => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const textColor = isDark ? "#e5e7eb" : "#1f2937"; // gray-200 / gray-800
  const tooltipBg = isDark ? "#1f2937" : "#ffffff";

  return (
    <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-center text-base-content">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={120}
            dataKey="value"
            label
          >
            {colors.map((c, i) => (
              <Cell key={i} fill={c} />
            ))}
          </Pie>

          {/* ✅ TOOLTIP FIX */}
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: "none",
              borderRadius: "8px",
              color: textColor,
            }}
            itemStyle={{ color: textColor }}
            labelStyle={{ color: textColor }}
          />

          {/* ✅ LEGEND FIX */}
          <Legend
            wrapperStyle={{
              color: textColor,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
