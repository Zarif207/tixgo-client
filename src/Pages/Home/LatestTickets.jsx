import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // not react-router-dom
import UseAxios from "../../Hooks/UseAxios";

const LatestTickets = () => {
  const axiosPublic = UseAxios();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/tickets?verificationStatus=approved&sort=newest&limit=8")
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Latest <span className="text-blue-500">Approved</span> Tickets
      </h2>

      {tickets.length === 0 && (
        <p className="text-center text-gray-500">No latest tickets found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded-xl shadow-lg p-5 bg-white hover:shadow-xl transition"
          >
            {/* FIXED IMAGE FIELD */}
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-xl font-semibold mt-4">{ticket.title}</h3>

            <p className="text-gray-600 mt-1">
              {ticket.from} ➝ {ticket.to}
            </p>

            <p className="text-gray-500 text-sm">
              Transport: <span className="font-semibold">{ticket.transport}</span>
            </p>

            <p className="text-gray-500 text-sm">
              Price: <span className="font-semibold">{ticket.price} BDT</span>
            </p>

            <Link to={`/ticket-details/${ticket._id}`}>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;