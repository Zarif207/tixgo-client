import React from "react";

const HeroSection = () => {
  return (
    <div
      className="w-full h-[450px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="w-full h-full bg-black/50 flex items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Next Journey With Ease
          </h1>

          <p className="text-lg md:text-xl mb-6 opacity-90">
            Find and book tickets for Bus, Train, Flight, and Launch — all in one place.
          </p>

          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-lg font-semibold shadow-lg">
            Search Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;