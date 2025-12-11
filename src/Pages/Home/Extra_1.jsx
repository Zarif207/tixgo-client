import React from "react";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const Extra_1 = () => {
  const routes = [
    {
      id: 1,
      from: "Dhaka",
      to: "Chittagong",
      type: "Bus",
      icon: <FaBus className="text-blue-500 text-3xl" />,
    },
    {
      id: 2,
      from: "Dhaka",
      to: "Sylhet",
      type: "Train",
      icon: <FaTrain className="text-green-500 text-3xl" />,
    },
    {
      id: 3,
      from: "Barishal",
      to: "Dhaka",
      type: "Launch",
      icon: <FaShip className="text-indigo-500 text-3xl" />,
    },
    {
      id: 4,
      from: "Dhaka",
      to: "Cox’s Bazar",
      type: "Plane",
      icon: <FaPlane className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Popular Routes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">{route.icon}</div>

            {/* Route */}
            <h3 className="text-lg font-semibold mb-1">
              {route.from} → {route.to}
            </h3>

            <p className="text-gray-500 text-sm">Transport: {route.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Extra_1;