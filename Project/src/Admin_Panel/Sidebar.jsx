import React, { useState } from "react";
import { Home, UsersRound , Car, IndianRupee, MessageSquareWarning , Settings, Menu,UserPen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => { 
  const location = useLocation();
  const [open, setOpen] = useState(false); // toggle sidebar on mobile

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Users", path: "/Users", icon: <UsersRound  size={18} /> },
    { name: "Sell Vehicles", path: "/Sell_Vehicles", icon: <Car size={18} /> },
    { name: "Rental Vehicles", path: "/Rental_Vehicles", icon: <Car size={18} /> },
    { name: "Payments", path: "/Payments", icon: <IndianRupee  size={18} /> },
    { name: "Reports", path: "/Reports", icon: <MessageSquareWarning  size={18} /> },
    { name: "Setting", path: "/Setting", icon: <Settings size={18} /> },
    { name: "Profile", path: "/Profile", icon: <UserPen size={18} /> },

  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-3 text-white bg-zinc-800 fixed top-4 left-4 z-50 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        <Menu size={18} />
        
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-violet-400 p-2 z-40 transform transition-transform duration-500 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-40 `}
      >
        {/* Logo */} 
        <h1 className="text-xl font-bold text-black text-center"> Admin</h1>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 ${
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
