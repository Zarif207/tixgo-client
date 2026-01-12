import React from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { FaPlaneDeparture } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import useTheme from "../../Hooks/UseTheme";
import { confirmAction, successAlert, errorAlert } from "../../Utils/swal";
import logoimg from "../../assets/web-icon.png";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await confirmAction({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      confirmButtonText: "Yes, Logout",
    });

    if (!result.isConfirmed) return;

    try {
      await signOutUser();
      await successAlert("Logged Out", "You have been logged out successfully");
      navigate("/");
    } catch (err) {
      errorAlert(err, "Logout Failed", "Something went wrong. Try again.");
    }
  };

  const baseLink =
    "px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10";
  const activeLink = "bg-primary/20 text-primary font-semibold";

  const navItemClass = ({ isActive }) =>
    `${baseLink} ${isActive ? activeLink : ""}`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 shadow-sm">
      <div className="navbar px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="navbar-start gap-2">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost text-2xl px-2">
              ☰
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56">
              <li>
                <NavLink to="/" className={navItemClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-tickets" className={navItemClass}>
                  All Tickets
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className={navItemClass}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-and-conditions" className={navItemClass}>
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
              <NavLink to="/our-networks" className={navItemClass}>
                Our Networks
              </NavLink>
            </li>
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold"
          >
            <img
              src={logoimg}
              alt="TixGo Logo"
              className="w-8 h-8 object-contain"
            />
            TixGo
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 lg:gap-2">
            <li>
              <NavLink to="/" className={navItemClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-tickets" className={navItemClass}>
                All Tickets
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={navItemClass}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms-and-conditions" className={navItemClass}>
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/our-networks" className={navItemClass}>
                Our Networks
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2 sm:gap-3">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          {!user ? (
            <>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `
                  btn btn-sm sm:btn-md rounded-lg
                  border border-primary bg-transparent text-primary
                  hover:bg-primary/10
                  ${isActive ? "bg-primary text-primary-content" : ""}
                  `
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  `
                  btn btn-sm sm:btn-md rounded-lg
                  border border-primary bg-transparent text-primary
                  hover:bg-primary/10
                  ${isActive ? "bg-primary text-primary-content" : ""}
                  `
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost flex gap-2 px-2 sm:px-3"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:block font-medium">
                  {user.displayName || "User"}
                </span>
              </label>

              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44">
                <li>
                  <Link to="/nav-profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
