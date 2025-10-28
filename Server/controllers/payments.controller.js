const { createRazorpayInstance } = require("../config/razorpay.config");
const crypto = require("crypto");
require("dotenv").config();

const razorpayInstance = createRazorpayInstance();

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ success: false, message: "Amount required" });

    const order = await razorpayInstance.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_order_1",
    });

    console.log("Razorpay order created:", order);
    return res.status(200).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    return res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    return res.status(400).json({ success: false, message: "Payment not verified" });
  }
};
