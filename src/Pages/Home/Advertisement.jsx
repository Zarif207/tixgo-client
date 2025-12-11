// Advertisement.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import { useNavigate } from "react-router";

const Advertisement = () => {
  const axios = UseAxios();

  const navigate = useNavigate();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"], // FIXED KEY
    queryFn: async () => {
      const res = await axios.get("/tickets/advertised?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Loading advertisements...</p>;

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Advertisement Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ads.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{ticket.title}</h3>

              <p className="text-gray-700 font-medium">
                Price:{" "}
                <span className="text-blue-600 font-bold">${ticket.price}</span>
              </p>

              <p className="text-gray-700">
                Quantity:{" "}
                <span className="font-semibold">{ticket.quantity}</span>
              </p>

              <p className="text-gray-700">
                Transport:{" "}
                <span className="font-semibold">
                  {ticket.transport || ticket.type}
                </span>
              </p>

              <ul className="text-gray-600 text-sm list-disc ml-6">
                {(ticket.perks || []).slice(0, 3).map((perk, i) => (
                  <li key={i}>{perk}</li>
                ))}
              </ul>

              <button
                onClick={() => navigate(`/ticket-details/${ticket._id}`)}
                className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                See Details
              </button>
            </div>
          </div>
        ))}

        {ads.length === 0 && (
          <p className="text-center text-gray-500 col-span-3">
            No advertised tickets yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Advertisement;
