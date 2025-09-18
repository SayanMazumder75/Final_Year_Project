import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png"

export default function Dashboard() {
  const [open, setOpen] = useState(false); // sidebar toggle state
  const [search, setSearch] = useState(""); // search state

  const soldCars = [
    {
      id: 1,
      customerId: "CUST-101",
      customerName: "Soumyadip",
      date: "2024-08-20",
      name: "Auto Rickshaw",
      revenue: "₹15,000",
      originalPrice: "₹45,000",
      salePrice: "₹60,000",
      totalRevenue: "₹75,000",
    },
    {
      id: 2,
      customerId: "CUST-102",
      customerName: "Sidhu",
      date: "2024-08-20",
      name: "TOTO",
      revenue: "₹10,500",
      originalPrice: "₹55,000",
      salePrice: "₹65,500",
      totalRevenue: "₹76,000",
    },
    {
      id: 3,
      customerId: "CUST-103",
      customerName: "Anushka",
      date: "2024-08-20",
      name: "maruti 800",
      revenue: "₹9,200",
      originalPrice: "₹50,000",
      salePrice: "₹59,200",
      totalRevenue: "₹68,400",
    },
    {
      id: 4,
      customerId: "CUST-104",
      customerName: "Nafiya",
      date: "2024-08-20",
      name: "Tata Nano",
      revenue: "₹9000",
      originalPrice: "₹20000",
      salePrice: "₹29,000",
      totalRevenue: "₹38,000",
    },
    {
      id: 5,
      customerId: "CUST-105",
      customerName: "Sayan",
      date: "2024-08-20",
      name: "Mercedes C-Class",
      revenue: "₹10,000",
      originalPrice: "₹47,000",
      salePrice: "₹58,000",
      totalRevenue: "₹68,000",
    },
  ];

  // Filter cars by name, customerId, or customerName
  const filteredCars = soldCars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.customerId.toLowerCase().includes(search.toLowerCase()) ||
      car.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // Highlight search text inside a string
  const highlightText = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(₹{search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Download PDF for a single car
  const downloadPDF = (car) => {
  const doc = new jsPDF();

  // Page width
  const pageWidth = doc.internal.pageSize.getWidth();

  // Logo dimensions
  const imgWidth = 40;
  const imgHeight = 20;

  // Centered logo position
  const imgX = (pageWidth - imgWidth) / 2;
  const imgY = 10;

  // Add Logo
  doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);

  // Title below logo
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Customer Car Sale Report", pageWidth / 2, imgY + imgHeight + 10, { align: "center" });

  // Table starts after title
  autoTable(doc, {
    startY: imgY + imgHeight + 20,
    head: [["Field", "Details"]],
    body: [
      ["Customer ID", car.customerId],
      ["Customer Name", car.customerName],
      ["Date", car.date],
      ["Car Name", car.name],
      ["Revenue", car.revenue],
      ["Original Price", car.originalPrice],
      ["Sale Price", car.salePrice],
      ["Total Revenue", car.totalRevenue],
    ],
    styles: { fontSize: 11 },
    headStyles: { fillColor: [41, 128, 185] }, // nice blue header
  });

  // Save PDF
  doc.save(`₹{car.customerName}_Car_Report.pdf`);
};


  return (
    <div className="min-h-screen flex bg-gray-700">
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
        className={`flex-1 flex flex-col transition-opacity duration-300 ₹{
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
        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-y-auto md:max-w-1500">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                Already Sold Cars
              </h2>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by car name, customer ID or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 w-full max-sm:w-90 max-sm:h-60">
              <table className="text-gray-700 text-xs sm:text-sm w-full">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Customer Id
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Customer Name
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">Date</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Car Name
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Revenue
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Original Price
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Sale Price
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Total Revenue
                    </th>
                    <th className="py-2 px-3 sm:py-3 sm:px-4 border-b">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car, index) => (
                      <tr
                        key={car.id}
                        className={`₹{
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition`}
                      >
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-blue-900">
                          {highlightText(car.customerId)}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          {highlightText(car.customerName)}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          {car.date}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium text-blue-900">
                          {highlightText(car.name)}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          {car.revenue}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          {car.originalPrice}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          {car.salePrice}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold text-green-600">
                          {car.totalRevenue}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-4">
                          <button
                            onClick={() => downloadPDF(car)}
                            className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-4 text-gray-500 italic"
                      >
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
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Total Cars Sold
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">
                350+
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                Total Revenue
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1 sm:mt-2">
                ₹2.5M
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition">
              <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                This Month
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1 sm:mt-2">
                45 Cars
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
