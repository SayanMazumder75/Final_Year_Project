import React, { useState } from "react";
import { Home, Car, UserPen, Menu, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={16} /> },
    { name: "Sell Vehicles", path: "/Sell_Vehicles", icon: <Car size={16} /> },
    { name: "Rental Vehicles", path: "/Rental_Vehicles", icon: <Car size={16} /> },
    { name: "Profile", path: "/Profile", icon: <UserPen size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="font-semibold text-lg text-gray-700 hidden sm:block">
              Owner Panel
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition
                  ${
                    location.pathname === item.path
                      ? "bg-violet-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Logout */}
            <Link
              to="/Login"
              className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md"
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
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm
                  ${
                    location.pathname === item.path
                      ? "bg-violet-600 text-white"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <Link
              to="/Login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
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

export default Header;
