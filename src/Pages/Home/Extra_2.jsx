import React from "react";
import {
  FaShieldAlt,
  FaClock,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

const Extra_2 = () => {
  const faqs = [
    {
      id: 1,
      icon: FaShieldAlt,
      question: "How secure is my booking and payment?",
      answer:
        "Security is our top priority. Every booking and payment on our platform is processed using industry-standard encryption and trusted payment gateways. We never store sensitive card details, and all personal data is protected using strict privacy policies. This ensures a safe, reliable, and worry-free booking experience for every user.",
    },
    {
      id: 2,
      icon: FaClock,
      question: "How fast is the booking and confirmation process?",
      answer:
        "Our system is optimized for speed and reliability. Once your payment is complete, the booking is confirmed instantly. You can immediately access your ticket details from your dashboard without delays, making travel planning smooth and stress-free.",
    },
    {
      id: 3,
      icon: FaDollarSign,
      question: "Are there any hidden charges?",
      answer:
        "No hidden costs—ever. The price you see during booking is the final price you pay. We believe in full transparency, allowing you to plan your travel budget confidently while enjoying competitive pricing across all available routes.",
    },
    {
      id: 4,
      icon: FaStar,
      question: "Why should I trust your vendors?",
      answer:
        "All vendors go through a strict verification process before joining our platform. We continuously review service quality using customer feedback and performance metrics, ensuring that every journey meets high standards of comfort, reliability, and professionalism.",
    },
  ];

  return (
    <section className="bg-base-100 py-24 px-6 border-y border-base-300">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Why <span className="text-primary">Choose</span> Us?
        </h2>
        <p className="opacity-70 text-lg">
          Learn why thousands of travelers trust our platform for safe,
          fast, and affordable ticket bookings.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-2xl"
            >
              <input type="radio" name="why-choose-us-faq" />

              <div className="collapse-title flex items-center gap-4 text-lg font-semibold">
                <span className="text-primary text-xl">
                  <Icon />
                </span>
                {item.question}
              </div>

              <div className="collapse-content">
                <p className="leading-relaxed opacity-80">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Extra_2;