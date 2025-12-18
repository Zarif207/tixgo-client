import { Navigate } from "react-router";
import UseRole from "../Hooks/UseRole";

const UserRoute = ({ children }) => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;