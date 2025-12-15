import React from "react";
import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <FaTimesCircle className="text-yellow-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-yellow-600 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          You cancelled the payment. No money was charged.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/user/my-booked-tickets"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="border border-yellow-500 text-yellow-600 py-2 rounded hover:bg-yellow-50"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;