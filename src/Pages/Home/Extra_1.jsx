import React from "react";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaArrowRight,
} from "react-icons/fa";

const Extra_1 = () => {
  const routes = [
    {
      id: 1,
      from: "Dhaka",
      to: "Chittagong",
      type: "Bus",
      icon: FaBus,
      desc:
        "Comfortable bus journeys with multiple departures every day. Ideal for budget-friendly and relaxed travel.",
    },
    {
      id: 2,
      from: "Dhaka",
      to: "Sylhet",
      type: "Train",
      icon: FaTrain,
      desc:
        "Enjoy scenic train routes with spacious seating, perfect for long-distance travelers who value comfort.",
    },
    {
      id: 3,
      from: "Barishal",
      to: "Dhaka",
      type: "Launch",
      icon: FaShip,
      desc:
        "Experience river travel with overnight launches offering cabins, dining, and a calm journey.",
    },
    {
      id: 4,
      from: "Dhaka",
      to: "Cox’s Bazar",
      type: "Plane",
      icon: FaPlane,
      desc:
        "Fast and premium air travel to Bangladesh’s top tourist destination with multiple daily flights.",
    },
  ];

  return (
    <section className="bg-base-200 py-20 px-6">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Travel Made Simple
        </h2>
        <p className="text-lg opacity-70">
          Explore Bangladesh with multiple transport options tailored for
          comfort, budget, and speed. Choose what suits your journey best.
        </p>
      </div>

      {/* Zig-Zag Content */}
      <div className="max-w-6xl mx-auto space-y-24">
        {routes.map((route, index) => {
          const Icon = route.icon;
          const isReverse = index % 2 !== 0;

          return (
            <div
              key={route.id}
              className={`flex flex-col ${
                isReverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12`}
            >
              {/* Icon Card */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-3xl bg-primary text-primary-content flex items-center justify-center text-5xl shadow-lg">
                  <Icon />
                </div>
              </div>

              {/* Text Content */}
              <div className="bg-base-100 border border-base-300 rounded-3xl p-8 md:p-10 shadow-md max-w-xl">
                <span className="badge badge-primary badge-outline mb-4">
                  {route.type}
                </span>

                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                  {route.from}
                  <FaArrowRight className="inline mx-3 opacity-60" />
                  {route.to}
                </h3>

                <p className="opacity-80 leading-relaxed mb-4">
                  {route.desc}
                </p>

                <p className="opacity-70 text-sm">
                  Book tickets instantly, track your journey, and enjoy secure
                  payments — all in one platform designed for modern travelers.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Extra_1;