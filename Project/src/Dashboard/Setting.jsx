import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Setting = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Navbar />
        <h1 className="text-2xl font-bold mt-4">Hello Setting Page</h1>
      </main>
    </div>
  );
};

export default Setting;