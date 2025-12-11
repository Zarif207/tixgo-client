import React, { useState } from "react";

const UserProfile = () => {
    // Dummy user info — replace with real API data later
    const [user] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        role: "User",
        photo: "https://i.pravatar.cc/150?img=3", // temporary avatar
    });

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">User Profile</h2>

            <div className="flex flex-col items-center">
                {/* Profile Image */}
                <img
                    src={user.photo}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border shadow mb-4"
                />

                {/* User Info */}
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>

                <span
                    className="mt-3 px-4 py-1 rounded-full text-sm text-white 
                    bg-blue-600"
                >
                    {user.role}
                </span>
            </div>
        </div>
    );
};

export default UserProfile;