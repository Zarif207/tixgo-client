import React, { useEffect, useState } from "react";

const MyBookedTickets = () => {
    // Dummy booked tickets — replace with API later
    const [bookedTickets, setBookedTickets] = useState([
        {
            id: 1,
            title: "Dhaka to Chittagong Bus",
            image: "https://i.ibb.co/9c8ZRw4/bus.jpg",
            quantity: 2,
            price: 500,
            from: "Dhaka",
            to: "Chittagong",
            departure: "2025-12-15T18:30:00",
            status: "pending",
        },
        {
            id: 2,
            title: "Dhaka to Sylhet Train",
            image: "https://i.ibb.co/2n9Bw8S/train.jpg",
            quantity: 1,
            price: 800,
            from: "Dhaka",
            to: "Sylhet",
            departure: "2025-12-12T10:00:00",
            status: "accepted",
        },
        {
            id: 3,
            title: "Dhaka to Cox’s Bazar Plane",
            image: "https://i.ibb.co/t8t4j0p/plane.jpg",
            quantity: 3,
            price: 3000,
            from: "Dhaka",
            to: "Cox's Bazar",
            departure: "2025-12-09T09:00:00",
            status: "rejected",
        }
    ]);

    const [timeLeft, setTimeLeft] = useState({});

    // Countdown Timer
    useEffect(() => {
        const interval = setInterval(() => {
            const updated = {};
            bookedTickets.forEach((ticket) => {
                const depTime = new Date(ticket.departure).getTime();
                const now = Date.now();
                const diff = depTime - now;

                if (diff > 0 && ticket.status !== "rejected") {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    updated[ticket.id] = `${hours}h ${minutes}m ${seconds}s`;
                } else {
                    updated[ticket.id] = "Time Expired";
                }
            });

            setTimeLeft(updated);
        }, 1000);

        return () => clearInterval(interval);
    }, [bookedTickets]);

    // Payment eligibility check
    const canPay = (ticket) => {
        const depTime = new Date(ticket.departure).getTime();
        const now = Date.now();

        return (
            ticket.status === "accepted" &&
            depTime > now // cannot pay after departure
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-5">My Booked Tickets</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookedTickets.map((ticket) => {
                    const totalPrice = ticket.price * ticket.quantity;

                    return (
                        <div key={ticket.id} className="bg-white shadow rounded-lg p-5">
                            {/* Image */}
                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="w-full h-40 object-cover rounded"
                            />

                            <h3 className="mt-3 text-lg font-semibold">{ticket.title}</h3>

                            <p className="text-sm text-gray-600 mt-2">
                                <strong>From:</strong> {ticket.from} →
                                <strong> To:</strong> {ticket.to}
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Departure:</strong>{" "}
                                {new Date(ticket.departure).toLocaleString()}
                            </p>

                            <p className="mt-2">
                                <strong>Quantity:</strong> {ticket.quantity}
                            </p>

                            <p>
                                <strong>Total Price:</strong> ৳{totalPrice}
                            </p>

                            {/* Status Badge */}
                            <span
                                className={`inline-block mt-3 px-4 py-1 rounded-full text-white text-sm
                                    ${
                                        ticket.status === "pending"
                                            ? "bg-yellow-500"
                                            : ticket.status === "accepted"
                                            ? "bg-blue-600"
                                            : ticket.status === "paid"
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                    }
                                `}
                            >
                                {ticket.status}
                            </span>

                            {/* Countdown */}
                            {ticket.status !== "rejected" && (
                                <p className="text-sm mt-3 text-gray-700">
                                    <strong>Countdown:</strong>{" "}
                                    {timeLeft[ticket.id] || "Loading..."}
                                </p>
                            )}

                            {/* Pay Now button */}
                            {canPay(ticket) && (
                                <button
                                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookedTickets;