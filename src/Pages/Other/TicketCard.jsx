import React from "react";
import { Link } from "react-router-dom";

const TicketCard = () => {
    return (
        <div className="border p-4 rounded-md shadow-md w-80">
            <h2 className="text-xl font-semibold">Ticket Title</h2>

            <p className="mt-2 text-gray-600">
                Short description of the ticket goes here...
            </p>

            <div className="mt-4">
                <Link to="/ticket-details">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;