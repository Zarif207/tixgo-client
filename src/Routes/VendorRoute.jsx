import { Navigate } from "react-router";
import UseRole from "../Hooks/UseRole";

const VendorRoute = ({ children }) => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;