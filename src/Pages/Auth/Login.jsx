import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import SocialLogin from "./SocialLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate(location.state || "/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"
          >
            {showPassword ? <FiEye />  : <FiEyeOff />}
          </button>
        </div>

        <button className="btn btn-neutral w-full">Login</button>
      </form>

      <p className="text-center mt-4">
        New here?{" "}
        <Link to="/auth/register" className="text-blue-600">
          Register
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Login;

