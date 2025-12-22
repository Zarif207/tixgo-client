import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { themedSwal } from "../../../Utils/swal";

const MyAddedTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading: authLoading } = UseAuth();
  const email = user?.email;

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({});
  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["vendorTickets", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor/${email}`);
      return res.data || [];
    },
  });


  const handleDelete = (id) => {
    themedSwal.fire({
      title: "Delete Ticket?",
      text: "This ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.delete(`/tickets/${id}`);
        if (res.data?.deletedCount > 0) {
          themedSwal.fire("Deleted!", "Ticket deleted successfully.", "success");
          refetch();
        }
      } catch {
        themedSwal.fire("Error", "Failed to delete ticket", "error");
      }
    });
  };

  
  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);
    setFormData({
      title: ticket.title,
      price: ticket.price,
      quantity: ticket.quantity,
      image: ticket.image,
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/tickets/${selectedTicket._id}`,
        formData
      );

      if (res.data?.success) {
        themedSwal.fire("Updated!", "Ticket updated successfully.", "success");
        refetch();
        closeModal();
      }
    } catch {
      themedSwal.fire("Update Failed", "Something went wrong", "error");
    }
  };

  
  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="p-6 text-center text-error">Failed to load tickets</p>;
  }

  if (!tickets.length) {
    return <p className="p-6 text-center opacity-70">No tickets found</p>;
  }

  
  return (
    <div className="p-4 md:p-6 h-[calc(100vh-120px)] overflow-y-auto scroll-smooth">
      <h2 className="text-3xl font-bold mb-6">My Added Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const isRejected = ticket.verificationStatus === "rejected";

          return (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <figure className="h-40">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body flex flex-col">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {ticket.title}
                </h3>

               
                <span
                  className={`w-fit px-3 py-1 rounded-full text-xs font-medium mt-1
                    ${
                      ticket.verificationStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : ticket.verificationStatus === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {ticket.verificationStatus || "pending"}
                </span>

                <p className="text-sm opacity-80 mt-2">
                  Price: <span className="font-medium">${ticket.price}</span>
                </p>

                <p className="text-sm opacity-80">
                  Quantity:{" "}
                  <span className="font-medium">{ticket.quantity}</span>
                </p>

                <div className="mt-auto flex justify-between gap-2 pt-4">
                  <button
                    onClick={() => openUpdateModal(ticket)}
                    disabled={isRejected}
                    className={`btn btn-sm text-white ${
                      isRejected
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                    style={{ backgroundColor: "#165dfc" }}
                  >
                    <FaEdit className="mr-1" />
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={isRejected}
                    className={`btn btn-sm btn-error text-white ${
                      isRejected
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">Update Ticket</h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Title"
              />

              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Price"
              />

              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Quantity"
              />

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Image URL"
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#165dfc" }}
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