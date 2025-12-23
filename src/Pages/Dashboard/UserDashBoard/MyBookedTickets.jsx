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

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookedTickets(res.data))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      bookedTickets.forEach((ticket) => {
        const diff = new Date(ticket.departure) - Date.now();
        if (diff > 0 && ticket.status !== "rejected") {
          const h = Math.floor(diff / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          updated[ticket._id] = `${h}h ${m}m ${s}s`;
        }
      });
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookedTickets]);

  const canPay = (ticket) =>
  ticket.status === "accepted" &&
  ticket.paymentStatus !== "paid" &&
  new Date(ticket.departure) > new Date();

  const statusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "rejected":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (bookedTickets.length === 0) {
    return <div className="p-6 text-center">No bookings found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookedTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
          >
            <figure>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-40 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{ticket.title}</h3>

              <p className="text-sm opacity-70">
                {ticket.from} → {ticket.to}
              </p>

              <p className="text-sm opacity-60">
                {new Date(ticket.departure).toLocaleString()}
              </p>

              <div className="flex justify-between mt-2 text-sm">
                <span>Qty: {ticket.quantity}</span>
                <span className="font-semibold">
                  {usd.format(ticket.price * ticket.quantity)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={`badge ${statusBadge(ticket.status)}`}>
                  {ticket.status}
                </span>

                {timeLeft[ticket._id] && (
                  <span className="text-sm text-primary">
                    ⏳ {timeLeft[ticket._id]}
                  </span>
                )}
              </div>

              {canPay(ticket) && (
                <button
                  onClick={() =>
                    axiosSecure
                      .post("/payments/create-checkout-session", {
                        bookingId: ticket._id,
                      })
                      .then((res) => (window.location.href = res.data.url))
                  }
                  className="btn btn-success btn-sm mt-4"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;
