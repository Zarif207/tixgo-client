import React from "react";
import { useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const VendorRoute = ({ children }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  if (user?.role !== "vendor") {
    navigate("/");
    return null;
  }

  return children;
};

export default VendorRoute;