import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // Dummy Data (replace later with DB data)
  const [growthData, setGrowthData] = useState([
    { month: "Jan", growth: 40 },
    { month: "Feb", growth: 55 },
    { month: "Mar", growth: 75 },
    { month: "Apr", growth: 50 },
    { month: "May", growth: 90 },
  ]);

  const [salesData, setSalesData] = useState([
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 150 },
    { month: "Mar", sales: 200 },
    { month: "Apr", sales: 170 },
    { month: "May", sales: 220 },
  ]);

  // Simulate fetching from DB (replace with API call)
  useEffect(() => {
    // Example API call in real case
    // fetch("/api/dashboard").then(res => res.json()).then(data => setGrowthData(data.growth))
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="text-lg font-bold">same</div>
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Location</a>
          <a href="#" className="hover:text-red-500">Log out</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Section */}
        <div className="space-y-6">
          {/* Car Model */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Car Model</h2>
            <div className="h-32 flex items-center justify-center text-gray-400 car-model-box">
              Car model data (DB connect here)
            </div>
          </div>
          
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Available Cars */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-semibold mb-3">Available Cars</h2>
            <div className="h-32 flex items-center justify-center text-gray-400 available-cars-box">
              Available cars data (DB connect here)
            </div>
          </div>

          {/* Ordered Cars + Graphs */}
          <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
            <h2 className="text-lg font-semibold">Ordered Cars</h2>
          </div>
            {/* Company Growth Graph */}
            <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
                <h2 className="text-lg font-semibold">Company Growth</h2>
                <div className="w-full h-64 growth-graph">
                <ResponsiveContainer>
                    <LineChart data={growthData}>
                    <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 space-y-6">
                <h2 className="text-lg font-semibold">Company Growth</h2>
                {/* Last 5 Months Total Sales */}
                <div className="w-full h-64 sales-graph">
                <ResponsiveContainer>
                    <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
          </div>
        </div>
      </main>
    </div>
  );
}
