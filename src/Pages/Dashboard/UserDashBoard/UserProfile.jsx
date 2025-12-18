import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";


const UserProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const email = user?.email;

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  /* ---------- States ---------- */

  if (!email) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Please log in to view your profile.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load profile.
      </div>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        User Profile
      </h2>

      <div className="flex flex-col items-center">
        <img
          src={profile.photo || user?.photoURL || "https://i.pravatar.cc/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border shadow mb-4 object-cover"
        />

        <h3 className="text-xl font-semibold">
          {profile.name || user?.displayName || "No Name"}
        </h3>

        <p className="text-gray-600">{profile.email}</p>

        <span
          className={`mt-3 px-4 py-1 rounded-full text-sm text-white capitalize ${
            profile.role === "admin"
              ? "bg-red-600"
              : profile.role === "vendor"
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
        >
          {profile.role}
        </span>

        {profile.createdAt && (
          <p className="mt-3 text-sm text-gray-500">
            Joined: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;