import React from "react";
import { Link, useSearchParams } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mb-4">
          Your payment has been completed successfully.
        </p>

        {sessionId && (
          <p className="text-sm text-gray-400 mb-4">
            Transaction ID: {sessionId}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/user/my-booked-tickets"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            View My Bookings
          </Link>

          <Link
            to="/"
            className="border border-green-600 text-green-600 py-2 rounded hover:bg-green-50"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;