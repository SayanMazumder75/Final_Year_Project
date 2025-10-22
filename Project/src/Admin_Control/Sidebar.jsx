import React from "react";
import { User, Users, Car, LogOut } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="md:w-64 w-full bg-gray-800 flex flex-col md:h-screen">
      <div className="p-6 text-2xl font-bold text-yellow-400 text-center md:text-left">
        Dashboard
      </div>
      <div className="flex md:flex-col flex-row justify-around md:justify-start flex-1 space-y-0 md:space-y-2">
        {/* Tab buttons */}
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center p-4 hover:bg-gray-700 transition w-full md:w-auto justify-center md:justify-start ${
            activeTab === "users" ? "bg-gray-700" : ""
          }`}
        >
          <Users className="mr-2" /> <span className="hidden md:inline">Users</span>
        </button>
        <button
          onClick={() => setActiveTab("carOwners")}
          className={`flex items-center p-4 hover:bg-gray-700 transition w-full md:w-auto justify-center md:justify-start ${
            activeTab === "carOwners" ? "bg-gray-700" : ""
          }`}
        >
          <User className="mr-2" /> <span className="hidden md:inline">Car Owners</span>
        </button>
        <button
          onClick={() => setActiveTab("cars")}
          className={`flex items-center p-4 hover:bg-gray-700 transition w-full md:w-auto justify-center md:justify-start ${
            activeTab === "cars" ? "bg-gray-700" : ""
          }`}
        >
          <Car className="mr-2" /> <span className="hidden md:inline">Cars</span>
        </button>

        {/* Logout */}
        <button
          onClick={() => alert("Logging out")}
          className="flex items-center p-4 hover:bg-gray-700 transition w-full md:w-auto justify-center md:justify-start mt-auto"
        >
          <LogOut className="mr-2" /> <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
