import React from "react";
import { useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  if (user?.role !== "admin") {
    navigate("/");
    return null;
  }

  return children;
};

export default AdminRoute;