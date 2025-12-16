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

      // upload image
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
      const imgRes = await axios.post(uploadURL, formData);

      const photoURL = imgRes.data.data.url;

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // save user in DB
      await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
      });

      navigate(location.state || "/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="input w-full" />
        <input {...register("photo")} type="file" className="file-input w-full" />
        <input {...register("email")} type="email" placeholder="Email" className="input w-full" />

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input w-full pr-10"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        <button className="btn w-full">Register</button>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;