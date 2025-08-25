import React, { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardCards = () => {
  const cards = [
    { title: "Cars in Stock", value: "120", gradient: "bg-blue-500" },
    { title: "Cars Sold (This Month)", value: "45", gradient: "bg-green-500" },
    { title: "Leads / Enquiries", value: "87", gradient: "bg-yellow-500" },
    { title: "Revenue", value: "₹2.3 Cr", gradient: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
         className={`group relative p-6 rounded-2xl text-white shadow-2xl overflow-hidden 
          bg-gradient-to-br ${card.gradient} transform transition-all duration-500 
          hover:rotate-x-6 hover:rotate-y-6 hover:scale-105 
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}        >
         {/* Glow border effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/20 to-transparent blur-2xl"></div>
           <h2 className="text-lg font-semibold relative z-10 group-hover:translate-y-[-4px] transition-transform duration-300">
            {card.title}
          </h2>
          <p className="text-3xl font-bold mt-3 drop-shadow-lg relative z-10 group-hover:translate-y-[-6px] transition-transform duration-300">
            {card.value}
          </p>
                    <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>

        </div>
      ))}
    </div>
  );
};

const Dashboard = () =>{
  return(
        
    <div className="flex relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950" >
    
      <Sidebar />
        {/* Main Content */}
          <div className="flex-1 p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Dashboard Overview
            </h2>
            <DashboardCards />
            <div className="h-1 w-full bg-blue-950 rounded-full my-8"></div>

          </div>
    </div>
    
  )
}


export default Dashboard 