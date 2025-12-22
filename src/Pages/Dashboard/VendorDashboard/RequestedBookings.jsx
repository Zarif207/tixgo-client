import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import { themedSwal } from "../../../Utils/swal";

const RequestedBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const vendorEmail = user?.email;
  const {
    data: requests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookingRequests", vendorEmail],
    enabled: !!vendorEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/vendor/${vendorEmail}`);
      return res.data || [];
    },
  });

  const handleAccept = async (id) => {
    const confirm = await themedSwal.fire({
      title: "Accept booking?",
      text: "User will be able to pay after acceptance.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/bookings/${id}/accept`);
      if (res.data.modifiedCount > 0) {
        themedSwal.fire(
          "Accepted!",
          "Booking accepted successfully.",
          "success"
        );
        refetch();
      }
    } catch (err) {
      themedSwal.fire(
        "Error",
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  const handleReject = async (id) => {
    const confirm = await themedSwal.fire({
      title: "Reject booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/bookings/${id}/reject`);
      if (res.data.modifiedCount > 0) {
        themedSwal.fire("Rejected!", "Booking rejected.", "success");
        refetch();
      }
    } catch (err) {
      themedSwal.fire(
        "Error",
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-error font-semibold">
        {error?.response?.data?.message || "Failed to load booking requests."}
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="p-6 text-center opacity-70">
        No booking requests found.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-120px)] overflow-y-auto scroll-smooth">
      <h2 className="text-3xl font-bold mb-6">Requested Bookings</h2>

      <div className="overflow-x-auto rounded-xl shadow bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>User Email</th>
              <th>Ticket</th>
              <th className="text-center">Qty</th>
              <th className="text-center">Total</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.customerEmail}</td>
                <td className="font-medium">{req.ticketTitle}</td>
                <td className="text-center">{req.quantity}</td>
                <td className="text-center">${req.unitPrice * req.quantity}</td>

              
                <td className="text-center">
                  <span
                    className={`badge text-white ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "accepted"
                        ? "badge-success"
                        : req.status === "paid"
                        ? "badge-info"
                        : "badge-error"
                    }`}
                  >
                    {req.status === "pending"
                      ? "Waiting"
                      : req.status === "accepted"
                      ? "Accepted"
                      : req.status === "paid"
                      ? "Paid"
                      : "Rejected"}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleAccept(req._id)}
                    className="btn btn-sm text-white disabled:opacity-50"
                    style={{ backgroundColor: "#165dfc" }}
                  >
                    <FaCheck />
                  </button>

                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleReject(req._id)}
                    className="btn btn-sm btn-error text-white disabled:opacity-50"
                  >
                    <FaTimes />
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
