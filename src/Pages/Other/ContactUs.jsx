import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaHeadset,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="mt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-base-content">
            Contact Tixgo
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Have questions, feedback, or need help with a booking?
            Our support team is here to assist you every step of the way.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT INFO PANEL */}
          <div
            className="
              bg-base-100
              border border-base-300
              rounded-2xl
              p-8
              shadow-sm
            "
          >
            <h3 className="text-2xl font-semibold text-base-content mb-6">
              Get in Touch
            </h3>

            <p className="text-base-content/70 mb-8">
              Whether you’re facing a payment issue, need booking support,
              or want to partner with us — feel free to reach out.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-primary text-xl mt-1" />
                <div>
                  <p className="font-medium text-base-content">Email</p>
                  <p className="text-base-content/70">
                    support@tixgo.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-primary text-xl mt-1" />
                <div>
                  <p className="font-medium text-base-content">Phone</p>
                  <p className="text-base-content/70">
                    +880 1XXX-XXXXXX
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                <div>
                  <p className="font-medium text-base-content">
                    Office Location
                  </p>
                  <p className="text-base-content/70">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="#"
                  className="
                    p-3 rounded-full
                    bg-base-200 hover:bg-primary hover:text-primary-content
                    transition
                  "
                >
                  <FaFacebook />
                </a>

                <span className="text-base-content/60 text-sm">
                  Follow us for updates & offers
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div
            className="
              bg-base-100
              border border-base-300
              rounded-2xl
              p-8
              shadow-sm
            "
          >
            <h3 className="text-2xl font-semibold text-base-content mb-6 flex items-center gap-2">
              <FaHeadset className="text-primary" />
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-lg"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-base-content/60 mt-4">
              We usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;