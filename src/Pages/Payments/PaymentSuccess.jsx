import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    axios
      .post(`${import.meta.env.VITE_API_URL}/payments/verify`, {
        sessionId,
      })
      .then(() => {
        // ✅ redirect after verification
        navigate("/dashboard/user/transactions", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;