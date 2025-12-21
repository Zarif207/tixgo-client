import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import SocialLogin from "./SocialLogin";
import { errorAlert, successAlert } from "../../Utils/swal";

/* -------------------------------
   Firebase Error Mapper
-------------------------------- */
const getAuthErrorMessage = (err) => {
  if (!err?.code) return "Login failed. Please try again.";

  switch (err.code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return "Login failed. Please try again.";
  }
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, signInUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // redirect path
  const from = location.state?.from?.pathname || "/";

  // already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      await successAlert("Login Successful", "Welcome back to TixGo");

      navigate(from, { replace: true });
    } catch (err) {
      errorAlert("Login Failed", getAuthErrorMessage(err));
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-3xl shadow-xl bg-base-100">
      <h2 className="text-4xl font-extrabold text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="btn btn-primary w-full text-lg">
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        New here?{" "}
        <Link to="/auth/register" className="text-primary font-semibold">
          Register
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Login;