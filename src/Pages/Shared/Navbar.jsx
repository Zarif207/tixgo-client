import React from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { FaPlaneDeparture } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import useTheme from "../../Hooks/UseTheme";
import {
  confirmAction,
  successAlert,
  errorAlert,
} from "../../Utils/swal";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  /* ---------------- LOGOUT ---------------- */
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
      errorAlert(err,"Logout Failed", "Something went wrong. Try again.");
    }
  };

  const baseLink =
    "px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10";
  const activeLink = "bg-primary/20 text-primary font-semibold";

  const navItemClass = ({ isActive }) =>
    `${baseLink} ${isActive ? activeLink : ""}`;

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur-md bg-base-100/80 shadow-sm px-4 lg:px-10">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-xl">
            ☰
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaPlaneDeparture className="text-primary" />
          TixGo
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
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
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {/* THEME */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {!user ? (
          <>
            {/* LOGIN */}
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `
                btn rounded-lg transition-all duration-300
                border border-primary bg-transparent text-primary
                hover:bg-primary/10
                ${isActive ? "bg-primary text-primary-content" : ""}
                `
              }
            >
              Login
            </NavLink>

            {/* REGISTER */}
            <NavLink
              to="/auth/register"
              className={({ isActive }) =>
                `
                btn rounded-lg transition-all duration-300
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
            <label tabIndex={0} className="btn btn-ghost flex gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block font-medium">
                {user.displayName || "User"}
              </span>
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44">
              <li>
                <Link to="/nav-profile">My Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;