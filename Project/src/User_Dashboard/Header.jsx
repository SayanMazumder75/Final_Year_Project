import React, { useState } from "react";
import { Home, LogOut, Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const UserHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get logged-in user name
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData?.email ;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">

            {/* Home */}
            <Link
              to="/"
              className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  location.pathname === "/"
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Home size={16} />
              Home
            </Link>

            {/* User Name */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
              <User size={16} />
              {userName}
            </div>

            {/* Logout */}
            <Link
              to="/Login"
              className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-4 py-2 rounded-md"
              onClick={() => localStorage.clear()}
            >
              <LogOut size={16} />
              Logout
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col p-3 space-y-1">

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              <Home size={16} />
              Home
            </Link>

            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-sm">
              <User size={16} />
              {userName}
            </div>

            <Link
              to="/Login"
              onClick={() => {
                localStorage.clear();
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
