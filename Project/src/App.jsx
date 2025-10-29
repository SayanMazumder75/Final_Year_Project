import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import CarBookingForm from "./User_Dashboard/CarBookingForm";
import CarBuyForm from "./User_Dashboard/CurBuyForm";
import Homepage from './Homepage/Homepage';
import Dashboard from "./Admin_Panel/Dashboard";
import Profile from "./Admin_Panel/Profile";
import Setting from "./Admin_Panel/Setting";
import Users from "./Admin_Panel/Users";
import Sell_Vehicles from "./Admin_Panel/Sell_Vehicles";
import Rental_Vehicles from "./Admin_Panel/Rental_Vehicles";
import Payments from "./Admin_Panel/Payments";
import User_Dashboard from "./User_Dashboard/User_Dashboard";
import Signup from "./Login_Signup/Signup";
import Login from "./Login_Signup/Login";
import Preloader from "./Preloader";
import AdminSignup from "./Login_Signup/AdminSignup";
import AdminLogin from "./Login_Signup/AdminLogin";
import PostAd from "./Admin_Panel/PostAd";
import Wishlist from "./User_Dashboard/Wishlist";
import Car1 from "./Pages/car1";
import Car2 from "./Pages/car2";
import Car3 from "./Pages/car3";
import Car4 from "./Pages/car4";
import Car5 from "./Pages/car5";
import WebOwnerLogin from "./Login_Signup/WebOwnerLogin";
import WebOwnerDashboard from "./Admin_Control/WebOwnerDashboard";
import AfterLogin from "./User_Dashboard/AfterLogin";
import Buy from "./User_Dashboard/Buy";
import Rent from "./User_Dashboard/Rent";
import { PaymentPage, PaymentSuccess } from './PaymentPage/PaymentPage'; 
import { RentPaymentPage, RentPaymentSuccess } from "./PaymentPage/RentPaymentPage";

// Import chatbot images
import sendIcon from "./assets/send-icon.png";
import liveChatIcon from "./assets/live-chat.png";

// Import Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [loading, setLoading] = useState(true);
  
  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Gemini AI Setup
  const API_KEY = "AIzaSyB6WUi5ZR7kXHwOhPECpAqNvseGInoCiZk"; // Your API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Car database with specifications
  const carDatabase = {
    // Cars for Sale
    "mahindra scorpio": {
      name: "Mahindra Scorpio S11",
      type: "sale",
      price: "₹50,000",
      available: "3 units",
      category: "SUV",
      specs: {
        engine: "2.2L mHawk Diesel",
        power: "120 kW (160 bhp)",
        torque: "400 Nm",
        transmission: "6-Speed Manual",
        seating: "7 Seater",
        fuel: "Diesel",
        features: "Touchscreen Infotainment, Sunroof, Leather Seats, ABS, Airbags"
      }
    },
    "bmw basic": {
      name: "BMW Basic Model",
      type: "sale", 
      price: "₹20,000",
      available: "2 units",
      category: "Sedan",
      specs: {
        engine: "2.0L Turbo Petrol",
        power: "135 kW (181 bhp)",
        torque: "290 Nm", 
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuel: "Petrol",
        features: "LED Headlights, Premium Audio, Climate Control, Parking Sensors"
      }
    },
    "bmw luxury": {
      name: "BMW Luxury Edition",
      type: "sale",
      price: "₹30,000", 
      available: "1 unit",
      category: "Sedan",
      specs: {
        engine: "3.0L Turbo Petrol",
        power: "250 kW (335 bhp)",
        torque: "450 Nm",
        transmission: "8-Speed Sport Automatic",
        seating: "5 Seater",
        fuel: "Petrol", 
        features: "Full Leather, Panoramic Sunroof, Harman Kardon Sound, Adaptive Cruise Control"
      }
    },

    // Cars for Rent
    "porsche": {
      name: "Porsche 911",
      type: "rent",
      price: "₹20,000/day",
      available: "Limited",
      category: "Sports Car",
      specs: {
        engine: "3.0L Twin-Turbo Flat-6",
        power: "283 kW (379 bhp)",
        torque: "450 Nm",
        transmission: "8-Speed PDK Automatic",
        seating: "4 Seater",
        fuel: "Petrol",
        features: "Sport Chrono Package, Active Suspension, Premium Sound, Launch Control"
      }
    },
    "mahindra thar": {
      name: "Mahindra Thar",
      type: "rent",
      price: "₹10,000/day", 
      available: "Moderate",
      category: "Off-road SUV",
      specs: {
        engine: "2.2L mHawk Diesel",
        power: "97 kW (130 bhp)",
        torque: "300 Nm",
        transmission: "6-Speed Manual/6-Speed Automatic",
        seating: "4 Seater", 
        fuel: "Diesel",
        features: "4WD, Convertible Top, Touchscreen, Rear Parking Camera"
      }
    },
    "tata nano": {
      name: "Tata Nano",
      type: "rent",
      price: "₹1,000/day",
      available: "High", 
      category: "Compact Car",
      specs: {
        engine: "0.6L MPFI Petrol",
        power: "26 kW (35 bhp)",
        torque: "51 Nm",
        transmission: "4-Speed Manual",
        seating: "4 Seater",
        fuel: "Petrol",
        features: "Compact Design, Fuel Efficient, Easy Parking, Low Maintenance"
      }
    },
    "lightning mcqueen": {
      name: "Lightning McQueen",
      type: "rent", 
      price: "₹4,000/day",
      available: "Moderate",
      category: "Special Edition",
      specs: {
        engine: "V8 Racing Engine",
        power: "750 bhp (estimated)",
        torque: "High Performance",
        transmission: "Racing Sequential",
        seating: "1 Seater",
        fuel: "Racing Fuel",
        features: "Custom Paint Job, Racing Decals, High Speed, Animated Character"
      }
    },
    "maruti omni": {
      name: "Maruti Omni",
      type: "rent",
      price: "₹59,998/day",
      available: "Good",
      category: "MPV / Utility Vehicle",
      specs: {
        engine: "0.8L MPFI Petrol",
        power: "26.2 kW (35 bhp)",
        torque: "59 Nm",
        transmission: "4-Speed Manual",
        seating: "8 Seater",
        fuel: "Petrol",
        features: "Spacious Interior, Low Running Cost, Easy to Drive, Great for Large Groups"
      }
    }
  };

  // Contact Information
  const contactInfo = {
    email: "support@carrental.com",
    phone: "+91 98765 43210",
    businessName: "Keys to Freedom"
  };

  // Gemini AI Model with car knowledge and contact info
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are CarBot, the car expert assistant for "Keys to Freedom" car dealership and rental service.
    
    CAR DATABASE INFORMATION:
    ${JSON.stringify(carDatabase, null, 2)}
    
    CONTACT INFORMATION:
    - Email: ${contactInfo.email}
    - Phone: ${contactInfo.phone}
    - Business Name: ${contactInfo.businessName}
    
    YOUR ROLE:
    - You are a knowledgeable car expert
    - You answer questions about cars AND can provide contact information
    - You have access to the car database above for accurate information
    - You provide detailed specifications, prices, and availability
    - You are polite and helpful
    
    TOPICS YOU CAN DISCUSS:
    ✅ Car specifications (engine, power, torque, transmission, etc.)
    ✅ Car prices and availability
    ✅ Car features and options
    ✅ Comparison between different cars
    ✅ Car maintenance tips (basic)
    ✅ Automotive technology
    ✅ Buying vs renting considerations
    ✅ Contact information for the dealership
    ✅ Business inquiries
    
    CONTACT RESPONSES:
    - If someone asks for contact info, provide: "Email: ${contactInfo.email} | Phone: ${contactInfo.phone}"
    - If someone wants to reach the business: "You can contact Keys to Freedom at ${contactInfo.email} or call ${contactInfo.phone}"
    - For support: "For support, email us at ${contactInfo.email} or call ${contactInfo.phone}"
    
    TOPICS YOU CANNOT DISCUSS:
    ❌ Personal information
    ❌ Politics, religion, or sensitive topics
    ❌ Other unrelated businesses
    
    If asked about completely unrelated topics, politely respond: "I'm CarBot, and I specialize in car information and Keys to Freedom dealership services. I can help you with car specifications, prices, or contact information. How can I assist you today?"
    
    Always use the car database for accurate information about Keys to Freedom's inventory.
    Always provide contact information when asked about support, contact, or business inquiries.
    `
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ESC key to close chat
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isChatOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Find car in database
  const findCar = (carName) => {
    const lowerName = carName.toLowerCase();
    for (const [key, car] of Object.entries(carDatabase)) {
      if (lowerName.includes(key) || car.name.toLowerCase().includes(lowerName)) {
        return car;
      }
    }
    return null;
  };

  // Send message function with Gemini AI
  const handleSendMessage = async (message = null) => {
    const messageToSend = message || inputMessage;
    
    if (!messageToSend.trim()) return;

    if (!message) {
      setInputMessage('');
    }
    
    setMessages(prev => [...prev, { type: 'user', content: messageToSend }]);
    setIsTyping(true);

    try {
      // Use Gemini AI for responses
      const chatSession = model.startChat({
        history: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      });

      const result = await chatSession.sendMessage(messageToSend);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { type: 'model', content: text }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      // Fallback to car database and contact responses if API fails
      const car = findCar(messageToSend.toLowerCase());
      const lowerMessage = messageToSend.toLowerCase();
      
      if (car) {
        const fallbackResponse = `**${car.name}**\n\n💰 **Price:** ${car.price}\n📦 **Availability:** ${car.available}\n🏷️ **Type:** ${car.type === 'sale' ? 'For Sale' : 'For Rent'}\n\n**Specifications:**\n⚙️ **Engine:** ${car.specs.engine}\n💨 **Power:** ${car.specs.power}\n🔧 **Torque:** ${car.specs.torque}\n🚀 **Transmission:** ${car.specs.transmission}\n👥 **Seating:** ${car.specs.seating}\n⛽ **Fuel:** ${car.specs.fuel}\n\n**Features:**\n${car.specs.features}`;
        setMessages(prev => [...prev, { type: 'model', content: fallbackResponse }]);
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('support') || lowerMessage.includes('call')) {
        const contactResponse = `**Contact Keys to Freedom**\n\n📧 **Email:** ${contactInfo.email}\n📞 **Phone:** ${contactInfo.phone}\n\nFeel free to reach out to us for any inquiries about our cars or services!`;
        setMessages(prev => [...prev, { type: 'model', content: contactResponse }]);
      } else if (lowerMessage.includes('sale') || lowerMessage.includes('selling')) {
        const saleCars = Object.values(carDatabase).filter(car => car.type === 'sale');
        let response = "**🚘 Cars for Sale:**\n\n";
        saleCars.forEach(car => {
          response += `**${car.name}**\n- Price: ${car.price}\n- Available: ${car.available}\n- Category: ${car.category}\n\n`;
        });
        setMessages(prev => [...prev, { type: 'model', content: response }]);
      } else if (lowerMessage.includes('rent')) {
        const rentCars = Object.values(carDatabase).filter(car => car.type === 'rent');
        let response = "**🚗 Cars for Rent:**\n\n";
        rentCars.forEach(car => {
          response += `**${car.name}**\n- Price: ${car.price}\n- Availability: ${car.available}\n- Category: ${car.category}\n\n`;
        });
        setMessages(prev => [...prev, { type: 'model', content: response }]);
      } else {
        setMessages(prev => [...prev, { type: 'model', content: `I'm CarBot from **Keys to Freedom**! I can help you with:\n\n• Car specifications and prices\n• Cars for sale and rent\n• Contact information\n\n**Contact Us:**\n📧 Email: ${contactInfo.email}\n📞 Phone: ${contactInfo.phone}\n\nHow can I assist you today?` }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestion = (question) => {
    handleSendMessage(question);
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Convert markdown to HTML
  const convertMarkdownToHtml = (text) => {
    if (!text) return '';
    let html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
    return html;
  };

  return (
    <>
      <Preloader loading={loading} />

      {/* Show routes only after preloader is done */}
      {!loading && (
        <>
          <Routes>
            {/* Homepage route */}
            <Route path="/" element={<Homepage />} />
            <Route path="/booking" element={<CarBookingForm />} />
            <Route path="/buying" element={<CarBuyForm />} />

            {/* Car detail routes */}
            <Route path="/car/1" element={<Car1 />} />
            <Route path="/car/2" element={<Car2 />} />
            <Route path="/car/3" element={<Car3 />} />
            <Route path="/car/4" element={<Car4 />} />
            <Route path="/car/5" element={<Car5 />} />

            {/* Admin Panel routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Sell_Vehicles" element={<Sell_Vehicles />} />
            <Route path="/Rental_Vehicles" element={<Rental_Vehicles />} />
            <Route path="/Payments" element={<Payments />} />

            {/* Web_Admin_Control */}
            <Route path="/WebOwnerDashboard" element={<WebOwnerDashboard />} />

            {/* User Dashboard routes */}
            <Route path="/User_Dashboard" element={<User_Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/AfterLogin" element={<AfterLogin />} />
            <Route path="/Buy" element={<Buy />} />
            <Route path="/Rent" element={<Rent />} />
            
            {/* Authentication routes */}
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/PostAd" element={<PostAd />} />
            <Route path="/WebOwnerLogin" element={<WebOwnerLogin />} />
            
            {/* Payment routes */}
            <Route path="/PaymentPage" element={<PaymentPage />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/RentPaymentSuccess" element={<RentPaymentSuccess />} />
            <Route path="/RentPaymentPage" element={<RentPaymentPage />} />
          </Routes>

          {/* CHATBOT - Shows on all pages */}
          {isChatOpen && (
            <section className="chat-window" style={{display: 'flex'}}>
              <div className="chat-header">
                <h3>CarBot Assistant</h3>
                <button className="close" onClick={() => setIsChatOpen(false)}>×</button>
              </div>

              <div className="chat">
                {/* Welcome message */}
                {messages.length === 0 && (
                  <div className="model">
                    <p>👋 Welcome to <strong>Keys to Freedom</strong>!<br />Your AI car expert is here to help!</p>
                    <div className="suggestions">
                      <button className="suggest-btn" onClick={() => quickQuestion("Cars for sale")}>
                        🚘 Cars for Sale
                      </button>
                      <button className="suggest-btn" onClick={() => quickQuestion("Cars for rent")}>
                        🚗 Cars for Rent
                      </button>
                      <button className="suggest-btn" onClick={() => quickQuestion("Contact information")}>
                        📞 Contact Info
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Chat messages */}
                {messages.map((msg, index) => (
                  <div key={index} className={msg.type}>
                    <p dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(msg.content) }} />
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && <div className="loader">CarBot is typing...</div>}
                <div ref={chatEndRef} />
              </div>

              <div className="input-area">
                <input 
                  placeholder="Ask about cars, contact info, or specifications..." 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text" 
                />
                <button onClick={() => handleSendMessage()}>
                  <img src={sendIcon} alt="send" />
                </button>
              </div>
            </section>
          )}

          {/* FLOATING CHAT BUTTON - Shows on all pages */}
          <div className="chat-button" onClick={toggleChat}>
            <img src={liveChatIcon} alt="start chat" />
          </div>
        </>
      )}
    </>
  );
}

export default App;