import React, { useState } from "react";
import { Home, Users, Star, Calendar, DollarSign, BarChart2, Settings, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false); // toggle sidebar on mobile

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Users", path: "/users", icon: <Users size={18} /> },
    { name: "Astrologers", path: "/astrologers", icon: <Star size={18} /> },
    { name: "Sessions", path: "/sessions", icon: <Calendar size={18} /> },
    { name: "Payments", path: "/payments", icon: <DollarSign size={18} /> },
    { name: "Reports", path: "/reports", icon: <BarChart2 size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-3 text-white bg-zinc-800 fixed top-4 left-4 z-50 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-zinc-900 text-white p-4 z-40 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64`}
      >
        {/* Logo */}
        <h1 className="text-xl font-bold mb-8">Astro Admin</h1>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-zinc-700 text-yellow-300"
                  : "hover:bg-zinc-700"
              }`}
              onClick={() => setOpen(false)} // close sidebar after click (on mobile)
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-zinc-700">
          <p className="text-sm text-gray-400"> 2025 Sayan</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
