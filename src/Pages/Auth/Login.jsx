import React from 'react';
import { useForm } from "react-hook-form";
import UseAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (data) => {
    console.log("from data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
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
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
            )}
          </div>

          <div className="flex justify-end">
            <button className="text-sm text-blue-600 hover:underline">Forgot password?</button>
          </div>

          <button className="btn btn-neutral w-full rounded-lg">Login</button>
        </form>

        <p className="text-center mt-4 text-sm">
          New to Tixgo? {" "}
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
    </div>
  );
};

export default Login;