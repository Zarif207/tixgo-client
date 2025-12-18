import { Navigate } from "react-router";
import UseRole from "../Hooks/UseRole";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;