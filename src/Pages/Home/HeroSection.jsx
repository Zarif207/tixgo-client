import React, { useState, useEffect } from "react";
import { FaSearch, FaBusAlt, FaTrain, FaShip, FaPlane } from "react-icons/fa";

/* ================= TRAVEL BANNERS ================= */
const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80",
    title: "Bus Travel",
  },
  {
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80",
    title: "Train Routes",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80",
    title: "Launch Services",
  },
  {
    image:
      "https://www.latitudeaircharters.com/wp-content/uploads/2021/07/King-Air.jpg",
    title: "Flight Tickets",
  },
];

const travelModes = [
  { icon: FaBusAlt, label: "Bus" },
  { icon: FaTrain, label: "Train" },
  { icon: FaShip, label: "Launch" },
  { icon: FaPlane, label: "Flight" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-white dark:bg-gray-900">
      {/* ================= IMAGE SLIDER ================= */}
      <div className="absolute inset-0">
        {banners.map((banner, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ================= LIGHT OVERLAY ================= */}
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/50" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Book Your Journey
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Find and book bus, train, launch, and flight tickets from trusted
              vendors
            </p>

            {/* Search Button */}
            <button
              className="
            inline-flex items-center gap-3
            px-8 py-4
            bg-primary hover:bg-primary-focus
            text-primary-content
            font-semibold text-lg
            rounded-xl
            shadow-lg hover:shadow-xl
            hover:ring-4 hover:ring-primary/30
            transition-all duration-300"
            >
              <FaSearch className="text-xl" />
              Search Tickets
            </button>

            {/* Travel Mode Icons */}
            <div className="flex gap-8 justify-center mt-12">
              {travelModes.map((mode, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md">
                    <mode.icon className="text-3xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {mode.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SLIDE INDICATORS ================= */}
          <div className="flex justify-center gap-2 mt-16">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-12 h-1 rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-400/50 dark:bg-gray-600/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
