import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import logo from "../images/logo.png";

// ---------------- Payment Page ----------------
export const RentPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/User_Dashboard"); // redirect if no form data
      return;
    }
    handlePayment();
  }, [formData]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!formData) {
      alert("No form data");
      navigate("/User_Dashboard");
      return;
    }

    // Safely fetch price
let amount = 0;

if (formData.price !== undefined && formData.price !== null) {
  if (typeof formData.price === "string") {
    const priceValue = formData.price.replace(/[^0-9]/g, "");
    amount = parseInt(priceValue, 10) * 100; // convert to paise
  } else if (typeof formData.price === "number") {
    amount = formData.price * 100; // already a number, just convert to paise
  }
}

if (isNaN(amount) || amount <= 0) {
  alert("Invalid price");
  return;
}

    if (isNaN(amount) || amount <= 0) {
      alert("Invalid price");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res || !window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/createOrder`,
        { amount }
      );

      const { id: order_id, amount: order_amount, currency } = data;

      const options = {
        key: "rzp_test_RW7wgNGNIsR71o",
        amount: order_amount,
        currency,
        name: "Car Rental",
        description: `Payment for ${formData.car}`,
        order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/verifyPayment`,
            {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
            }
          );

          if (verifyRes.data.success) {
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/rental`,
              formData
            );

            navigate("/RentPaymentSuccess", {
              state: {
                formData,
                paymentDetails: {
                  amount: order_amount,
                  payment_id: razorpay_payment_id,
                  order_id: razorpay_order_id,
                },
              },
            });
          } else alert("Payment verification failed");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Redirecting to Payment...</h2>
      {loading && <p>Processing payment...</p>}
    </div>
  );
};

// ---------------- Payment Success + PDF ----------------
export const RentPaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, paymentDetails } = location.state || {};

  useEffect(() => {
    if (!formData || !paymentDetails) {
      navigate("/User_Dashboard");
      return;
    }

   const generatePDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  /* ================= PAGE BACKGROUND ================= */
  doc.setFillColor(15, 23, 42); // slate dark blue
  doc.rect(0, 0, 210, 297, "F");

  /* ================= LOGO ================= */
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    doc.addImage(img, "PNG", 20, 18, 35, 18);

    /* ================= HEADER ================= */
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("PAYMENT RECEIPT", 160, 30, null, null, "right");

    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      160,
      36,
      null,
      null,
      "right"
    );

    /* ================= MAIN CONTAINER ================= */
    doc.setFillColor(30, 41, 59); // card background
    doc.roundedRect(15, 50, 180, 200, 8, 8, "F");

    /* ================= CUSTOMER ================= */
    doc.setFontSize(13);
    doc.setTextColor(56, 189, 248); // cyan
    doc.text("BILLED TO", 25, 70);

    doc.setFontSize(11);
    doc.setTextColor(235, 235, 235);
    doc.text(`Name: ${formData.name}`, 25, 80);
    doc.text(`Email: ${formData.email}`, 25, 88);
    doc.text(`Phone: ${formData.phone}`, 25, 96);

    /* ================= RENT DETAILS ================= */
    doc.setDrawColor(71, 85, 105);
    doc.line(25, 105, 185, 105);

    doc.setFontSize(13);
    doc.setTextColor(56, 189, 248);
    doc.text("RENT DETAILS", 25, 120);

    doc.setFontSize(11);
    doc.setTextColor(235, 235, 235);
    doc.text(`Car: ${formData.car}`, 25, 130);
    doc.text(`Pickup Date: ${formData.pickupDate}`, 25, 138);

    /* ================= PAYMENT SUMMARY ================= */
    doc.setDrawColor(71, 85, 105);
    doc.line(25, 148, 185, 148);

    doc.setFontSize(13);
    doc.setTextColor(56, 189, 248);
    doc.text("PAYMENT SUMMARY", 25, 163);

    doc.setFontSize(11);
    doc.setTextColor(235, 235, 235);
    doc.text(
      `Total Paid: ₹${(paymentDetails.amount / 100).toFixed(2)}`,
      25,
      173
    );
    doc.text(`Payment ID: ${paymentDetails.payment_id}`, 25, 181);
    doc.text(`Order ID: ${paymentDetails.order_id}`, 25, 189);

    /* ================= STATUS BADGE ================= */
    doc.setFillColor(34, 197, 94); // green
    doc.roundedRect(130, 165, 50, 16, 6, 6, "F");

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("PAID", 155, 176, null, null, "center");

    /* ================= FOOTER ================= */
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(
      "This is a system-generated receipt and does not require a signature.",
      105,
      265,
      null,
      null,
      "center"
    );

    doc.text(
      "Thank you for choosing our Car Rental Service.",
      105,
      272,
      null,
      null,
      "center"
    );

    doc.save("Payment_Receipt.pdf");
  };
};



    generatePDF();

    const timer = setTimeout(() => {
      navigate("/User_Dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, paymentDetails, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-800">
      <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
      <p className="mb-6">Your receipt is being downloaded...</p>
      <p>Redirecting to dashboard...</p>
    </div>
  );
};
