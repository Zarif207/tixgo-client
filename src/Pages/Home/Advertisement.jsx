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
      // Backend MUST return exactly 6 admin-selected tickets
      const res = await axios.get("/tickets/advertised?limit=6");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* SECTION TITLE */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Advertisement Tickets
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-base-100 border border-base-300 
              rounded-xl shadow-md hover:shadow-xl 
              transition flex flex-col h-full"
            >
              {/* IMAGE */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-grow">
                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-2">
                  {ticket.title}
                </h3>

                {/* PRICE */}
                <p className="flex items-center gap-2 font-bold mb-1">
                  <FaMoneyBillWave className="text-success" />
                  {ticket.price} BDT / ticket
                </p>

                {/* QUANTITY */}
                <p className="text-sm mb-1">
                  Available Quantity:{" "}
                  <span className="font-semibold">
                    {ticket.quantity}
                  </span>
                </p>

                {/* TRANSPORT */}
                <p className="flex items-center gap-2 text-sm mb-3">
                  <FaBusAlt />
                  {ticket.transport}
                </p>

                {/* PERKS */}
                <div className="mb-4 min-h-[72px]">
                  {(ticket.perks || []).map((perk, i) => (
                    <p
                      key={i}
                      className="text-sm flex items-center gap-2"
                    >
                      <FaCheckCircle className="text-primary" />
                      {perk}
                    </p>
                  ))}
                </div>

                {/* BUTTON FIXED AT BOTTOM */}
                <button
                  onClick={() =>
                    navigate(`/ticket-details/${ticket._id}`)
                  }
                  className="mt-auto btn btn-primary w-full rounded-lg"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {ads.length === 0 && (
          <p className="text-center text-base-content/60 mt-10">
            No advertised tickets available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Advertisement;