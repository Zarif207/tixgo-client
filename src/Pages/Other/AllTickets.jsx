import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import UseAxios from "../../Hooks/UseAxios";

const AllTickets = () => {
    const axiosPublic = UseAxios();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
    axiosPublic.get("/tickets?verificationStatus=approved")
        .then(res => {
            setTickets(res.data);
        })
        .catch(err => {
            console.log("Error fetching tickets:", err);
        });
}, []);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">All Tickets</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map(ticket => (
                    <div
                        key={ticket._id}
                        className="border rounded-xl shadow-lg hover:shadow-2xl transition p-4"
                    >
                        <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />

                        <h3 className="text-xl font-bold mt-4">{ticket.title}</h3>

                        <p className="text-gray-600 mt-1">
                            {ticket.from} ➝ {ticket.to}
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                            Transport Type: <span className="font-semibold">{ticket.transport}</span>
                        </p>

                        <p className="mt-1 text-sm">
                            Price: <span className="font-bold">{ticket.price} BDT</span> / ticket
                        </p>

                        <p className="mt-1 text-sm">
                            Available Quantity: <span className="font-semibold">{ticket.quantity}</span>
                        </p>

                        <div className="mt-2">
                            <p className="font-semibold mb-1">Perks:</p>
                            <ul className="list-disc list-inside text-gray-600 text-sm">
                                {ticket.perks?.map((p, index) => (
                                    <li key={index}>{p}</li>
                                ))}
                            </ul>
                        </div>

                        <p className="mt-3 text-sm">
                            Departure: <span className="font-semibold">{ticket.departure}</span>
                        </p>

                        {/* DETAILS BUTTON */}
                        <Link to={`/ticket-details/${ticket._id}`}>
                            <button
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                See Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTickets;