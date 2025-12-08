import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userRegister, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      // Register user in Firebase
      await userRegister(data.email, data.password);

      
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageKey = import.meta.env.VITE_IMGBB_API_KEY;

      if (!imageKey) {
        console.error("❌ Missing imgbb API key!");
        alert("Image upload API key is missing. Fix your .env");
        return;
      }

      const uploadURL = `https://api.imgbb.com/1/upload?key=${imageKey}`;

      const uploadRes = await axios.post(uploadURL, formData);
      const photoURL = uploadRes.data.data.url;

  
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);
      if (dbRes.data.insertedId) {
        console.log("User saved to DB");
      }

    
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      navigate(location.state || "/");
    } catch (error) {
      console.log("Registration error:", error.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <h3 className="text-3xl font-bold text-center mb-2">Create an Account</h3>
      <p className="text-center text-gray-500 mb-6">
        Register to continue using ZapShift
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="space-y-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full rounded-lg"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is Required</p>
            )}
          </div>

          {/* Photo */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full rounded-lg"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is Required</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full rounded-lg"
              placeholder="Email"
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                })}
                className="input input-bordered w-full rounded-lg pr-12"
                placeholder="Password"
                autoComplete="new-password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
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
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Must include uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          <button className="btn btn-neutral w-full rounded-lg mt-2">
            Register
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              state={location.state}
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </fieldset>
      </form>

      <div className="mt-6">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
