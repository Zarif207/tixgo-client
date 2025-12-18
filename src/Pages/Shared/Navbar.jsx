import React from "react";
import { NavLink, Link } from "react-router";
import { FaBus } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import useTheme from "../../Hooks/UseTheme";


const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    signOutUser().catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/all-tickets">All Tickets</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaBus className="text-primary" />
          TixGo
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">
        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <FiSun className="text-xl" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </button>

        {!user ? (
          <>
            <Link to="/auth/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-primary text-black">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost flex items-center gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block font-medium">
                {user.displayName || "User"}
              </span>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
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
  );
};

export default Navbar;