import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png"; // keep your logo file here

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // rows per page
  const [loading, setLoading] = useState(true);

  // Fetch rentals from backend
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/rental");
        const data = await res.json();
        if (data.success && Array.isArray(data.rentals)) {
          setRentals(data.rentals.reverse()); // newest first (optional)
        } else if (Array.isArray(data)) {
          // in case backend returns raw array
          setRentals(data.reverse());
        } else {
          console.warn("Unexpected rentals response shape:", data);
        }
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  // Filter by search: match common fields
  const filtered = rentals.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.name || "").toLowerCase().includes(q) ||
      (r.phone || "").toLowerCase().includes(q) ||
      (r.email || "").toLowerCase().includes(q) ||
      (r.car || "").toLowerCase().includes(q) ||
      (r.pickupLocation || "").toLowerCase().includes(q) ||
      (r.dropoffLocation || "").toLowerCase().includes(q)
    );
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Reset to first page if filtering reduced items
    if (currentItems.length === 0 && filtered.length > 0) setCurrentPage(1);
  }, [filtered]); // eslint-disable-line

  // Highlight search term in text
  const highlightText = (text) => {
    if (!search) return text || "";
    const regex = new RegExp(`(${search})`, "ig");
    const parts = String(text || "").split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-300 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // PDF generation for a rental row
  const downloadPDF = (rental) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 40;
    const imgHeight = 20;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 10;

    // Add logo (imported image url should work in most React builds)
    try {
      doc.addImage(logo, "PNG", imgX, imgY, imgWidth, imgHeight);
    } catch (err) {
      // if addImage fails (some builds require dataURL), ignore and continue
      console.warn("logo addImage failed:", err);
    }

    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(
      "Car Rental Confirmation / Summary",
      pageWidth / 2,
      imgY + imgHeight + 10,
      { align: "center" }
    );

    autoTable(doc, {
      startY: imgY + imgHeight + 20,
      head: [["Field", "Details"]],
      body: [
        ["Customer Name", rental.name || ""],
        ["Phone", rental.phone || ""],
        ["Email", rental.email || ""],
        ["Car", rental.car || ""],
        ["Pickup Date", rental.pickupDate || ""],
        ["Pickup Time", rental.pickupTime || ""],
        ["Dropoff Date", rental.dropoffDate || ""],
        ["Payment Method", rental.payment || ""],
        ["Submitted At", rental.createdAt || rental._id?.toString() || ""],
      ],
      styles: { fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const fileName = `${(rental.name || "rental").replace(/\s+/g, "_")}_rental.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-300 ${
          open
            ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto"
            : "opacity-100"
        }`}
      >
        {!open && (
          <div className="w-full shadow-md sticky top-0 z-10 bg-white">
            <Header />
          </div>
        )}

        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-x-hidden md:max-w-1500">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">
                Rentals
              </h2>

              <input
                type="text"
                placeholder="Search name, phone, car, location..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
              <table className="text-gray-700 text-xs sm:text-sm w-full">
                <thead className="bg-gray-100 text-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 border-b">Name</th>
                    <th className="py-2 px-3 border-b">Phone</th>
                    <th className="py-2 px-3 border-b">Email</th>
                    <th className="py-2 px-3 border-b">Car</th>
                    <th className="py-2 px-3 border-b">Dropoff Date</th>
                    <th className="py-2 px-3 border-b">Pickup Date/Time</th>
                    <th className="py-2 px-3 border-b">Payment</th>
                    <th className="py-2 px-3 border-b">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-6">
                        Loading...
                      </td>
                    </tr>
                  ) : currentItems.length > 0 ? (
                    currentItems.map((r, idx) => (
                      <tr
                        key={r._id || idx}
                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
                      >
                        <td className="py-2 px-3 font-medium text-blue-900">{highlightText(r.name)}</td>
                        <td className="py-2 px-3">{highlightText(r.phone)}</td>
                        <td className="py-2 px-3">{highlightText(r.email)}</td>
                        <td className="py-2 px-3 font-medium">{highlightText(r.car)}</td>
                        <td className="py-2 px-3">{highlightText(r.dropoffDate)}</td>
                        <td className="py-2 px-3">
                          {r.pickupDate || ""} {r.pickupTime ? ` / ${r.pickupTime}` : ""}
                        </td>
                        <td className="py-2 px-3">{r.payment}</td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => downloadPDF(r)}
                            className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-gray-500 italic">
                        No rentals found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {filtered.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-4">
                  <label htmlFor="pageSelect" className="mr-2 text-sm text-gray-600">Page:</label>
                  <select
                    id="pageSelect"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} / {totalPages}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-xs font-medium text-gray-500">Total Rentals</h3>
              <p className="text-xl font-bold text-blue-600 mt-1">{rentals.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-xs font-medium text-gray-500">This Month (approx)</h3>
              <p className="text-xl font-bold text-green-600 mt-1">{rentals.filter(r => {
                // crude "this month" count if rental has createdAt or date fields
                if (!r.pickupDate && !r.createdAt) return false;
                try {
                  const dateStr = r.pickupDate || r.createdAt;
                  const d = new Date(dateStr);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                } catch {
                  return false;
                }
              }).length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-xs font-medium text-gray-500">Online Payments</h3>
              <p className="text-xl font-bold text-purple-600 mt-1">
                {rentals.filter(r => r.payment && r.payment.toLowerCase() !== "cash").length}
              </p>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}