import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const qc = useQueryClient();

  // Fetch only pending tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets?verificationStatus=pending");
      return res.data;
    },
  });

  // Approve Mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/tickets/${id}/approve`);
    },
    onSuccess: () => {
      qc.invalidateQueries(["tickets", "pending"]);
      Swal.fire("Approved!", "Ticket has been approved.", "success");
    },
    onError: () =>
      Swal.fire("Error", "Failed to approve ticket.", "error"),
  });

  // Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/tickets/${id}/reject`);
    },
    onSuccess: () => {
      qc.invalidateQueries(["tickets", "pending"]);
      Swal.fire("Rejected!", "Ticket has been rejected.", "success");
    },
    onError: () =>
      Swal.fire("Error", "Failed to reject ticket.", "error"),
  });

  if (isLoading) return <p className="p-6">Loading pending tickets...</p>;

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-4">Manage Tickets</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Ticket Title</th>
              <th className="py-3 px-4 text-left">Vendor</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <tr key={ticket._id} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{ticket.title}</td>
                  <td className="py-3 px-4">{ticket.vendorName}</td>
                  <td className="py-3 px-4">${ticket.price}</td>
                  <td className="py-3 px-4 capitalize">{ticket.verificationStatus}</td>

                  <td className="py-3 px-4 flex gap-2 justify-center">

                    {/* Approve Button */}
                    <button
                      onClick={() => approveMutation.mutate(ticket._id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Approve
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => rejectMutation.mutate(ticket._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Reject
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No pending tickets.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ManageTickets;