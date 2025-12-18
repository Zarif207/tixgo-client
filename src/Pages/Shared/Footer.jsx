import React from "react";
import {
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaStripe,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-20">
      {/* ================= MAIN FOOTER ================= */}
      <div className="bg-gradient-to-br from-base-300 via-base-200 to-base-300 text-base-content">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ================= COLUMN 1 ================= */}
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-primary">Tixgo</h2>
            <p className="text-base-content/70 leading-relaxed">
              Book bus, train, launch & flight tickets easily. Fast booking,
              secure payment and trusted operators.
            </p>
          </div>

          {/* ================= COLUMN 2 ================= */}
          <div>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/all-tickets" className="link link-hover">
                  All Tickets
                </Link>
              </li>

              <li>
                <Link to="/about" className="link link-hover">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact-us" className="link link-hover">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 3 ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-base-content/80">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                support@tixgo.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                +880 1648-XXXXXX
              </li>
              <li className="flex items-center gap-3">
                <FaFacebookF className="text-primary" />
                facebook.com/ticketbari
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4 ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex items-center gap-4 text-3xl text-base-content/80">
              <FaStripe />
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-base-300 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-base-content/70">
          © 2025 <span className="font-semibold text-primary">Tixgo</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
