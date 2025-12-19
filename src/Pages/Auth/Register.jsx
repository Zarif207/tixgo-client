import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import SocialLogin from "./SocialLogin";
import { auth } from "../../Firebase/Firebase.config";
import { errorAlert, successAlert } from "../../Utils/swal";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, userRegister, updateUserProfile } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data) => {
    try {
      await userRegister(data.email, data.password);

      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
      const imgRes = await axios.post(uploadURL, formData);
      const photoURL = imgRes.data.data.url;

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      await auth.currentUser.getIdToken(true);

      await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
      });

      await successAlert("Account Created", "Welcome to TixGo 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      errorAlert("Registration Failed", err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-8 rounded-xl shadow bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          {...register("photo", { required: "Photo is required" })}
          type="file"
          className="file-input file-input-bordered w-full"
        />
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Must be at least 6 characters",
              },
              validate: {
                upper: (v) =>
                  /[A-Z]/.test(v) || "Must include an uppercase letter",
                lower: (v) =>
                  /[a-z]/.test(v) || "Must include a lowercase letter",
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
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button className="btn btn-primary w-full">Register</button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary font-medium">
          Login
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;