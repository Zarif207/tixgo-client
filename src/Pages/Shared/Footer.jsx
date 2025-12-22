import React from "react";
import {
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaStripe,
  FaInstagram,
  FaLinkedin,
  FaPlaneDeparture,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import logoimg from "../../assets/web-icon.png";

const Footer = () => {
  return (
    <footer className="mt-24">
      <div
        className="
          bg-gradient-to-br from-base-300 via-base-200 to-base-300
          text-base-content
          border-t border-base-content/10
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-16
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-12
          "
        >
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold pb-5">
              <img
                src={logoimg}
                alt="TixGo Logo"
                className="w-8 h-8 object-contain"
              />
              TixGo
            </div>
            <p className="text-base-content/70 leading-relaxed max-w-sm">
              Book bus, train, launch & flight tickets easily. Fast booking,
              secure payments, and trusted operators worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/all-tickets", label: "All Tickets" },
                { to: "/about", label: "About" },
                { to: "/contact-us", label: "Contact Us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="
                      text-base-content/70
                      hover:text-primary
                      transition
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4 text-base-content/70">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                support@tixgo.com
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                +880 1648-XXXXXX
              </li>

              <li className="flex items-center gap-4 pt-2">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4 ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex items-center gap-4 text-3xl text-base-content/70">
              <FaStripe />
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
            </div>
            <p className="text-sm mt-4 text-base-content/60">
              Secure & trusted global payment gateways.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-base-300 border-t border-base-content/10">
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-4
            text-center text-sm
            text-base-content/70
          "
        >
          © 2025 <span className="font-semibold text-primary">TixGo</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
