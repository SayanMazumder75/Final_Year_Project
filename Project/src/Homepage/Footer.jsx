import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">About Us</h4>
          <p className="text-sm leading-relaxed">
            Bringing premium cars closer to you with trust, transparency,
            and excellence in every deal.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-indigo-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/Login" className="hover:text-indigo-400 transition">
                Login
              </a>
            </li>
            <li>
              <a href="/admin/dashboard" className="hover:text-indigo-400 transition">
                Admin Panel
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" /> support@keystofreedom.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" /> Kolkata, India
          </p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} KEYS TO FREEDOM. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
