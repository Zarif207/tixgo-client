import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userRegister, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure()


  const handleRegistration = (data) => {
  
    const profileImg = data.photo[0];
    userRegister(data.email, data.password)
      .then(() => {
        
        // 1. store the photo in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. upload the image to imgBB server
        const Image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_hosting_key
        }`;
        axios.post(Image_API_URL, formData)
        .then((res) => {
          const photoURL = res.data.data.url;

          // crate user in the database 
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          }
          axiosSecure.post('/users', userInfo)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user created in the database')
            }
          })

          //3.update profile to firebase user
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              // Profile updated
              console.log("profile updated");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error.message);
            });
        });

        // update profile with name and photoURL
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to ZapShift</h3>
      <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is Required</p>
          )}
          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Photo is Required</p>
          )}
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
            })}
            className="input"
            placeholder="Password"
          />
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
              Password must include uppercase, lowercase, number, and special
              character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link
            state={location.state}
            className="text-blue-500 underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;


