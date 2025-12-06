import React from "react";
import { NavLink, Link } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();

  const handleLogout = () => {
    signOutUser()
      .then()
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-tickets">All Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8 sticky top-0 z-50 mb-4 rounded-xl">
      {/* LEFT - Logo + Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-md mt-3 w-52 p-2"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          TixGo
        </Link>
      </div>

      {/* CENTER - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{links}</ul>
      </div>

      {/* RIGHT - Buttons */}
      <div className="navbar-end flex items-center gap-3">
        {user?.email ? (
          <button
            onClick={handleLogout}
            className="btn btn-neutral btn-outline"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/auth/login" className="btn btn-neutral btn-outline">
              Login
            </Link>

            <Link to="/auth/register" className="btn btn-primary text-black">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
