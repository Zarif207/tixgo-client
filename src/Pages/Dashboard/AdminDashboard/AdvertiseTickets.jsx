import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { themedSwal } from "../../../Utils/swal";

const AdvertiseTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const qc = useQueryClient();

  /* ---------------- FETCH APPROVED TICKETS ---------------- */
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/tickets?verificationStatus=approved"
      );
      return res.data || [];
    },
  });

  /* ---------------- TOGGLE MUTATION ---------------- */
  const toggleMutation = useMutation({
    mutationFn: async ({ id, advertise }) => {
      return axiosSecure.patch(`/tickets/${id}/advertise`, {
        advertised: advertise,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries(["approvedTickets"]);
      qc.invalidateQueries(["advertisedTickets"]);

      themedSwal.fire({
        icon: "success",
        title: "Updated",
        text: "Advertisement status updated",
      });
    },
    onError: (err) => {
      themedSwal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    },
  });

  /* ---------------- HANDLE TOGGLE ---------------- */
  const onToggle = (ticket) => {
    const advertisedCount = tickets.filter((t) => t.advertised).length;

    if (!ticket.advertised && advertisedCount >= 6) {
      return themedSwal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You can advertise a maximum of 6 tickets",
      });
    }

    themedSwal
      .fire({
        icon: "question",
        title: ticket.advertised
          ? "Remove advertisement?"
          : "Advertise this ticket?",
        showCancelButton: true,
        confirmButtonText: ticket.advertised
          ? "Unadvertise"
          : "Advertise",
      })
      .then((result) => {
        if (result.isConfirmed) {
          toggleMutation.mutate({
            id: ticket._id,
            advertise: !ticket.advertised,
          });
        }
      });
  };

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-5">
        Advertise Tickets
      </h2>

      <div className="overflow-x-auto rounded-lg border border-base-300">
        <table className="w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length ? (
              tickets.map((ticket, index) => (
                <tr
                  key={ticket._id}
                  className="border-t border-base-300 hover:bg-base-200/40"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{ticket.title}</td>
                  <td className="p-3">
                    {ticket.transport || ticket.category || "—"}
                  </td>
                  <td className="p-3">৳{ticket.price ?? "—"}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.advertised
                          ? "bg-green-500/15 text-green-600"
                          : "bg-gray-500/15 text-gray-500"
                      }`}
                    >
                      {ticket.advertised ? "Advertised" : "Not Advertised"}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => onToggle(ticket)}
                      disabled={toggleMutation.isLoading}
                      className={`px-4 py-1.5 rounded text-sm text-white ${
                        ticket.advertised
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-[#165dfc] hover:bg-blue-700"
                      }`}
                    >
                      {ticket.advertised ? "Unadvertise" : "Advertise"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center opacity-60">
                  No approved tickets found
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