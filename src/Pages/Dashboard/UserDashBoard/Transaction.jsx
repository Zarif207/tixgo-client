import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";


const Transaction = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fetch transactions
  // -------------------------
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/payments?email=${user.email}`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Transaction fetch error:", err);
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  if (loading) return <p className="p-6">Loading transactions...</p>;

  if (transactions.length === 0)
    return <p className="p-6 text-gray-500">No transactions found.</p>;

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-5">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Ticket Title</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.transactionId} className="border-b">
                <td className="py-3 px-4">{index + 1}</td>

                <td className="py-3 px-4 font-mono text-sm">
                  {t.transactionId}
                </td>

                <td className="py-3 px-4">{t.ticketTitle}</td>

                <td className="py-3 px-4 font-semibold">
                  ৳{t.amount}
                </td>

                <td className="py-3 px-4">
                  {new Date(t.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;