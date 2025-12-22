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
  FaBars,
} from "react-icons/fa";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";


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

const SidebarContent = ({ role, user }) => (
  <>
    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

    <div className="mb-6 p-4 rounded-lg bg-base-200">
      <p className="font-semibold">{user.displayName || "User"}</p>
      <p className="text-sm text-base-content/60">{user.email}</p>
    </div>

    <DashboardNavLink to="/" icon={FaHome} label="Back to Home" />

    <div className="divider"></div>

    {role === "admin" && (
      <div className="space-y-2">
        <p className="text-xs uppercase text-base-content/60 px-2">
          Admin Panel
        </p>
        <DashboardNavLink to="/dashboard/admin/profile" icon={FaUser} label="Profile" />
        <DashboardNavLink to="/dashboard/admin/manage-tickets" icon={FaTicketAlt} label="Manage Tickets" />
        <DashboardNavLink to="/dashboard/admin/manage-users" icon={FaUsers} label="Manage Users" />
        <DashboardNavLink to="/dashboard/admin/advertise-tickets" icon={FaBullhorn} label="Advertise Tickets" />
      </div>
    )}

    {role === "user" && (
      <div className="space-y-2">
        <p className="text-xs uppercase text-base-content/60 px-2">
          User Panel
        </p>
        <DashboardNavLink to="/dashboard/user/profile" icon={FaUser} label="Profile" />
        <DashboardNavLink to="/dashboard/user/my-booked-tickets" icon={FaClipboardList} label="My Bookings" />
        <DashboardNavLink to="/dashboard/user/transactions" icon={FaMoneyBillWave} label="Transactions" />
      </div>
    )}

    {role === "vendor" && (
      <div className="space-y-2">
        <p className="text-xs uppercase text-base-content/60 px-2">
          Vendor Panel
        </p>
        <DashboardNavLink to="/dashboard/vendor/profile" icon={FaUser} label="Profile" />
        <DashboardNavLink to="/dashboard/vendor/add-ticket" icon={FaPlusCircle} label="Add Ticket" />
        <DashboardNavLink to="/dashboard/vendor/my-added-tickets" icon={FaTicketAlt} label="My Tickets" />
        <DashboardNavLink to="/dashboard/vendor/requested-bookings" icon={FaClipboardList} label="Requested Bookings" />
        <DashboardNavLink to="/dashboard/vendor/revenue" icon={FaMoneyBillWave} label="Revenue" />
      </div>
    )}
  </>
);

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

  if (location.pathname === "/dashboard") {
    if (role === "admin") return <Navigate to="/dashboard/admin/profile" replace />;
    if (role === "vendor") return <Navigate to="/dashboard/vendor/profile" replace />;
    if (role === "user") return <Navigate to="/dashboard/user/profile" replace />;
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">

     
      <div className="drawer md:hidden">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
   
          <div className="navbar bg-base-100 shadow-sm">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost text-xl"
            >
              <FaBars />
            </label>
            <h2 className="font-bold text-lg ml-2">Dashboard</h2>
          </div>

          <main className="p-4">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <aside className="w-72 bg-base-100 p-5">
            <SidebarContent role={role} user={user} />
          </aside>
        </div>
      </div>

     
      <div className="hidden md:flex min-h-screen">
        <aside className="w-72 bg-base-100 border-r border-base-300 p-5">
          <SidebarContent role={role} user={user} />
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;