import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import UseAxios from "../../Hooks/UseAxios";
import {
  FaRoute,
  FaMoneyBillWave,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 6;

const AllTickets = () => {
  const axiosPublic = UseAxios();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------- FETCH ----------------
  useEffect(() => {
    axiosPublic
      .get("/tickets?verificationStatus=approved")
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ---------------- PROCESS ----------------
  const processedTickets = useMemo(() => {
    let data = [...tickets];

    if (search) {
      data = data.filter((t) =>
        `${t.from} ${t.to}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (transport) {
      data = data.filter((t) => t.transport === transport);
    }

    if (sort === "low") data.sort((a, b) => a.price - b.price);
    if (sort === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [tickets, search, transport, sort]);

  const totalPages = Math.ceil(processedTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = processedTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => setCurrentPage(1), [search, transport, sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          Explore <span className="text-primary">All Tickets</span>
        </h2>

        {/* CONTROLS */}
        <div className="bg-base-100/80 backdrop-blur-md border border-base-300 rounded-2xl p-5 mb-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search From → To"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option value="">All Transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>

            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="
                group bg-base-100/90 backdrop-blur
                border border-base-300
                rounded-3xl overflow-hidden
                shadow-lg hover:shadow-2xl
                transition-all duration-300
                hover:-translate-y-1
                flex flex-col
              "
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />

                <span className="absolute top-4 right-4 badge badge-primary badge-lg shadow">
                  {ticket.transport}
                </span>
              </div>

              {/* BODY */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1 line-clamp-2">
                  {ticket.title}
                </h3>

                <p className="flex items-center gap-2 opacity-80 mb-3">
                  <FaRoute />
                  {ticket.from} → {ticket.to}
                </p>

                {/* META */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline">
                    <FaTicketAlt className="mr-1" />
                    {ticket.quantity} seats
                  </span>
                  <span className="badge badge-outline badge-success">
                    <FaMoneyBillWave className="mr-1" />
                    {ticket.price} USD
                  </span>
                </div>

                {/* PERKS */}
                <div className="mb-4 min-h-[72px] space-y-1">
                  {ticket.perks?.slice(0, 3).map((perk, i) => (
                    <p
                      key={i}
                      className="text-sm flex items-center gap-2 opacity-90"
                    >
                      <FaCheckCircle className="text-success" />
                      {perk}
                    </p>
                  ))}
                </div>

                <p className="text-sm flex items-center gap-2 opacity-70 mb-5">
                  <FaClock />
                  {ticket.departure}
                </p>

                {/* BUTTON */}
                <Link
                  to={`/ticket-details/${ticket._id}`}
                  className="mt-auto"
                >
                  <button className="btn btn-primary w-full rounded-xl tracking-wide">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-14 gap-2">
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`btn btn-sm rounded-full ${
                  currentPage === n + 1
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                {n + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
