import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { successAlert, errorAlert } from "../../Utils/swal";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookQty, setBookQty] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // ================= FETCH =================
  const fetchTicket = async () => {
    try {
      const res = await axiosSecure.get(`/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  // ================= COUNTDOWN =================
  useEffect(() => {
    if (!ticket?.departure) return;

    const interval = setInterval(() => {
      const now = new Date();
      const departure = new Date(ticket.departure);
      const diff = departure - now;

      if (diff <= 0) {
        setCountdown("Expired");
        setIsExpired(true);
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  // ================= BOOK =================
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      return errorAlert("Login Required", "Please login to book this ticket");
    }

    try {
      const res = await axiosSecure.post("/bookings", {
        ticketId: ticket._id,
        quantity: bookQty,
        customerEmail: user.email,
      });

      if (res.data?.success) {
        successAlert("Booking Confirmed 🎉", "Your journey is booked!");
        fetchTicket();
        setBookQty(1);
        document.getElementById("book_modal").close();
      }
    } catch (err) {
      errorAlert(
        "Booking Failed",
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!ticket) {
    return (
      <p className="text-center text-error font-semibold mt-16">
        Ticket not found
      </p>
    );
  }

  const disabled = isExpired || ticket.quantity === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-[380px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="badge badge-primary mb-3 capitalize">
            {ticket.transport}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold">
            {ticket.title}
          </h1>

          <p className="flex items-center gap-2 mt-2 text-white/80">
            <FaMapMarkerAlt />
            {ticket.from} → {ticket.to}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* LEFT INFO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard
              icon={<FaPlaneDeparture />}
              label="Departure"
              value={new Date(ticket.departure).toLocaleString()}
            />
            <InfoCard
              icon={<FaTicketAlt />}
              label="Available Seats"
              value={ticket.quantity}
            />
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-md">
            <div className="card-body">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaClock className="text-primary" />
                Countdown
              </h3>

              <p
                className={`text-2xl font-bold mt-2 ${
                  isExpired ? "text-error" : "text-success"
                }`}
              >
                {countdown}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT BOOK */}
        <div className="card bg-base-100 border border-base-300 shadow-xl sticky top-28">
          <div className="card-body space-y-4">
            <h3 className="text-xl font-bold">Booking Summary</h3>

            <div className="flex justify-between font-medium">
              <span>Price</span>
              <span>{ticket.price} USD</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Transport</span>
              <span className="capitalize">{ticket.transport}</span>
            </div>

            <button
              disabled={disabled}
              onClick={() =>
                document.getElementById("book_modal").showModal()
              }
              className={`btn btn-primary w-full mt-3 ${
                disabled && "btn-disabled"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="book_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>

          <form onSubmit={handleBooking} className="space-y-4">
            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={bookQty}
              onChange={(e) => setBookQty(Number(e.target.value))}
              className="input input-bordered w-full"
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("book_modal").close()
                }
              >
                Cancel
              </button>
              <button className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

/* ================= REUSABLE INFO CARD ================= */
const InfoCard = ({ icon, label, value }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body">
      <div className="flex items-center gap-3">
        <span className="text-primary text-xl">{icon}</span>
        <div>
          <p className="text-sm text-base-content/60">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

export default TicketDetails;