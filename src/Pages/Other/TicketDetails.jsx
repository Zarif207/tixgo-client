import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const TicketDetails = () => {
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookQty, setBookQty] = useState(1);
    const [countdown, setCountdown] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    // FETCH TICKET
    useEffect(() => {
        axiosSecure.get(`/tickets/${id}`)
            .then(res => {
                setTicket(res.data);   // ✔ FIXED
                setLoading(false);
            })
            .catch(err => {
                console.log("Error:", err);
                setLoading(false);
            });
    }, [id]);

    // COUNTDOWN LOGIC
    useEffect(() => {
        if (!ticket) return;

        const interval = setInterval(() => {
            const now = new Date();
            const departureTime = new Date(ticket.departure);
            const diff = departureTime - now;

            if (diff <= 0) {
                setCountdown("Expired");
                setIsExpired(true);
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket]);

    // HANDLE BOOKING
    const handleBooking = async (e) => {
        e.preventDefault();

        if (bookQty > ticket.quantity) {
            alert("Booking quantity cannot exceed available quantity!");
            return;
        }

        const bookingData = {
            ticketId: ticket._id,
            title: ticket.title,
            image: ticket.image,
            price: ticket.price,
            from: ticket.from,
            to: ticket.to,
            departure: ticket.departure,
            quantity: bookQty,
            status: "Pending",
        };

        await axiosSecure.post("/bookings", bookingData);

        alert("Booking successful!");
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!ticket) {
        return <p className="text-center text-red-500">Ticket not found.</p>;
    }

    const isButtonDisabled = isExpired || ticket.quantity === 0;

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                />

                <div>
                    <h2 className="text-3xl font-bold mb-2">{ticket.title}</h2>

                    <p className="text-gray-600 mb-1">
                        {ticket.from} ➝ {ticket.to}
                    </p>

                    <p className="text-gray-700 mb-2">
                        Transport Type: <span className="font-semibold">{ticket.transport}</span>
                    </p>

                    <p className="text-lg font-semibold mb-2">
                        Price: {ticket.price} BDT
                    </p>

                    <p className="mb-2">
                        Available Quantity:{" "}
                        <span className="font-semibold">{ticket.quantity}</span>
                    </p>

                    <div className="mb-3">
                        <p className="font-semibold">Perks:</p>
                        <ul className="list-disc list-inside text-gray-600">
                            {ticket.perks?.map((p, i) => (
                                <li key={i}>{p}</li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-gray-700 mb-3">
                        Departure: <span className="font-semibold">{ticket.departure}</span>
                    </p>

                    <div className="text-xl font-bold mb-4">
                        Countdown:{" "}
                        <span className={isExpired ? "text-red-600" : "text-green-600"}>
                            {countdown}
                        </span>
                    </div>

                    <button
                        disabled={isButtonDisabled}
                        onClick={() => setIsModalOpen(true)}
                        className={`w-full py-3 rounded-lg text-white font-semibold 
                            ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                        `}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-xl">

                        <h3 className="text-xl font-bold mb-4">Book Ticket</h3>

                        <form onSubmit={handleBooking}>
                            <label className="block mb-2">Enter Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                max={ticket.quantity}
                                value={bookQty}
                                onChange={(e) => setBookQty(Number(e.target.value))}
                                className="w-full border px-3 py-2 rounded-lg"
                            />

                            {bookQty > ticket.quantity && (
                                <p className="text-red-600 text-sm mt-1">
                                    Cannot exceed available quantity!
                                </p>
                            )}

                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;