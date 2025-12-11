import React, { useState } from "react";

const Transaction = () => {
    // Dummy Transaction Data (Replace with API later)
    const [transactions] = useState([
        {
            id: "txn_1A23BC45",
            amount: 1500,
            ticketTitle: "Dhaka → Chittagong Bus",
            date: "2025-12-12T14:30:00"
        },
        {
            id: "txn_7F89XY32",
            amount: 3000,
            ticketTitle: "Dhaka → Sylhet Train",
            date: "2025-12-10T09:10:00"
        },
        {
            id: "txn_6PQ12RS9",
            amount: 9000,
            ticketTitle: "Dhaka → Cox’s Bazar Plane",
            date: "2025-12-08T18:00:00"
        }
    ]);

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
                            <tr key={t.id} className="border-b">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 font-mono">{t.id}</td>
                                <td className="py-3 px-4">{t.ticketTitle}</td>
                                <td className="py-3 px-4 font-semibold">৳{t.amount}</td>
                                <td className="py-3 px-4">
                                    {new Date(t.date).toLocaleString()}
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