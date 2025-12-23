import { useSearchParams } from "react-router";
import { useEffect } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post("/payments/verify", { sessionId });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>
        <p className="mt-2 text-gray-500">
          Your ticket has been confirmed.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;