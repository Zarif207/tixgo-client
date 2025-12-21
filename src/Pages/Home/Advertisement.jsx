import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAxios from "../../Hooks/UseAxios";
import {
  FaBusAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Advertisement = () => {
  const axios = UseAxios();
  const navigate = useNavigate();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axios.get("/tickets/advertised?limit=6");
      return res.data || [];
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
    <section className="relative py-28 px-4 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Featured{" "}
            <span className="text-primary">Advertisement</span> Tickets
          </h2>
          <p className="text-base-content/70 text-lg">
            Premium routes with top comfort and value.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ticket) => (
            <div
              key={ticket._id}
              className="
                relative group rounded-3xl
                bg-base-100/80 backdrop-blur-xl
                border border-base-300
                shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)]
                transition-all duration-500
                hover:-translate-y-2
                flex flex-col overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="
                    h-56 w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* PRICE */}
                <div className="absolute bottom-4 left-4 bg-primary text-primary-content px-4 py-1 rounded-full text-sm font-bold shadow">
                  ${ticket.price} / ticket
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-1">
                  {ticket.title}
                </h3>

                {/* META */}
                <div className="flex items-center justify-between text-sm text-base-content/70 mb-3">
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

                {/* DETAILS BUTTON */}
                <div className="mt-auto flex justify-end">
                  <button
                    onClick={() =>
                      navigate(`/ticket-details/${ticket._id}`)
                    }
                    className="
                      group/details inline-flex items-center gap-2
                      text-primary font-semibold
                      hover:gap-3 transition-all
                    "
                  >
                    Details
                    <FaArrowRight className="transition-transform group-hover/details:translate-x-1" />
                  </button>
                </div>
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