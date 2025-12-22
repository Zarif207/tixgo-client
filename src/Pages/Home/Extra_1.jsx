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
      from: "Berlin",
      to: "Prague, Czech Republic",
      type: "Bus",
      icon: FaBus,
      desc:
        "Comfortable intercity bus services with frequent departures, ideal for affordable and relaxed travel across states.",
    },
    {
      id: 2,
      from: "London",
      to: "Paris",
      type: "Train",
      icon: FaTrain,
      desc:
        "High-speed international rail travel offering smooth journeys, modern seating, and stunning European landscapes.",
    },
    {
      id: 3,
      from: "Oslo",
      to: "Copenhagen",
      type: "Launch",
      icon: FaShip,
      desc:
        "Premium sea travel with cabins and onboard dining, perfect for relaxed international ocean journeys.",
    },
    {
      id: 4,
      from: "Dubai",
      to: "New York",
      type: "Plane",
      icon: FaPlane,
      desc:
        "Fast, premium long-haul flights connecting global cities with world-class comfort and service.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-base-200/70 via-base-100 to-base-200/70 py-24 px-6 overflow-hidden">
    
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

     
      <div className="relative max-w-3xl mx-auto text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Travel, <span className="text-primary">Simplified</span>
        </h2>
        <p className="text-lg text-base-content/70 leading-relaxed">
          Seamlessly explore international routes with modern transport
          options designed for global travelers.
        </p>
      </div>

     
      <div className="relative max-w-6xl mx-auto space-y-28">
        {routes.map((route, index) => {
          const Icon = route.icon;
          const reverse = index % 2 !== 0;

          return (
            <div
              key={route.id}
              className={`flex flex-col ${
                reverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-14`}
            >
             
              <div className="flex-shrink-0">
                <div
                  className="
                    w-32 h-32 rounded-[2rem]
                    bg-gradient-to-br from-primary to-primary/80
                    text-primary-content
                    flex items-center justify-center
                    text-5xl
                    shadow-xl shadow-primary/30
                    transition-all duration-300
                    hover:scale-105
                  "
                >
                  <Icon />
                </div>
              </div>

             
              <div
                className="
                  bg-base-100/80 backdrop-blur-xl
                  border border-base-300
                  rounded-[2.5rem]
                  p-8 md:p-10
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300
                  max-w-xl
                "
              >
                <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                  {route.type}
                </span>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center flex-wrap gap-3">
                  {route.from}
                  <FaArrowRight className="opacity-50" />
                  {route.to}
                </h3>

                <p className="text-base-content/80 leading-relaxed mb-5">
                  {route.desc}
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