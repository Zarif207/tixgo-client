import React from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import tripImg1 from "../../assets/trip-1.avif";
import tripImg2 from "../../assets/trip-2.jpg";
import tripImg3 from "../../assets/trip-3.jpg";

const TripPlanner = () => {
  return (
    <section className="min-h-screen w-full bg-base-100 text-base-content transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-10">

            {/* Subtitle */}
            <p className="text-sm opacity-70">
              Plan routes across bus, train, launch & flight networks
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Plan Your <br />
              Travel Journey <br />
              <span className="border-b-4 border-primary">
                With TixGo
              </span>
            </h1>

            {/* SEARCH CARD */}
            <div className="bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8 shadow-sm">

              <div className="grid sm:grid-cols-3 gap-5 mb-8">

                {/* FROM / TO */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-primary" />
                    From / To
                  </div>
                  <input
                    type="text"
                    placeholder="Dhaka → Chittagong"
                    className="
                      w-full bg-transparent outline-none text-sm
                      border-b border-base-300
                      focus:border-primary
                      transition
                    "
                  />
                </div>

                {/* DATE */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date
                  </div>
                  <input
                    type="date"
                    className="
                      w-full bg-transparent outline-none text-sm
                      border-b border-base-300
                      focus:border-primary
                      transition
                    "
                  />
                </div>

                {/* PASSENGERS */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Users className="w-4 h-4 text-primary" />
                    Passengers
                  </div>
                  <input
                    type="number"
                    placeholder="2"
                    className="
                      w-full bg-transparent outline-none text-sm
                      border-b border-base-300
                      focus:border-primary
                      transition
                    "
                  />
                </div>

              </div>

              <button
                className="
                  w-full sm:w-auto
                  px-8 py-3
                  bg-primary hover:bg-primary-focus
                  text-primary-content font-semibold
                  rounded-lg
                  transition-all
                  hover:-translate-y-0.5
                  active:translate-y-0
                  flex items-center gap-2
                "
              >
                <Search className="w-4 h-4" />
                Search Routes
              </button>
            </div>

            {/* HOW IT WORKS */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { step: "01", title: "Search Route", desc: "Choose destination & date" },
                { step: "02", title: "Compare Options", desc: "Bus, train, flight & launch" },
                { step: "03", title: "Book Securely", desc: "Instant confirmation" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl bg-base-200 border border-base-300 hover:shadow-md transition"
                >
                  <span className="text-primary font-bold text-lg">
                    {item.step}
                  </span>
                  <h4 className="font-semibold mt-1">{item.title}</h4>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden lg:block">

            <div className="grid grid-cols-2 gap-6">
              <div className="h-64 rounded-2xl overflow-hidden border border-base-300 hover:scale-[1.03] transition">
                <img
                  src={tripImg1}
                  alt="Bus travel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="h-64 rounded-2xl overflow-hidden border border-base-300 hover:scale-[1.03] transition">
                <img
                  src={tripImg2}
                  alt="Train travel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 h-72 rounded-2xl overflow-hidden border border-base-300 hover:scale-[1.02] transition">
                <img
                  src={tripImg3}
                  alt="Flight & launch routes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* FLOATING STATS */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%]">
              <div className="grid grid-cols-3 gap-4 bg-base-100 border border-base-300 rounded-2xl p-5 shadow-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">500+</h3>
                  <p className="text-sm opacity-70">Routes</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">120+</h3>
                  <p className="text-sm opacity-70">Operators</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">24/7</h3>
                  <p className="text-sm opacity-70">Support</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TripPlanner;