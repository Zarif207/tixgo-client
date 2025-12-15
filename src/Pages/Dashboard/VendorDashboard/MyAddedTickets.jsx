import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxios from "../../../Hooks/UseAxios";
import UseAuth from "../../../Hooks/UseAuth";

const MyAddedTickets = () => {
  const axios = UseAxios();
  const { user, loading } = UseAuth();
  const email = user?.email;

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});

  /* ---------------- FETCH TICKETS ---------------- */

  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myTickets", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/tickets/vendor/${email}`);
      return res.data || [];
    },
  });

  /* ---------------- DELETE ---------------- */

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/tickets/${id}`);
          if (res.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Ticket has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire(error, "Failed to delete ticket", "error");
        }
      }
    });
  };

  /* ---------------- UPDATE ---------------- */

  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);

    setFormData({
      title: ticket.title || "",
      price: ticket.price || "",
      quantity: ticket.quantity || "",
      image: ticket.image || "",
      departure: ticket.departure
        ? new Date(ticket.departure).toISOString().slice(0, 16)
        : "",
    });
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `/tickets/${selectedTicket._id}`,
        formData
      );

      if (res.data?.success) {
        Swal.fire("Updated!", "Ticket updated successfully.", "success");
        refetch();
        closeModal();
      } else {
        Swal.fire("Failed", "Update was not successful", "error");
      }
    } catch (err) {
      Swal.fire(
        "Update Failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading || isLoading) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-600">
        Loading your tickets...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Failed to load tickets.
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        You haven't added any tickets yet.
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Added Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const isRejected = ticket.verificationStatus === "rejected";

          return (
            <div
              key={ticket._id}
              className="bg-white border rounded-xl shadow p-4"
            >
              <img
                src={ticket.image || "https://via.placeholder.com/400x200"}
                alt={ticket.title}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h3 className="text-xl font-semibold mt-3">{ticket.title}</h3>

              <p className="text-sm mt-1">
                Price: <strong>${ticket.price}</strong>
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm capitalize ${
                    ticket.verificationStatus === "approved"
                      ? "bg-green-600"
                      : ticket.verificationStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {ticket.verificationStatus}
                </span>
              </p>

              <div className="flex justify-between mt-4">
                <button
                  disabled={isRejected}
                  onClick={() => openUpdateModal(ticket)}
                  className={`px-4 py-2 rounded text-white ${
                    isRejected
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Update
                </button>

                <button
                  disabled={isRejected}
                  onClick={() => handleDelete(ticket._id)}
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

      {/* ---------------- UPDATE MODAL ---------------- */}

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Update Ticket</h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Title"
                required
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Price"
                required
              />

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Quantity"
                required
              />

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Image URL"
              />

              <input
                type="datetime-local"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;