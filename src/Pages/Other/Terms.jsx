import React from "react";
import {
  Shield,
  FileText,
  Users,
  CreditCard,
  Lock,
  AlertCircle,
  Clock,
  Settings,
} from "lucide-react";

const Terms = () => {
  const termsData = [
    {
      icon: FileText,
      title: "Platform Overview",
      content:
        "TixGo is an online ticket booking platform that allows users to discover, book, and pay for tickets for Bus, Train, Launch, and Plane travel. The platform connects users with verified vendors while ensuring a secure booking experience.",
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content:
        "Users must provide accurate personal and payment information. Any misuse of the platform, fake bookings, or fraudulent activities may result in account suspension or permanent ban.",
    },
    {
      icon: Shield,
      title: "Vendor Obligations",
      content:
        "Vendors are responsible for maintaining accurate schedules, pricing, seat availability, and service quality. TixGo is not responsible for delays, cancellations, or service issues caused by vendors.",
    },
    {
      icon: AlertCircle,
      title: "Booking & Confirmation",
      content:
        "Once a ticket is booked, it is considered confirmed unless stated otherwise. Users should verify journey details before completing payment.",
    },
    {
      icon: CreditCard,
      title: "Payment & Refunds",
      content:
        "All payments are processed securely using trusted payment gateways. Refunds and cancellations depend on vendor policies and ticket type.",
    },
    {
      icon: Lock,
      title: "Privacy & Data Protection",
      content:
        "TixGo respects user privacy and protects personal data. Information is used only to improve services and ensure platform security.",
    },
    {
      icon: Clock,
      title: "Platform Availability",
      content:
        "We strive to keep the platform available at all times. Temporary downtime may occur due to maintenance or technical issues.",
    },
    {
      icon: Settings,
      title: "Administrator Rights",
      content:
        "Administrators reserve the right to manage users, vendors, tickets, and platform policies to maintain a secure ecosystem.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-base-content mb-3">
            Terms & Conditions
          </h1>
          <p className="text-base-content/70">
            By accessing or using TixGo, you agree to comply with the following
            terms. Please read them carefully.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-6">
          {termsData.map((term, index) => {
            const Icon = term.icon;
            return (
              <div
                key={index}
                className="bg-base-100 rounded-2xl border border-base-300 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-base-content mb-2">
                      {term.title}
                    </h2>
                    <p className="text-base-content/70 leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Policy Update Box */}
        <div className="mt-10 bg-primary/10 border border-primary/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-base-content mb-2">
            Policy Updates
          </h3>
          <p className="text-base-content/70">
            TixGo may update these terms at any time. Continued use of the
            platform means you accept the updated terms.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-base-content/60">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Terms;