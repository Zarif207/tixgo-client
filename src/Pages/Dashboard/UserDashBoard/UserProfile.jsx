import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const UserProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    enabled: !!user, // wait until auth is ready
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-base-content/60">
        Loading profile…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-error">
        Failed to load profile
      </p>
    );
  }

  return (
    <div className="flex justify-center mt-16 px-4">
      <div
        className="
          w-full max-w-md p-8 rounded-2xl
          bg-base-100 text-base-content
          border border-base-300
          shadow-lg
        "
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          User Profile
        </h2>

        <div className="flex flex-col items-center gap-3">
          <img
            src={
              profile?.photo ||
              user?.photoURL ||
              "https://i.pravatar.cc/150"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border border-base-300 object-cover"
          />

          <p className="flex items-center gap-2 text-lg font-semibold">
            <FaUser className="text-primary" />
            {profile?.name || "Unnamed User"}
          </p>

          <p className="flex items-center gap-2 text-base-content/70">
            <FaEnvelope />
            {profile?.email}
          </p>

          <span className="mt-4 px-4 py-1 rounded-full text-sm font-medium text-primary-content bg-primary">
            {profile?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;