import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <FaExclamationTriangle className="text-red-600 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Payment Failed
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment could not be completed.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/user/my-booked-tickets"
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Try Again
          </Link>

      
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;