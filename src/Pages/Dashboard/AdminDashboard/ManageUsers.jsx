import React, { useState } from "react";

const ManageUsers = () => {
    // Dummy user data — replace with API later
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            isFraud: false
        },
        {
            id: 2,
            name: "Sarah Vendor",
            email: "sarah@vendor.com",
            role: "vendor",
            isFraud: false
        },
        {
            id: 3,
            name: "Admin Tony",
            email: "admin@admin.com",
            role: "admin",
            isFraud: false
        }
    ]);

    // Make Admin
    const makeAdmin = (id) => {
        setUsers(prev =>
            prev.map(u =>
                u.id === id ? { ...u, role: "admin" } : u
            )
        );
    };

    // Make Vendor
    const makeVendor = (id) => {
        setUsers(prev =>
            prev.map(u =>
                u.id === id ? { ...u, role: "vendor" } : u
            )
        );
    };

    // Mark Vendor as Fraud
    const markFraud = (id) => {
        setUsers(prev =>
            prev.map(u =>
                u.id === id ? { ...u, isFraud: true } : u
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 capitalize font-medium">
                                    {user.role}
                                    {user.isFraud && (
                                        <span className="ml-2 text-red-600 font-semibold">
                                            (Fraud)
                                        </span>
                                    )}
                                </td>

                                <td className="py-3 px-4 flex gap-2 justify-center flex-wrap">

                                    {/* Make Admin */}
                                    <button
                                        onClick={() => makeAdmin(user.id)}
                                        disabled={user.role === "admin"}
                                        className={`px-3 py-1 rounded text-white
                                            ${user.role === "admin"
                                                ? "bg-blue-300 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        Make Admin
                                    </button>

                                    {/* Make Vendor */}
                                    <button
                                        onClick={() => makeVendor(user.id)}
                                        disabled={user.role === "vendor"}
                                        className={`px-3 py-1 rounded text-white
                                            ${user.role === "vendor"
                                                ? "bg-purple-300 cursor-not-allowed"
                                                : "bg-purple-600 hover:bg-purple-700"
                                            }`}
                                    >
                                        Make Vendor
                                    </button>

                                    {/* Mark as Fraud (Only if Vendor) */}
                                    {user.role === "vendor" && (
                                        <button
                                            onClick={() => markFraud(user.id)}
                                            disabled={user.isFraud}
                                            className={`px-3 py-1 rounded text-white
                                                ${user.isFraud
                                                    ? "bg-red-300 cursor-not-allowed"
                                                    : "bg-red-600 hover:bg-red-700"
                                                }`}
                                        >
                                            Mark as Fraud
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;