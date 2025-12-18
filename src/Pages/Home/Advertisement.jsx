import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAxios from "../../Hooks/UseAxios";
import {
  FaMoneyBillWave,
  FaBusAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Advertisement = () => {
  const axios = UseAxios();
  const navigate = useNavigate();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axios.get("/tickets/advertised?limit=6");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Featured Advertisement Tickets
          </h2>
          <p className="text-base-content/70 text-lg">
            Hand-picked tickets promoted by our admin for the best
            routes, prices, and comfort.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ticket) => (
            <div
              key={ticket._id}
              className="
                group bg-base-200 border border-base-300
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl
                transition-all duration-300
                flex flex-col
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* PRICE BADGE */}
                <div className="absolute top-4 right-4 bg-primary text-primary-content px-4 py-1 rounded-full font-bold text-sm shadow">
                  ${ticket.price} / ticket
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-2">
                  {ticket.title}
                </h3>

                {/* META */}
                <div className="flex items-center justify-between text-sm mb-4 text-base-content/70">
                  <span>
                    Qty:{" "}
                    <span className="font-semibold text-base-content">
                      {ticket.quantity}
                    </span>
                  </span>

                  <span className="flex items-center gap-1">
                    <FaBusAlt className="text-primary" />
                    {ticket.transport}
                  </span>
                </div>

                {/* PERKS */}
                <div className="space-y-2 mb-6">
                  {(ticket.perks || []).slice(0, 3).map((perk, i) => (
                    <p
                      key={i}
                      className="flex items-start gap-2 text-sm"
                    >
                      <FaCheckCircle className="text-success mt-0.5" />
                      <span className="text-base-content/80">
                        {perk}
                      </span>
                    </p>
                  ))}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    navigate(`/ticket-details/${ticket._id}`)
                  }
                  className="
                    mt-auto btn btn-primary w-full rounded-xl
                    tracking-wide
                  "
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {ads.length === 0 && (
          <p className="text-center text-base-content/60 mt-12">
            No advertised tickets available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default Advertisement;