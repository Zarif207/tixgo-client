import React, { useEffect, useState } from "react";
import { Link } from "react-router";
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
    <section className="max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Latest <span className="text-primary">Approved</span> Tickets
      </h2>

      {tickets.length === 0 && (
        <p className="text-center text-base-content/60">
          No latest tickets found.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="
              bg-base-100 
              border border-base-300 
              rounded-xl shadow-md 
              hover:shadow-xl 
              transition 
              flex flex-col
            "
          >
            {/* IMAGE */}
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold">
                {ticket.title}
              </h3>

              <p className="text-base-content/70 mt-1">
                {ticket.from} ➝ {ticket.to}
              </p>

              <p className="text-sm text-base-content/70">
                Transport:{" "}
                <span className="font-semibold">
                  {ticket.transport}
                </span>
              </p>

              <p className="text-sm text-base-content/70">
                Price:{" "}
                <span className="font-semibold">
                  {ticket.price} BDT
                </span>
              </p>

              {/* BUTTON STAYS AT BOTTOM */}
              <Link
                to={`/ticket-details/${ticket._id}`}
                className="mt-auto pt-4"
              >
                <button className="btn btn-primary w-full rounded-lg">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestTickets;