import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const MyAddedTickets = ({ onUpdate }) => {
    const axiosSecure = UseAxiosSecure();
    const user = JSON.parse(localStorage.getItem("user"));

    const { data: tickets = [], refetch } = useQuery({
        queryKey: ["myTickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/vendor/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This ticket will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tickets/${id}`);

                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Ticket has been deleted.", "success");
                    refetch();
                }
            }
        });
    };

    const handleUpdate = (ticket) => {
        if (!onUpdate) return;
        onUpdate(ticket);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Added Tickets</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => {
                    const status = ticket.verificationStatus;
                    const isRejected = status === "rejected";

                    return (
                        <div key={ticket._id} className="shadow-md border rounded-xl p-4 bg-white">

                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="h-40 w-full object-cover rounded-lg"
                            />

                            <h3 className="text-xl font-semibold mt-3">{ticket.title}</h3>

                            <p className="text-gray-700 text-sm mt-1">
                                <span className="font-semibold">Price:</span> ${ticket.price}
                            </p>

                            <p className="text-gray-700 text-sm mt-1">
                                <span className="font-semibold">Category:</span> {ticket.category}
                            </p>

                            {/* Status Badge */}
                            <p className="mt-2">
                                <span className="font-semibold">Status:</span>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${
                                        status === "approved"
                                            ? "bg-green-600"
                                            : status === "rejected"
                                            ? "bg-red-600"
                                            : "bg-yellow-500"
                                    }`}
                                >
                                    {status}
                                </span>
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleUpdate(ticket)}
                                    disabled={isRejected}
                                    className={`px-4 py-2 rounded text-white ${
                                        isRejected
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => handleDelete(ticket._id)}
                                    disabled={isRejected}
                                    className={`px-4 py-2 rounded text-white ${
                                        isRejected
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                    }`}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyAddedTickets;