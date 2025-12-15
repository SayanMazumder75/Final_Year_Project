import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../Homepage/Footer";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png"; // adjust your logo path

export default function Payments() {
  const [open, setOpen] = useState(false);
  const [searchRent, setSearchRent] = useState("");
  const [searchSell, setSearchSell] = useState("");
  const [rentPage, setRentPage] = useState(1);
  const [sellPage, setSellPage] = useState(1);
  const itemsPerPage = 5; // items per page for pagination

  // Rented Vehicles
  const [rentedVehicles, setRentedVehicles] = useState([]);
  const [soldVehicles, setSoldVehicles] = useState([]);
useEffect(() => {
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      /* ==========================
         1️⃣ FETCH LOGGED-IN OWNER
      ========================== */
      const ownerRes = await fetch("http://localhost:5000/api/owner/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!ownerRes.ok) throw new Error("Owner fetch failed");

      const ownerData = await ownerRes.json();
      const ownerEmail = ownerData.email;

      /* ==========================
         2️⃣ FETCH RENT PAYMENTS
         (from car rentals DB)
      ========================== */
      const rentRes = await fetch("http://localhost:5000/api/rental");
      const rentData = await rentRes.json();

      let rentArray = [];
      if (rentData.success && Array.isArray(rentData.rentals)) {
        rentArray = rentData.rentals;
      } else if (Array.isArray(rentData)) {
        rentArray = rentData;
      }

      const ownerRentPayments = rentArray
        .filter(r => r.ownerEmail === ownerEmail)
        .map(r => ({
          id: r._id,
          customerId: r._id.slice(-6),
          name: r.car,
          dailyRate: r.price || 0,
          rentedDays: r.totalDays || 1,
          customer: r.name,
          startDate: r.pickupDate,
          endDate: r.dropoffDate,
          paymentStatus: r.payment?.toLowerCase() === "cash" ? "Unpaid" : "Paid",
        }));

      setRentedVehicles(ownerRentPayments);

      /* ==========================
         FETCH SELL PAYMENTS
         (buyers DB)
      ========================== */
      const sellRes = await fetch("http://localhost:5000/api/buyer");
      const sellData = await sellRes.json();

      let sellArray = [];
      if (sellData.success && Array.isArray(sellData.buyers)) {
        sellArray = sellData.buyers;
      } else if (Array.isArray(sellData)) {
        sellArray = sellData;
      }

      const ownerSellPayments = sellArray
        .filter(b => b.ownerEmail === ownerEmail)
        .map(b => ({
          id: b._id,
          customerId: b._id.slice(-6),
          name: b.car,
          price: b.price || 0,
          customer: b.name,
          soldDate: b.createdAt?.split("T")[0],
          paymentStatus: b.payment?.toLowerCase() === "cash" ? "Unpaid" : "Paid",
        }));

      setSoldVehicles(ownerSellPayments);

    } catch (err) {
      console.error("Payment fetch error:", err);
    }
  };

  fetchPayments();
}, []);


  // Compute revenue & paid amounts
  const rentedWithRevenue = rentedVehicles.map(v => ({
    ...v,
    revenue: v.dailyRate * v.rentedDays,
    paidAmount: v.paymentStatus === "Paid" ? v.dailyRate * v.rentedDays : 0
  }));

  const soldWithRevenue = soldVehicles.map(v => ({
    ...v,
    paidAmount: v.paymentStatus === "Paid" ? v.price : 0
  }));

  // Search filters
  const filteredRented = rentedWithRevenue.filter(v =>
    v.name.toLowerCase().includes(searchRent.toLowerCase()) ||
    v.customer.toLowerCase().includes(searchRent.toLowerCase()) ||
    v.customerId.toLowerCase().includes(searchRent.toLowerCase())
  );

  const filteredSold = soldWithRevenue.filter(v =>
    v.name.toLowerCase().includes(searchSell.toLowerCase()) ||
    v.customer.toLowerCase().includes(searchSell.toLowerCase()) ||
    v.customerId.toLowerCase().includes(searchSell.toLowerCase())
  );

  // Pagination slices
  const rentTotalPages = Math.ceil(filteredRented.length / itemsPerPage);
  const sellTotalPages = Math.ceil(filteredSold.length / itemsPerPage);

  const rentCurrentItems = filteredRented.slice((rentPage - 1) * itemsPerPage, rentPage * itemsPerPage);
  const sellCurrentItems = filteredSold.slice((sellPage - 1) * itemsPerPage, sellPage * itemsPerPage);

  // Stats
  const totalRentedRevenue = rentedWithRevenue.reduce((sum, v) => sum + v.revenue, 0);
  const totalRentedPaid = rentedWithRevenue.reduce((sum, v) => sum + v.paidAmount, 0);
  const totalRentedUnpaid = totalRentedRevenue - totalRentedPaid;

  const totalSoldRevenue = soldWithRevenue.reduce((sum, v) => sum + v.price, 0);
  const totalSoldPaid = soldWithRevenue.reduce((sum, v) => sum + v.paidAmount, 0);
  const totalSoldUnpaid = totalSoldRevenue - totalSoldPaid;

  // Highlight search text
  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? <span key={idx} className="bg-yellow-200 font-semibold">{part}</span> : part
    );
  };

  // PDF download
  const downloadPDF = (vehicle, type) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.addImage(logo, "PNG", (pageWidth - 40) / 2, 10, 40, 20);
    doc.setFontSize(18);
    doc.text(type === "rent" ? "Rented Vehicle Report" : "Sold Vehicle Report", pageWidth / 2, 40, { align: "center" });

    const tableBody = type === "rent"
      ? [["Customer ID", vehicle.customerId], ["Customer Name", vehicle.customer], ["Vehicle Name", vehicle.name], ["Start Date", vehicle.startDate], ["End Date", vehicle.endDate], ["Daily Rate", `INR ${vehicle.dailyRate}`], ["Rented Days", vehicle.rentedDays], ["Revenue", `INR ${vehicle.revenue}`], ["Payment Status", vehicle.paymentStatus]]
      : [["Customer ID", vehicle.customerId], ["Customer Name", vehicle.customer], ["Vehicle Name", vehicle.name], ["Sold Date", vehicle.soldDate], ["Price", `INR ${vehicle.price}`], ["Payment Status", vehicle.paymentStatus]];

    autoTable(doc, {
      startY: 50,
      head: [["Field", "Details"]],
      body: tableBody,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`${vehicle.customer}_${vehicle.name}_Report.pdf`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rentPage, sellPage]);

  return (
    <div className="flex h-screen bg-gray-700 overflow-hidden">
      <div className="md:sticky md:top-0 h-screen">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {open && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" onClick={() => setOpen(false)}></div>}

      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${open ? "opacity-30 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"}`}>
        <div className="md:w-full shadow-md sticky top-0 z-10 bg-white">
          <Header />
        </div>

        <div className="flex-1 px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 overflow-y-auto overflow-x-hidden space-y-6 bg-gray-100">

          {/* Rented Vehicles */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800">Rented Vehicles Payments</h2>
              <input
                type="text"
                placeholder="Search rented vehicles..."
                value={searchRent}
                onChange={(e) => {setSearchRent(e.target.value); setRentPage(1);}}
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
                  {rentCurrentItems.length > 0 ? rentCurrentItems.map((v, idx) => (
                    <tr key={v.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-2 px-3 font-medium text-blue-900">{highlightText(v.name, searchRent)}</td>
                      <td className="py-2 px-3">{highlightText(v.customerId, searchRent)}</td>
                      <td className="py-2 px-3">{highlightText(v.customer, searchRent)}</td>
                      <td className="py-2 px-3">{v.startDate}</td>
                      <td className="py-2 px-3">{v.endDate}</td>
                      <td className="py-2 px-3">₹{v.dailyRate}</td>
                      <td className="py-2 px-3">{v.rentedDays}</td>
                      <td className="py-2 px-3 font-semibold text-green-600">₹{v.revenue}</td>
                      <td className={`py-2 px-3 font-semibold ${v.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>{v.paymentStatus}</td>
                      <td className="py-2 px-2">
                        <button onClick={() => downloadPDF(v, "rent")} className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Download PDF</button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="10" className="text-center py-4 text-gray-500 italic">No rented vehicles found</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Dropdown Pagination */}
            <div className="flex justify-center items-center mt-4">
              <label htmlFor="rentPage" className="mr-2 text-sm text-gray-600">Page:</label>
              <select id="rentPage" value={rentPage} onChange={(e) => setRentPage(Number(e.target.value))}
                className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Array.from({ length: rentTotalPages }, (_, i) => (
                  <option key={i+1} value={i+1}>{i+1} / {rentTotalPages}</option>
                ))}
              </select>
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
                onChange={(e) => {setSearchSell(e.target.value); setSellPage(1);}}
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
                  {sellCurrentItems.length > 0 ? sellCurrentItems.map((v, idx) => (
                    <tr key={v.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-2 px-3 font-medium text-blue-900">{highlightText(v.name, searchSell)}</td>
                      <td className="py-2 px-3">{highlightText(v.customerId, searchSell)}</td>
                      <td className="py-2 px-3">{highlightText(v.customer, searchSell)}</td>
                      <td className="py-2 px-3">{v.soldDate}</td>
                      <td className="py-2 px-3 font-semibold text-green-600">₹{v.price}</td>
                      <td className={`py-2 px-3 font-semibold ${v.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>{v.paymentStatus}</td>
                      <td className="py-2 px-3">
                        <button onClick={() => downloadPDF(v, "sell")} className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Download PDF</button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="7" className="text-center py-4 text-gray-500 italic">No sold vehicles found</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Dropdown Pagination */}
            <div className="flex justify-center items-center mt-4">
              <label htmlFor="sellPage" className="mr-2 text-sm text-gray-600">Page:</label>
              <select id="sellPage" value={sellPage} onChange={(e) => setSellPage(Number(e.target.value))}
                className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Array.from({ length: sellTotalPages }, (_, i) => (
                  <option key={i+1} value={i+1}>{i+1} / {sellTotalPages}</option>
                ))}
              </select>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
