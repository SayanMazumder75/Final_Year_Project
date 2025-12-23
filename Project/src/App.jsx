import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import CarBookingForm from "./User_Dashboard/CarBookingForm";
import CarBuyForm from "./User_Dashboard/CurBuyForm";
import Homepage from "./Homepage/Homepage";
import Dashboard from "./Admin_Panel/Dashboard";
import Profile from "./Admin_Panel/Profile";
import Users from "./Admin_Panel/Users";
import Sell_Vehicles from "./Admin_Panel/Sell_Vehicles";
import Rental_Vehicles from "./Admin_Panel/Rental_Vehicles";
import User_Dashboard from "./User_Dashboard/User_Dashboard";
import Signup from "./Login_Signup/Signup";
import Login from "./Login_Signup/Login";
import Preloader from "./Preloader";
import AdminSignup from "./Login_Signup/AdminSignup";
import AdminLogin from "./Login_Signup/AdminLogin";
import PostAd from "./Admin_Panel/PostAd";
import WebOwnerLogin from "./Login_Signup/WebOwnerLogin";
import WebOwnerDashboard from "./Admin_Control/WebOwnerDashboard";
import AfterLogin from "./User_Dashboard/AfterLogin";
import Buy from "./User_Dashboard/Buy";
import Rent from "./User_Dashboard/Rent";
import { PaymentPage, PaymentSuccess } from "./PaymentPage/PaymentPage";
import { RentPaymentPage, RentPaymentSuccess } from "./PaymentPage/RentPaymentPage";
import BuyDetails from "./Pages/BuyDetails";
import Details from "./Pages/Details";
import RentDetails from "./Pages/RentDetails";

import sendIcon from "./assets/send-icon.png";
import liveChatIcon from "./assets/live-chat.png";

const CHATBOT_API = "http://localhost:5000/api/chatbot/";

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickOptions = [
    { label: "🚗 Cars for Sale", message: "Show cars available for sale" },
    { label: "🚕 Cars for Rent", message: "Show cars available for rent" },
    { label: "📞 Contact Info", message: "Show contact information" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (message = null) => {
    const text = message || inputMessage;
    if (!text.trim() || isTyping) return;

    setInputMessage("");
    setMessages((prev) => [...prev, { type: "user", content: text }]);
    setIsTyping(true);

    try {
      const res = await axios.post(CHATBOT_API, { message: text });
      setMessages((prev) => [
        ...prev,
        { type: "model", content: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "model", content: "⚠️ Service unavailable. Try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const convertMarkdownToHtml = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  };

  /* =======================
      NEW: CLICKABLE CAR LIST
     ======================= */
  const renderBotMessage = (text) => {
  if (!text) return null;

  // Handle cars for sale (🚗) and cars for rent (🚕)
  if (text.includes("🚗") || text.includes("🚕")) {
    const lines = text.split("\n").filter(Boolean);

    return (
      <div className="car-list">
        {lines.map((line, i) => {
          // Determine the icon and clean name
          const isSale = line.includes("🚗");
          const isRent = line.includes("🚕");

          if (!isSale && !isRent) {
            // If some extra text line, just show it
            return (
              <p key={i}>{line}</p>
            );
          }

          const carName = line.replace("🚗", "").replace("🚕", "").trim();

          return (
            <button
              key={i}
              className="car-item"
              onClick={() =>
                handleSendMessage(
                  `Show full details of ${carName}`
                )
              }
            >
              {line}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: normal text
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: convertMarkdownToHtml(text),
      }}
    />
  );
};


  return (
    <>
      <Preloader loading={loading} />

      {!loading && (
        <>
          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/booking" element={<CarBookingForm />} />
            <Route path="/buying" element={<CarBuyForm />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Sell_Vehicles" element={<Sell_Vehicles />} />
            <Route path="/Rental_Vehicles" element={<Rental_Vehicles />} />
            <Route path="/WebOwnerDashboard" element={<WebOwnerDashboard />} />
            <Route path="/User_Dashboard" element={<User_Dashboard />} />
            <Route path="/AfterLogin" element={<AfterLogin />} />
            <Route path="/Buy" element={<Buy />} />
            <Route path="/Rent" element={<Rent />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/PostAd" element={<PostAd />} />
            <Route path="/WebOwnerLogin" element={<WebOwnerLogin />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/BuyDetails" element={<BuyDetails />} />
            <Route path="/rentdetails" element={<RentDetails />} />
            <Route path="/PaymentPage" element={<PaymentPage />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/RentPaymentSuccess" element={<RentPaymentSuccess />} />
            <Route path="/RentPaymentPage" element={<RentPaymentPage />} />
          </Routes>

          {/* CHATBOT */}
          {isChatOpen && (
            <section className="chat-window" style={{ display: "flex" }}>
              <div className="chat-header">
                <h3>CarBot Assistant</h3>
                <button onClick={() => setIsChatOpen(false)}>×</button>
              </div>

              <div className="chat">
                {messages.length === 0 && (
                  <div className="welcome-container">
                    <div className="welcome-card">
                      <p>
                        👋 <strong>Welcome to Keys to Freedom!</strong>
                        <br />
                        Your AI car expert is here to help!
                      </p>
                    </div>

                    <div className="quick-options">
                      {quickOptions.map((opt, i) => (
                        <button
                          key={i}
                          className="quick-btn"
                          onClick={() => handleSendMessage(opt.message)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={msg.type}>
                    {msg.type === "model"
                      ? renderBotMessage(msg.content)
                      : (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: convertMarkdownToHtml(msg.content),
                          }}
                        />
                      )}
                  </div>
                ))}

                {isTyping && <div className="loader">CarBot is thinking...</div>}
                <div ref={chatEndRef} />
              </div>

              <div className="input-area">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendMessage()
                  }
                  placeholder="Ask about cars, contact info, or specs"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                >
                  <img src={sendIcon} alt="send" />
                </button>
              </div>
            </section>
          )}

          <div
            className="chat-button"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <img src={liveChatIcon} alt="chat" />
          </div>
        </>
      )}
    </>
  );
}

export default App;
