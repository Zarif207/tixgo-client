import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Transaction = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axiosSecure
      .get(`/payments?email=${user.email}`)
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center text-base-content/60">
        No transactions found.
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-base-content">
        Transaction History
      </h2>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="min-w-full bg-base-100">
          <thead className="bg-base-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-base-content">
                #
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-base-content">
                Transaction ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-base-content">
                Ticket
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-base-content">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-base-content">
                Paid At
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, index) => (
              <tr
                key={t.transactionId}
                className="border-b border-base-300 hover:bg-base-200 transition"
              >
                <td className="py-3 px-4 text-base-content">{index + 1}</td>

                <td className="py-3 px-4 font-mono text-sm text-base-content/70 break-all">
                  {t.transactionId}
                </td>

                <td className="py-3 px-4 text-base-content">{t.ticketTitle}</td>

                <td className="py-3 px-4 font-semibold text-success">
                  {usd.format(t.amount)}
                </td>

                <td className="py-3 px-4 text-sm text-base-content/60">
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
