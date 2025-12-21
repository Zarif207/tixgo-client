import UseAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { auth } from "../../Firebase/Firebase.config";

const SocialLogin = () => {
  const { signInWithGoogle } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Force token refresh
      await auth.currentUser.getIdToken(true);

      await axiosSecure.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
      });

      navigate(location.state || "/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="text-center mt-4 pb-6 sm:pb-8 px-4">
      <p className="mb-3 text-sm sm:text-base">or</p>

      <button
        onClick={handleGoogleSignIn}
        className="
          btn bg-white text-black border
          flex items-center justify-center gap-3
          w-full sm:w-[320px] md:w-[340px]
          mx-auto
        "
      >
        <svg width="16" height="16" viewBox="0 0 512 512">
          <path fill="#fff" d="M0 0h512v512H0z" />
          <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
          <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
          <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
          <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
        </svg>
        <span className="text-sm sm:text-base font-medium">
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;