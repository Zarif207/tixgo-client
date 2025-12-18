import React, { useState } from "react";

const About = () => {
  const [active, setActive] = useState("story");

  return (
    <section className="mt-20 px-4">
      <div
        className="
          max-w-6xl mx-auto
          bg-base-100
          border border-base-300
          rounded-2xl
          p-8 md:p-12
          shadow-sm
        "
      >
        {/* Header */}
        <h2 className="text-4xl font-bold text-base-content">
          About Tixgo
        </h2>

        <p className="text-base-content/70 max-w-2xl mt-4">
          Tixgo is a modern digital platform designed to make bus, train, launch,
          and flight ticket booking simple, fast, and reliable.
        </p>

        <hr className="my-8 border-base-300" />

        {/* Tabs */}
        <div className="flex flex-wrap gap-8 text-lg font-medium">
          <button
            onClick={() => setActive("story")}
            className={`transition ${
              active === "story"
                ? "text-primary border-b-2 border-primary"
                : "text-base-content/60 hover:text-primary"
            }`}
          >
            Story
          </button>

          <button
            onClick={() => setActive("mission")}
            className={`transition ${
              active === "mission"
                ? "text-primary border-b-2 border-primary"
                : "text-base-content/60 hover:text-primary"
            }`}
          >
            Mission
          </button>

          <button
            onClick={() => setActive("success")}
            className={`transition ${
              active === "success"
                ? "text-primary border-b-2 border-primary"
                : "text-base-content/60 hover:text-primary"
            }`}
          >
            Growth & Trust
          </button>

          <button
            onClick={() => setActive("team")}
            className={`transition ${
              active === "team"
                ? "text-primary border-b-2 border-primary"
                : "text-base-content/60 hover:text-primary"
            }`}
          >
            Team & Platform
          </button>
        </div>

        {/* Content */}
        <div className="mt-10 text-base-content/80 leading-7 space-y-6 max-w-4xl">
          {active === "story" && (
            <>
              <p>
                Tixgo was created to solve a real problem — fragmented and
                unreliable ticket booking experiences. Travelers often had to
                rely on physical counters, inconsistent pricing, or multiple
                platforms just to plan a single journey.
              </p>

              <p>
                By bringing bus, train, launch, and flight tickets into one
                platform, Tixgo simplifies the entire process — from searching
                routes to secure payments and instant confirmation.
              </p>

              <p>
                Our focus has always been clarity, reliability, and user trust.
              </p>
            </>
          )}

          {active === "mission" && (
            <>
              <p>
                Our mission is to make transportation booking accessible to
                everyone through a transparent, secure, and easy-to-use digital
                platform.
              </p>

              <p>
                Tixgo aims to reduce travel friction by partnering with verified
                operators, maintaining accurate schedules, and providing
                real-time booking information.
              </p>
            </>
          )}

          {active === "success" && (
            <>
              <p>
                Tixgo continues to grow by building trust with users and service
                providers. Each successful booking strengthens our network of
                verified vendors and satisfied travelers.
              </p>

              <p>
                With increasing route coverage and consistent system
                improvements, Tixgo is becoming a dependable choice for everyday
                and long-distance travel.
              </p>
            </>
          )}

          {active === "team" && (
            <>
              <p>
                Tixgo is powered by a dedicated team of developers, designers,
                and system engineers focused on performance, security, and user
                experience.
              </p>

              <p>
                Beyond the technical team, our platform is supported by trusted
                transport partners and customer support personnel who ensure
                smooth journeys from booking to arrival.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;