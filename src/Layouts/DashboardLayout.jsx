import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
} from "react-router";
import {
  FaUser,
  FaUsers,
  FaTicketAlt,
  FaBullhorn,
  FaPlusCircle,
  FaMoneyBillWave,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";
import Navbar from "../Pages/Shared/Navbar";


/* ===================== REUSABLE NAV ITEM ===================== */
const DashboardNavLink = ({ to, icon, label }) => {
  const Icon = icon; 
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-2 rounded-lg transition-all
        ${
          isActive
            ? "bg-primary text-primary-content shadow-md"
            : "hover:bg-base-300 text-base-content"
        }
        `
      }
    >
      <Icon className="text-lg" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};


/* ===================== LAYOUT ===================== */
const DashboardLayout = () => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user || !role) {
    return <Navigate to="/" replace />;
  }

  // Auto redirect only when visiting /dashboard
  if (location.pathname === "/dashboard") {
    if (role === "admin") return <Navigate to="/dashboard/admin/profile" replace />;
    if (role === "vendor") return <Navigate to="/dashboard/vendor/profile" replace />;
    if (role === "user") return <Navigate to="/dashboard/user/profile" replace />;
  }

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-base-100 border-r border-base-300 p-5 hidden md:flex flex-col">
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* USER INFO */}
        <div className="mb-6 p-4 rounded-lg bg-base-200">
          <p className="font-semibold">{user.displayName || "User"}</p>
          <p className="text-sm text-base-content/60">{user.email}</p>
        </div>

        {/* BACK HOME */}
        <DashboardNavLink
          to="/"
          icon={FaHome}
          label="Back to Home"
        />

        <div className="divider"></div>

        {/* ================= ADMIN ================= */}
        {role === "admin" && (
          <div className="space-y-2">
            <p className="text-xs uppercase text-base-content/60 px-2">
              Admin Panel
            </p>

            <DashboardNavLink
              to="/dashboard/admin/profile"
              icon={FaUser}
              label="Profile"
            />

            <DashboardNavLink
              to="/dashboard/admin/manage-tickets"
              icon={FaTicketAlt}
              label="Manage Tickets"
            />

            <DashboardNavLink
              to="/dashboard/admin/manage-users"
              icon={FaUsers}
              label="Manage Users"
            />

            <DashboardNavLink
              to="/dashboard/admin/advertise-tickets"
              icon={FaBullhorn}
              label="Advertise Tickets"
            />
          </div>
        )}

        {/* ================= USER ================= */}
        {role === "user" && (
          <div className="space-y-2">
            <p className="text-xs uppercase text-base-content/60 px-2">
              User Panel
            </p>

            <DashboardNavLink
              to="/dashboard/user/profile"
              icon={FaUser}
              label="Profile"
            />

            <DashboardNavLink
              to="/dashboard/user/my-booked-tickets"
              icon={FaClipboardList}
              label="My Bookings"
            />

            <DashboardNavLink
              to="/dashboard/user/transactions"
              icon={FaMoneyBillWave}
              label="Transactions"
            />
          </div>
        )}

        {/* ================= VENDOR ================= */}
        {role === "vendor" && (
          <div className="space-y-2">
            <p className="text-xs uppercase text-base-content/60 px-2">
              Vendor Panel
            </p>

            <DashboardNavLink
              to="/dashboard/vendor/profile"
              icon={FaUser}
              label="Profile"
            />

            <DashboardNavLink
              to="/dashboard/vendor/add-ticket"
              icon={FaPlusCircle}
              label="Add Ticket"
            />

            <DashboardNavLink
              to="/dashboard/vendor/my-added-tickets"
              icon={FaTicketAlt}
              label="My Tickets"
            />

            <DashboardNavLink
              to="/dashboard/vendor/requested-bookings"
              icon={FaClipboardList}
              label="Requested Bookings"
            />

            <DashboardNavLink
              to="/dashboard/vendor/revenue"
              icon={FaMoneyBillWave}
              label="Revenue"
            />
          </div>
        )}
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;