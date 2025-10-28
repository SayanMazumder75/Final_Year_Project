import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CarOwnersPage from "./CarOwnersPage";
// import CarsPage from "./CarsPage";
import UsersPage from "./UsersPage";

export default function WebOwnerDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-full md:w-64">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-auto p-4 sm:p-6 md:p-8">
        {activeTab === "users" && <UsersPage/>}
        {activeTab === "carOwners" && <CarOwnersPage />}
        {activeTab === "cars"}
      </div>
    </div>
  );
}
