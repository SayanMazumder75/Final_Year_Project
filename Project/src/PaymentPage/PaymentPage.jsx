import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

// ---------------- Payment Page ----------------
export const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/User_Dashboard"); // redirect if no form data
      return;
    }

    // Trigger payment automatically
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
  if (!formData || !formData.priceRange) {
    alert("Price not provided");
    navigate("/User_Dashboard");
    return;
  }

  // Parse numeric amount safely
  const numericPrice = parseInt(formData.priceRange?.toString().replace(/[^0-9]/g, ""), 10);
if (isNaN(numericPrice) || numericPrice <= 0) {
  alert("Invalid price");
  navigate("/User_Dashboard");
  return;
}
const amount = numericPrice * 100; // convert to paise


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
        name: "Car Purchase",
        description: "Payment for Car",
        order_id,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/verifyPayment`,
            {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
            }
          );

          if (verifyRes.data.success) {
  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/buyer`, formData);

  // Navigate to PaymentSuccess with payment details
  navigate("/PaymentSuccess", {
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
export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, paymentDetails } = location.state || {};

  useEffect(() => {
    if (!formData || !paymentDetails) {
      navigate("/User_Dashboard");
      return;
    }

    // Generate PDF
    const generatePDF = () => {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Payment Receipt For Buy Car", 105, 20, null, null, "center");

      doc.setFontSize(12);
      doc.text(`Name: ${formData.name}`, 20, 40);
      doc.text(`Email: ${formData.email}`, 20, 50);
      doc.text(`Phone: ${formData.phone}`, 20, 60);
      doc.text(`Car: ${formData.car}`, 20, 70);
      doc.text(`Color: ${formData.color}`, 20, 80);
      doc.text(`Amount Paid: ₹${(paymentDetails.amount / 100).toFixed(2)}`, 20, 90);
      doc.text(`Payment ID: ${paymentDetails.payment_id}`, 20, 100);
      doc.text(`Order ID: ${paymentDetails.order_id}`, 20, 110);
      doc.text(`Date: ${new Date().toLocaleString()}`, 20, 120);

      doc.save("PaymentReceipt.pdf");
    };

    generatePDF();

    // Redirect after 3 seconds
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
