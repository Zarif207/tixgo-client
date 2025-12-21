import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import UseAxios from "../../Hooks/UseAxios";
import {
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
  FaArrowRight,
  FaTag,
  FaBoxes,
} from "react-icons/fa";

const transportIcons = {
  bus: <FaBus />,
  train: <FaTrain />,
  plane: <FaPlane />,
  launch: <FaShip />,
};

const LatestTickets = () => {
  const axiosPublic = UseAxios();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/tickets?verificationStatus=approved&sort=newest&limit=8")
      .then((res) => {
        setTickets(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-200/60 dark:bg-base-300/30 py-16">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-5xl md:text-4xl font-bold text-center mb-12">
          Latest <span className="text-primary">Tickets</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="
                relative bg-base-100 rounded-2xl
                border border-base-300
                shadow-md hover:shadow-2xl
                transition-all duration-300
                hover:-translate-y-1
                overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    hover:scale-110
                  "
                />
              </div>

              {/* TRANSPORT BADGE */}
              <div
                className="
                  absolute top-4 left-4
                  flex items-center gap-2
                  bg-base-100/90 backdrop-blur
                  px-3 py-1 rounded-full
                  text-xs font-semibold shadow
                "
              >
                {transportIcons[ticket.transport?.toLowerCase()]}
                {ticket.transport}
              </div>

              {/* CONTENT */}
              <div className="p-5 pb-14">
                <h3 className="text-lg font-bold line-clamp-2">
                  {ticket.title}
                </h3>

                <p className="text-sm opacity-70 mt-1">
                  {ticket.from} ➝ {ticket.to}
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <FaTag className="text-primary" />
                    <span className="font-semibold">${ticket.price}</span>
                    <span className="opacity-70">/ unit</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FaBoxes className="text-primary" />
                    <span className="font-semibold">
                      {ticket.quantity}
                    </span>{" "}
                    available
                  </p>
                </div>

                {/* PERKS (HORIZONTAL STYLE) */}
                {ticket.perks?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-2 text-xs text-base-content/70">
                    {ticket.perks.slice(0, 3).map((perk, i) => (
                      <span key={i}>
                        {perk}
                        {i !== Math.min(ticket.perks.length, 3) - 1 && " •"}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* DETAILS BUTTON */}
              <Link
                to={`/ticket-details/${ticket._id}`}
                className="
                  absolute bottom-4 right-4
                  flex items-center gap-2
                  text-primary font-semibold
                  hover:gap-3 transition-all
                "
              >
                Details <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;