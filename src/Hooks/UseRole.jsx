import { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }

    axiosSecure
      .get(`/users/role?email=${user.email}`)
      .then(res => {
        setRole(res.data.role);
        setRoleLoading(false);
      })
      .catch(() => {
        setRole(null);
        setRoleLoading(false);
      });
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default UseRole;