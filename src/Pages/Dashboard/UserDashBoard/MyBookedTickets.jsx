import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MyBookedTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});

  // ---------------------------
  // Fetch bookings
  // ---------------------------
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => {
        setBookedTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Booking fetch error:", err);
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  // ---------------------------
  // Countdown timer
  // ---------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};

      bookedTickets.forEach((ticket) => {
        const depTime = new Date(ticket.departure).getTime();
        const diff = depTime - Date.now();

        if (diff > 0 && ticket.status !== "rejected") {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff / (1000 * 60)) % 60);
          const s = Math.floor((diff / 1000) % 60);
          updated[ticket._id] = `${h}h ${m}m ${s}s`;
        }
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookedTickets]);

  // ---------------------------
  // Can Pay?
  // ---------------------------
  const canPay = (ticket) => {
    return (
      ticket.status === "accepted" &&
      new Date(ticket.departure) > new Date()
    );
  };

  // ---------------------------
  // Pay Now
  // ---------------------------
  const handlePayNow = async (ticket) => {
    try {
      const res = await axiosSecure.post("/create-ticket-checkout", {
        bookingId: ticket._id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  // ---------------------------
  // UI states
  // ---------------------------
  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  if (bookedTickets.length === 0) {
    return <p className="p-6 text-gray-500">No bookings found.</p>;
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5">
        My Booked Tickets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white shadow rounded-lg p-5"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="mt-3 font-semibold">{ticket.title}</h3>

            <p className="text-sm">
              {ticket.from} → {ticket.to}
            </p>

            <p className="text-sm">
              {new Date(ticket.departure).toLocaleString()}
            </p>

            <p>Quantity: {ticket.quantity}</p>

            <p className="font-semibold">
              Total:{" "}
              {usd.format(ticket.price * ticket.quantity)}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-gray-200">
              {ticket.status}
            </span>

            {timeLeft[ticket._id] && (
              <p className="text-sm mt-2">
                ⏳ {timeLeft[ticket._id]}
              </p>
            )}

            {canPay(ticket) && (
              <button
                onClick={() => handlePayNow(ticket)}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;