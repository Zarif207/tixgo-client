import React from "react";
import { FaShieldAlt, FaClock, FaDollarSign, FaStar } from "react-icons/fa";

const Extra_2 = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-blue-500 text-4xl" />,
      title: "Secure Booking",
      desc: "Your payments and personal data are always protected.",
    },
    {
      id: 2,
      icon: <FaClock className="text-green-500 text-4xl" />,
      title: "Fast Service",
      desc: "Quick booking system with instant confirmation.",
    },
    {
      id: 3,
      icon: <FaDollarSign className="text-yellow-500 text-4xl" />,
      title: "Best Prices",
      desc: "Affordable ticket prices with no hidden charges.",
    },
    {
      id: 4,
      icon: <FaStar className="text-purple-500 text-4xl" />,
      title: "Trusted Vendors",
      desc: "Verified vendors ensuring top-notch service quality.",
    },
  ];

  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            {/* Icon */}
            <div className="mb-4 flex justify-center">{item.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Extra_2;