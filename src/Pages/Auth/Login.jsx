import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import SocialLogin from "./SocialLogin";
import { errorAlert, successAlert } from "../../Utils/swal";

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
    setValue,
  } = useForm();

  const fillDemo = (role) => {
    const credentials = {
      admin: {
        email: "zarifadmin@gmail.com",
        password: "AdminPass!",
      },
      vendor: {
        email: "ahmedvendor@gmail.com",
        password: "VendorPass!",
      },
      user: {
        email: "user@gmail.com",
        password: "UserPass1!",
      },
    };

    setValue("email", credentials[role].email);
    setValue("password", credentials[role].password);

    document.getElementById("demo_modal").close();
  };

  const { user, signInUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";
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
      <h2 className="text-4xl font-extrabold text-center mb-6">Login</h2>

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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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

        <button className="btn btn-primary w-full text-lg">Login</button>
      </form>

      <p className="text-center mt-4">
        New here?{" "}
        <Link to="/auth/register" className="text-primary font-semibold">
          Register
        </Link>
      </p>

      <SocialLogin />
      <button
        onClick={() => document.getElementById("demo_modal").showModal()}
        className="w-full
    flex items-center justify-center gap-3
    py-2.5
    mt-4
    rounded-xl
    border border-base-300
    bg-white
    hover:bg-blue-50
    text-[#455060]
    transition
    font-medium"
      >
        Demo Credentials
      </button>

      <dialog id="demo_modal" className="modal">
        <div className="modal-box max-w-sm rounded-2xl bg-base-100 border border-base-300">
          {/* Title */}
          <h3 className="text-lg font-semibold text-center mb-5">
            Demo Credentials
          </h3>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => fillDemo("user")}
              className="btn btn-ghost border border-base-300 hover:bg-base-200 w-full"
            >
              User
            </button>

            <button
              onClick={() => fillDemo("vendor")}
              className="btn btn-ghost border border-base-300 hover:bg-base-200 w-full"
            >
              Vendor
            </button>

            <button
              onClick={() => fillDemo("admin")}
              className="btn btn-ghost border border-error text-error hover:bg-error/10 w-full"
            >
              Admin
            </button>
          </div>

          {/* Close */}
          <div className="mt-6 text-center">
            <form method="dialog">
              <button className="text-sm opacity-60 hover:opacity-100">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
