import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition">
      <figure className="h-48">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{ticket.title}</h2>

        <p className="text-base-content/70">
          {ticket.from} ➝ {ticket.to}
        </p>

        <p className="font-semibold">
          {ticket.price} USD
        </p>

        <div className="card-actions justify-end mt-2">
          <Link to={`/tickets/${ticket._id}`}>
            <button className="btn btn-primary btn-sm">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;