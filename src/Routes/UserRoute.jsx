import React from "react";
import { useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const UserRoute = ({ children }) => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  if (user?.role !== "user") {
    navigate("/");
    return null;
  }

  return children;
};

export default UserRoute;