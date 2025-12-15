import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;