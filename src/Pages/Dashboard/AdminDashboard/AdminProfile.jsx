import React from 'react';

const AdminProfile = ({ admin }) => {

    // fallback if no admin data passed
    const defaultAdmin = {
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
        image: "https://i.ibb.co/8z0Yz5J/user.png",
        phone: "N/A",
        joined: "2024-01-10"
    };

    const data = admin || defaultAdmin;

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border mt-10">
            <div className="flex flex-col items-center text-center">

                {/* Profile Image */}
                <img
                    src={data.image}
                    alt="Admin"
                    className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
                />

                {/* Name */}
                <h2 className="text-2xl font-semibold">{data.name}</h2>

                {/* Role Badge */}
                <span className="px-4 py-1 mt-2 text-sm font-medium bg-green-100 text-green-600 rounded-full">
                    {data.role}
                </span>

                {/* Divider */}
                <hr className="w-full my-4" />

                {/* Info List */}
                <div className="w-full text-left space-y-2">
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Joined:</strong> {data.joined}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;