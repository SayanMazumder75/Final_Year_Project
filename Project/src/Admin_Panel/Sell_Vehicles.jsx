import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Dashboard() {
  const [open, setOpen] = useState(false); // sidebar toggle state
  const [search, setSearch] = useState(""); // search state

  const soldCars = [
    { id: 1, name: "Tesla Model 3", revenue: "$15,000", originalPrice: "$45,000", salePrice: "$60,000", totalRevenue: "$75,000" },
    { id: 2, name: "BMW X5", revenue: "$10,500", originalPrice: "$55,000", salePrice: "$65,500", totalRevenue: "$76,000" },
    { id: 3, name: "Audi A6", revenue: "$9,200", originalPrice: "$50,000", salePrice: "$59,200", totalRevenue: "$68,400" },
    { id: 4, name: "Mercedes C-Class", revenue: "$11,000", originalPrice: "$48,000", salePrice: "$59,000", totalRevenue: "$70,000" },
    { id: 5, name: "Mercedes C-Class", revenue: "$10,000", originalPrice: "$47,000", salePrice: "$58,000", totalRevenue: "$69,000" },
    { id: 6, name: "Mercedes C-Class", revenue: "$12,000", originalPrice: "$49,000", salePrice: "$60,000", totalRevenue: "$71,000" },
  ];

  const filteredCars = soldCars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-opacity duration-300 ${
          open
            ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto"
            : "opacity-100"
        }`}
      >
        {/* Header */}
        {!open && (
          <div className="w-full shadow-md sticky top-0 z-10 bg-white">
            <Header />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                Already Sold Cars
              </h2>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by car name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Car Name</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Revenue</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Original Price</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Sale Price</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car, index) => (
                      <tr
                        key={car.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-blue-900">{car.name}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{car.revenue}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{car.originalPrice}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">{car.salePrice}</td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold text-green-600">
                          {car.totalRevenue}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                        No cars found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Cars Sold</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">350+</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1 sm:mt-2">$2.5M</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">This Month</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 sm:mt-2">45 Cars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
