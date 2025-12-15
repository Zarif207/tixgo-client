import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const RequestedBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading } = UseAuth();
  const vendorEmail = user?.email;

  /* ---------------- FETCH BOOKINGS ---------------- */

  const {
    data: requests = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["bookingRequests", vendorEmail],
    enabled: !!vendorEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/vendor/${vendorEmail}`
      );
      return res.data || [];
    },
  });

  /* ---------------- ACCEPT ---------------- */

  const handleAccept = async (id) => {
    const confirm = await Swal.fire({
      title: "Accept booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/bookings/${id}/accept`);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Accepted!", "Booking request accepted.", "success");
      refetch();
    }
  };

  /* ---------------- REJECT ---------------- */

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/bookings/${id}/reject`);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Booking request rejected.", "success");
      refetch();
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading || isLoading) {
    return (
      <div className="p-6 text-center font-semibold text-gray-600">
        Loading booking requests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Failed to load booking requests.
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No booking requests found.
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">User Email</th>
              <th className="p-2 text-left">Ticket</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Total</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="p-2">{req.customerEmail}</td>

                <td className="p-2">{req.ticketTitle}</td>

                <td className="p-2 text-center">{req.quantity}</td>

                <td className="p-2 text-center">
                  ${req.unitPrice * req.quantity}
                </td>

                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      req.status === "accepted"
                        ? "bg-green-600"
                        : req.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="p-2 flex justify-center gap-2">
                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleAccept(req._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:bg-gray-400"
                  >
                    Accept
                  </button>

                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleReject(req._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:bg-gray-400"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;