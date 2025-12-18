import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const swalTheme = {
  background: "#1f2937",
  color: "#e5e7eb",
  confirmButtonColor: "#165dfc",
};

const ManageTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const qc = useQueryClient();

  /* ---------------- FETCH PENDING TICKETS ---------------- */

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/tickets?verificationStatus=pending"
      );
      return res.data;
    },
  });

  /* ---------------- APPROVE ---------------- */

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/tickets/${id}/approve`),
    onSuccess: () => {
      qc.invalidateQueries(["tickets", "pending"]);
      Swal.fire({
        ...swalTheme,
        icon: "success",
        title: "Approved!",
        text: "Ticket has been approved.",
      });
    },
    onError: () =>
      Swal.fire({
        ...swalTheme,
        icon: "error",
        title: "Error",
        text: "Failed to approve ticket.",
      }),
  });

  /* ---------------- REJECT ---------------- */

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/tickets/${id}/reject`),
    onSuccess: () => {
      qc.invalidateQueries(["tickets", "pending"]);
      Swal.fire({
        ...swalTheme,
        icon: "success",
        title: "Rejected!",
        text: "Ticket has been rejected.",
      });
    },
    onError: () =>
      Swal.fire({
        ...swalTheme,
        icon: "error",
        title: "Error",
        text: "Failed to reject ticket.",
      }),
  });

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-base-content">
        Manage Tickets
      </h2>

      <div className="overflow-x-auto border border-base-300 rounded-xl">
        <table className="min-w-full text-base-content">
          <thead className="bg-base-200">
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
            {tickets.length ? (
              tickets.map((ticket, index) => (
                <tr
                  key={ticket._id}
                  className="border-t border-base-300 hover:bg-base-200/50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{ticket.title}</td>
                  <td className="py-3 px-4">{ticket.vendorName}</td>
                  <td className="py-3 px-4">৳{ticket.price}</td>

                  <td className="py-3 px-4 capitalize">
                    <span className="px-3 py-1 rounded-full text-sm bg-warning/10 text-warning">
                      {ticket.verificationStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button
                      disabled={approveMutation.isLoading}
                      onClick={() => approveMutation.mutate(ticket._id)}
                      className="px-4 py-1.5 rounded text-white text-sm disabled:opacity-50"
                      style={{ backgroundColor: "#165dfc" }}
                    >
                      Approve
                    </button>

                    <button
                      disabled={rejectMutation.isLoading}
                      onClick={() => rejectMutation.mutate(ticket._id)}
                      className="px-4 py-1.5 rounded text-white text-sm bg-error hover:bg-error/90 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-base-content/60"
                >
                  No pending tickets found.
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