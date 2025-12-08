import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(location?.state || "/"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <h3 className="text-3xl font-bold text-center mb-2">Welcome Back</h3>
      <p className="text-center text-gray-500 mb-6">Please login to continue</p>

      <form className="space-y-4" onSubmit={handleSubmit(handleLogIn)}>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full rounded-lg"
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full rounded-lg pr-12"
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-xl text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button className="btn btn-neutral w-full rounded-lg">Login</button>
      </form>

      <p className="text-center mt-4 text-sm">
        New to Tixgo?{" "}
        <Link
          state={location.state}
          className="text-blue-600 font-medium hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>

      <div className="mt-6">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
