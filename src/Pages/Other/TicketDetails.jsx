import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookQty, setBookQty] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // ================= FETCH TICKET =================
  const fetchTicket = async () => {
    try {
      const res = await axiosSecure.get(`/tickets/${id}`);
      setTicket(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  // ================= COUNTDOWN =================
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

  // ================= HANDLE BOOKING =================
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      return Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to book this ticket",
      });
    }

    if (bookQty < 1 || bookQty > ticket.quantity) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text: "Please select a valid booking quantity",
      });
    }

    try {
      const bookingData = {
        ticketId: ticket._id,
        customerEmail: user.email,
        quantity: bookQty,
      };

      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data?.success) {
        document.getElementById("book_modal").close();
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed 🎉",
          text: "Your ticket has been booked successfully!",
          confirmButtonText: "OK",
        });

        setBookQty(1);
        fetchTicket();
        document.getElementById("book_modal").close();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
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
            Transport Type:{" "}
            <span className="font-semibold">{ticket.transport}</span>
          </p>

          <p className="text-lg font-semibold mb-2">
            Price: {ticket.price} BDT
          </p>

          <p className="mb-2">
            Available Quantity:{" "}
            <span className="font-semibold">{ticket.quantity}</span>
          </p>

          <p className="text-gray-700 mb-3">
            Departure:{" "}
            <span className="font-semibold">
              {new Date(ticket.departure).toLocaleString()}
            </span>
          </p>

          <div className="text-xl font-bold mb-4">
            Countdown:{" "}
            <span className={isExpired ? "text-red-600" : "text-green-600"}>
              {countdown}
            </span>
          </div>

          <button
            disabled={isButtonDisabled}
            onClick={() => document.getElementById("book_modal").showModal()}
            className={`w-full py-3 rounded-lg text-white font-semibold 
              ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ================= DAISYUI MODAL ================= */}
      <dialog id="book_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Book Ticket</h3>

          <form onSubmit={handleBooking}>
            <label className="block mb-2">Enter Quantity:</label>

            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={bookQty}
              onChange={(e) => setBookQty(Number(e.target.value))}
              className="input input-bordered w-full"
            />

            {bookQty > ticket.quantity && (
              <p className="text-red-600 text-sm mt-2">
                Cannot exceed available quantity!
              </p>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("book_modal").close()}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={bookQty > ticket.quantity}
                className="btn btn-primary"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;
