import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png"; // make sure to adjust your logo path

export default function Payments() {
  const [open, setOpen] = useState(false);
  const [searchRent, setSearchRent] = useState("");
  const [searchSell, setSearchSell] = useState("");

  // Rented Vehicles
  const rentedVehicles = [
    { id: 1, customerId: "CUST-R01", name: "Toyota Innova", dailyRate: 50, rentedDays: 12, customer: "John Doe", startDate: "2025-08-01", endDate: "2025-08-12", paymentStatus: "Paid" },
    { id: 2, customerId: "CUST-R02", name: "Honda City", dailyRate: 40, rentedDays: 15, customer: "Jane Smith", startDate: "2025-08-03", endDate: "2025-08-17", paymentStatus: "Unpaid" },
    { id: 3, customerId: "CUST-R03", name: "Maruti Suzuki Swift", dailyRate: 30, rentedDays: 20, customer: "Alice Johnson", startDate: "2025-08-05", endDate: "2025-08-25", paymentStatus: "Paid" },
  ];

  // Sold Vehicles
  const soldVehicles = [
    { id: 1, customerId: "CUST-101", name: "Tesla Model 3", price: 100000, customer: "Mark Lee", soldDate: "2025-08-05", paymentStatus: "Paid" },
    { id: 2, customerId: "CUST-102", name: "BMW X5", price: 120000, customer: "Sara Khan", soldDate: "2025-08-10", paymentStatus: "Unpaid" },
    { id: 3, customerId: "CUST-103", name: "Audi A6", price: 90000, customer: "Tom Cruise", soldDate: "2025-08-12", paymentStatus: "Paid" },
  ];

  // Calculate revenue for rented vehicles
  const rentedWithRevenue = rentedVehicles.map(vehicle => ({
    ...vehicle,
    revenue: vehicle.dailyRate * vehicle.rentedDays,
    paidAmount: vehicle.paymentStatus === "Paid" ? vehicle.dailyRate * vehicle.rentedDays : 0
  }));

  // Calculate revenue for sold vehicles
  const soldWithRevenue = soldVehicles.map(vehicle => ({
    ...vehicle,
    paidAmount: vehicle.paymentStatus === "Paid" ? vehicle.price : 0
  }));

  // Highlight helper (case-insensitive)
  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Filtered lists for search
  const filteredRented = rentedWithRevenue.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchRent.toLowerCase()) ||
    vehicle.customer.toLowerCase().includes(searchRent.toLowerCase()) ||
    vehicle.customerId.toLowerCase().includes(searchRent.toLowerCase())
  );

  const filteredSold = soldWithRevenue.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchSell.toLowerCase()) ||
    vehicle.customer.toLowerCase().includes(searchSell.toLowerCase()) ||
    vehicle.customerId.toLowerCase().includes(searchSell.toLowerCase())
  );

  // Stats
  const totalRentedRevenue = rentedWithRevenue.reduce((sum, v) => sum + v.revenue, 0);
  const totalRentedPaid = rentedWithRevenue.reduce((sum, v) => sum + v.paidAmount, 0);
  const totalRentedUnpaid = totalRentedRevenue - totalRentedPaid;

  const totalSoldRevenue = soldWithRevenue.reduce((sum, v) => sum + v.price, 0);
  const totalSoldPaid = soldWithRevenue.reduce((sum, v) => sum + v.paidAmount, 0);
  const totalSoldUnpaid = totalSoldRevenue - totalSoldPaid;

  // Download PDF for a single vehicle
  const downloadPDF = (vehicle, type) => {
    const doc = new jsPDF();

    // Page width
    const pageWidth = doc.internal.pageSize.getWidth();

    // Logo
    const imgWidth = 40;
    const imgHeight = 20;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 10;
    doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(type === "rent" ? "Rented Vehicle Report" : "Sold Vehicle Report", pageWidth / 2, imgY + imgHeight + 10, { align: "center" });

    // Table data
    const tableBody = type === "rent"
      ? [
          ["Customer ID", vehicle.customerId],
          ["Customer Name", vehicle.customer],
          ["Vehicle Name", vehicle.name],
          ["Start Date", vehicle.startDate],
          ["End Date", vehicle.endDate],
          ["Daily Rate", `$${vehicle.dailyRate}`],
          ["Rented Days", vehicle.rentedDays],
          ["Revenue", `$${vehicle.revenue}`],
          ["Payment Status", vehicle.paymentStatus],
        ]
      : [
          ["Customer ID", vehicle.customerId],
          ["Customer Name", vehicle.customer],
          ["Vehicle Name", vehicle.name],
          ["Sold Date", vehicle.soldDate],
          ["Price", `$${vehicle.price}`],
          ["Payment Status", vehicle.paymentStatus],
        ];

    autoTable(doc, {
      startY: imgY + imgHeight + 20,
      head: [["Field", "Details"]],
      body: tableBody,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`${vehicle.customer}_${vehicle.name}_Report.pdf`);
  };

  return (
    <div className="min-h-screen flex bg-gray-700">
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${open ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"}`}>
        {!open && <Header />}

        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-y-auto space-y-8">
          {/* Rented Vehicles */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">Rented Vehicles Payments</h2>
              <input
                type="text"
                placeholder="Search rented vehicles..."
                value={searchRent}
                onChange={(e) => setSearchRent(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 max-sm:w-90 max-sm:h-60">
              <table className="min-w-full text-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-4 border-b">Vehicle</th>
                    <th className="py-2 px-4 border-b">Customer Id</th>
                    <th className="py-2 px-4 border-b">Customer</th>
                    <th className="py-2 px-4 border-b">Start Date</th>
                    <th className="py-2 px-4 border-b">End Date</th>
                    <th className="py-2 px-4 border-b">Daily Rate</th>
                    <th className="py-2 px-4 border-b">Rented Days</th>
                    <th className="py-2 px-4 border-b">Revenue</th>
                    <th className="py-2 px-4 border-b">Payment Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRented.length > 0 ? filteredRented.map((v, idx) => (
                    <tr key={v.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-2 px-3 font-medium text-blue-900">{highlightText(v.name, searchRent)}</td>
                      <td className="py-2 px-3">{highlightText(v.customerId, searchRent)}</td>
                      <td className="py-2 px-3">{highlightText(v.customer, searchRent)}</td>
                      <td className="py-2 px-3">{v.startDate}</td>
                      <td className="py-2 px-3">{v.endDate}</td>
                      <td className="py-2 px-3">${v.dailyRate}</td>
                      <td className="py-2 px-3">{v.rentedDays}</td>
                      <td className="py-2 px-3 font-semibold text-green-600">${v.revenue}</td>
                      <td className={`py-2 px-3 font-semibold ${v.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>{v.paymentStatus}</td>
                      <td className="py-2 px-2">
                        <button
                          onClick={() => downloadPDF(v, "rent")}
                          className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="10" className="text-center py-4 text-gray-500 italic">No rented vehicles found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Rented stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4">
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">${totalRentedRevenue}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Paid</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">${totalRentedPaid}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Unpaid</h3>
                <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">${totalRentedUnpaid}</p>
              </div>
            </div>
          </div>

          {/* Sold Vehicles */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">Sold Vehicles Payments</h2>
              <input
                type="text"
                placeholder="Search sold vehicles..."
                value={searchSell}
                onChange={(e) => setSearchSell(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 max-sm:w-90 max-sm:h-60">
              <table className="min-w-full text-gray-700 text-xs sm:text-sm">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-4 border-b">Vehicle</th>
                    <th className="py-2 px-4 border-b">Customer Id</th>
                    <th className="py-2 px-4 border-b">Customer</th>
                    <th className="py-2 px-4 border-b">Sold Date</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Payment Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSold.length > 0 ? filteredSold.map((v, idx) => (
                    <tr key={v.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-2 px-3 font-medium text-blue-900">{highlightText(v.name, searchSell)}</td>
                      <td className="py-2 px-3">{highlightText(v.customerId, searchSell)}</td>
                      <td className="py-2 px-3">{highlightText(v.customer, searchSell)}</td>
                      <td className="py-2 px-3">{v.soldDate}</td>
                      <td className="py-2 px-3 font-semibold text-green-600">${v.price}</td>
                      <td className={`py-2 px-3 font-semibold ${v.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>{v.paymentStatus}</td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => downloadPDF(v, "sell")}
                          className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500 italic">No sold vehicles found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Sold stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4">
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Sold Amount</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">${totalSoldRevenue}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Paid</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">${totalSoldPaid}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Unpaid</h3>
                <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">${totalSoldUnpaid}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
