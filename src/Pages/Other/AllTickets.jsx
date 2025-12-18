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
        <h2 className="text-4xl font-extrabold text-center mb-10">
          All Tickets
        </h2>

        {/* CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-base-100 border border-base-300 
              rounded-2xl shadow-xl hover:shadow-2xl transition
              flex flex-col h-full"
            >
              {/* IMAGE */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-52 w-full object-cover rounded-t-2xl"
              />

              {/* BODY */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{ticket.title}</h3>

                <p className="flex items-center gap-2 opacity-80 mb-2">
                  <FaRoute />
                  {ticket.from} → {ticket.to}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge badge-outline badge-primary">
                    {ticket.transport}
                  </span>
                  <span className="badge badge-outline">
                    <FaTicketAlt className="mr-1" />
                    {ticket.quantity}
                  </span>
                </div>

                {/* PERKS (fixed height) */}
                <div className="mb-3 min-h-[72px]">
                  {ticket.perks?.slice(0, 3).map((perk, i) => (
                    <p key={i} className="text-sm flex items-center gap-2">
                      <FaCheckCircle className="text-success" />
                      {perk}
                    </p>
                  ))}
                </div>

                <p className="text-sm mb-3 flex items-center gap-2">
                  <FaClock />
                  {ticket.departure}
                </p>

                <p className="font-semibold mb-4 flex items-center gap-2">
                  <FaMoneyBillWave />
                  {ticket.price} BDT / ticket
                </p>

                {/* BUTTON ALWAYS BOTTOM */}
                <Link to={`/ticket-details/${ticket._id}`} className="mt-auto">
                  <button className="btn btn-primary w-full">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n + 1)}
                className={`btn btn-sm ${
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