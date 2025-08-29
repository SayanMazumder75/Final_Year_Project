import React from "react";
import logo from "../images/logo.png"
// adjust path to your logo file

const Header = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        {/* Logo */}
        <div className="pl-12 md:pl-0">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-15 w-auto object-contain" 
          />
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Location</a>
          <a href="#" className="hover:text-red-500">Log out</a>
        </nav>
      </header>
    </div>
  );
}

export default Header;
