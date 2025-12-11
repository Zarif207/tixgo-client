import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const RequestedBookings = () => {
    const axiosSecure = UseAxiosSecure();
    const user = JSON.parse(localStorage.getItem("user")); // vendor

    // ===== FETCH ALL BOOKING REQUESTS FOR THIS VENDOR =====
    const { data: requests = [], refetch } = useQuery({
        queryKey: ["bookingRequests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/vendor/${user.email}`);
            return res.data;
        },
    });

    // ===== ACCEPT BOOKING =====
    const handleAccept = async (id) => {
        const res = await axiosSecure.patch(`/bookings/accept/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Accepted!", "Booking request accepted.", "success");
            refetch();
        }
    };

    // ===== REJECT BOOKING =====
    const handleReject = async (id) => {
        const res = await axiosSecure.patch(`/bookings/reject/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected!", "Booking request rejected.", "error");
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>User</th>
                            <th>Ticket Title</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="border">
                                <td>
                                    <p className="font-semibold">{req.userName}</p>
                                    <p className="text-sm text-gray-600">
                                        {req.userEmail}
                                    </p>
                                </td>

                                <td>{req.ticketTitle}</td>

                                <td>{req.quantity}</td>

                                <td>${req.unitPrice * req.quantity}</td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${
                                            req.status === "accepted"
                                                ? "bg-green-600"
                                                : req.status === "rejected"
                                                ? "bg-red-600"
                                                : "bg-yellow-500"
                                        }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>

                                {/* ACTION BUTTONS */}
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-success text-white"
                                        disabled={req.status !== "pending"}
                                        onClick={() => handleAccept(req._id)}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        disabled={req.status !== "pending"}
                                        onClick={() => handleReject(req._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedBookings;