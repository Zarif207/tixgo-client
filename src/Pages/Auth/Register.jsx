import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import SocialLogin from "./SocialLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { userRegister, updateUserProfile } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await userRegister(data.email, data.password);

      // Upload image
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;

      const imgRes = await axios.post(uploadURL, formData);
      const photoURL = imgRes.data.data.url;

      // Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // Save user to DB
      await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
      });

      navigate(location.state || "/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="input input-bordered w-full"
        />

        <input
          {...register("photo", { required: true })}
          type="file"
          className="file-input w-full"
        />

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", { required: true, minLength: 6 })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"
          >
            {showPassword ? <FiEye />  :  <FiEyeOff />}
          </button>
        </div>

        <button className="btn btn-neutral w-full">Register</button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-600">
          Login
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;