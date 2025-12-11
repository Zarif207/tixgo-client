import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AdvertiseTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const qc = useQueryClient();

  // Fetch approved tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"], // FIXED
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?verificationStatus=approved");
      return res.data || [];
    },
    keepPreviousData: true,
  });

  // Mutation to toggle advertisement
  const toggleMutation = useMutation({
    mutationFn: async ({ id, advertise }) => {
      const res = await axiosSecure.patch(`/tickets/${id}/advertise`, {
        advertised: advertise,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["approvedTickets"] });    // FIXED
      qc.invalidateQueries({ queryKey: ["advertisedTickets"] });  // FIXED
      Swal.fire("Success", "Operation completed.", "success");
    },
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message || "Failed";
      Swal.fire("Error", message, "error");
    },
  });

  // Toggle advertise/unadvertise
  const onToggle = (ticket) => {
    const advertisedCount = tickets.filter((t) => t.advertised).length;

    if (!ticket.advertised && advertisedCount >= 6) {
      return Swal.fire("Limit Reached", "Cannot advertise more than 6 tickets.", "warning");
    }

    Swal.fire({
      title: ticket.advertised ? "Remove Advertisement?" : "Advertise this ticket?",
      showCancelButton: true,
      confirmButtonText: ticket.advertised ? "Unadvertise" : "Advertise",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleMutation.mutate({
          id: ticket._id,
          advertise: !ticket.advertised,
        });
      }
    });
  };

  if (isLoading) return <p className="p-6">Loading tickets...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5">Advertise Tickets</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Advertised</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <tr key={ticket._id} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{ticket.title}</td>
                  <td className="py-3 px-4">{ticket.transport || ticket.category || "-"}</td>
                  <td className="py-3 px-4">${ticket.price ?? "-"}</td>
                  <td className="py-3 px-4">{ticket.advertised ? "Yes" : "No"}</td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onToggle(ticket)}
                      disabled={toggleMutation.isLoading}
                      className={`px-4 py-2 rounded text-white ${
                        ticket.advertised
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {ticket.advertised ? "Unadvertise" : "Advertise"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No approved tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseTickets;