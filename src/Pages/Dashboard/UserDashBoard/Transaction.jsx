import { useEffect, useState } from "react";
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

    axiosSecure
      .get(`/payments?email=${user.email}`)
      .then(res => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Ticket</th>
                <th>Amount</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t.transactionId}>
                  <td>{i + 1}</td>
                  <td className="font-mono text-sm break-all">
                    {t.transactionId}
                  </td>
                  <td>{t.ticketTitle}</td>
                  <td className="text-green-600 font-semibold">
                    {usd.format(t.amount)}
                  </td>
                  <td>{new Date(t.paidAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transaction;