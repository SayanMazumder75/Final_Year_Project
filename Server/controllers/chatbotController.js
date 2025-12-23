const Ad = require("../models/productModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handleChatbotQuery = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.json({ reply: "👋 **Welcome to Keys to Freedom!** How can I assist your car search today?" });
    }

    const cleanMsg = message.toLowerCase().trim();

    // --- 1. PROFESSIONAL COMPARISON LOGIC ---
    if (/compare/i.test(cleanMsg)) {
      const namesOnly = cleanMsg.replace(/compare|between/gi, "").trim();
      const parts = namesOnly.split(/and|vs|with/i).map(p => p.trim()).filter(p => p.length > 1);

      if (parts.length >= 2) {
        const car1 = await Ad.findOne({
          $or: [{ brand: { $regex: parts[0], $options: "i" } }, { adTitle: { $regex: parts[0], $options: "i" } }]
        }).lean();

        const car2 = await Ad.findOne({
          $or: [{ brand: { $regex: parts[1], $options: "i" } }, { adTitle: { $regex: parts[1], $options: "i" } }]
        }).lean();

        if (car1 && car2) {
          return res.json({
            reply: `📊 **Vehicle Comparison Report**\n` +
                   `━━━━━━━━━━━━━━━━━━\n` +
                   `🚘 **Model:** ${car1.brand} **VS** ${car2.brand}\n` +
                   `💰 **Price:** ₹${car1.price.toLocaleString()} | ₹${car2.price.toLocaleString()}\n` +
                   `⛽ **Fuel:** ${car1.fuel} | ${car2.fuel}\n` +
                   `⚙️ **Gearbox:** ${car1.transmission} | ${car2.transmission}\n` +
                   `📏 **Mileage:** ${car1.kmsDriven.toLocaleString()} km | ${car2.kmsDriven.toLocaleString()} km\n` +
                   `👥 **Owners:** ${car1.noOfOwners} | ${car2.noOfOwners}\n` +
                   `━━━━━━━━━━━━━━━━━━`
          });
        } else {
          const missing = !car1 ? parts[0] : parts[1];
          return res.json({ reply: `⚠️ **Search Error:** I found one vehicle but couldn't locate data for "${missing}". Please verify the model name.` });
        }
      }
    }

    // --- 2. PROFESSIONAL CAR DETAILS ---
    if (/details|specs|tell me|show|about|info/i.test(cleanMsg)) {
      const carName = cleanMsg
        .replace(/(show full details of|show details of|details of|tell me about|specs of|show|details|about|info|the|car|between)/gi, "")
        .trim();

      if (carName.length > 1) {
        const car = await Ad.findOne({
          $or: [{ brand: { $regex: carName, $options: "i" } }, { adTitle: { $regex: carName, $options: "i" } }]
        }).lean();

        if (car) {
          return res.json({
            reply: `📝 **Vehicle Specifications: ${car.brand}**\n` +
                   `━━━━━━━━━━━━━━━━━━\n` +
                   `🏷️ **Title:** ${car.adTitle}\n` +
                   `💰 **Price:** ₹${car.price ? car.price.toLocaleString() : "Contact for Price"}\n\n` +
                   `📅 **Year:** ${car.year}\n` +
                   `⛽ **Fuel Type:** ${car.fuel}\n` +
                   `⚙️ **Transmission:** ${car.transmission}\n` +
                   `📏 **KMs Driven:** ${car.kmsDriven ? car.kmsDriven.toLocaleString() : "0"} km\n` +
                   `👥 **Ownership:** ${car.noOfOwners}\n\n` +
                   `📍 **Location:** ${car.state}\n` +
                   `📞 **Contact:** ${car.mobilePhone}\n` +
                   `━━━━━━━━━━━━━━━━━━\n` +
                   `📖 **Description:** ${car.description || "No further details provided."}`
          });
        }
      }
    }

    // --- 3. PROFESSIONAL LISTINGS ---
    if (/sale|buy|rent/i.test(cleanMsg)) {
      const isRent = /rent/i.test(cleanMsg);
      const cars = await Ad.find({ adType: isRent ? /rent/i : /sell/i }).limit(5).lean();
      
      if (cars.length > 0) {
        const header = isRent ? "🚕 **Available for Rent**" : "🚗 **Available for Sale**";
        const list = cars.map((c) => `🔹 **${c.brand}** - ${c.adTitle} (₹${c.price.toLocaleString()})`).join("\n");
        return res.json({ reply: `${header}\n━━━━━━━━━━━━━━━━━━\n${list}\n\n💡 *Type a car name to see full details!*` });
      }
      return res.json({ reply: "ℹ️ Currently, we have no vehicles matching this request. Please check back later." });
    }

    // --- 4. PROFESSIONAL CONTACT ---
    if (/contact|phone|email|location/i.test(cleanMsg)) {
      return res.json({
        reply: `🏢 **Keys to Freedom Support**\n` +
               `━━━━━━━━━━━━━━━━━━\n` +
               `📧 **Email:** support@keystofreedom.com\n` +
               `📱 **Phone:** +91 98765 43210\n` +
               `📍 **Office:** Siliguri, West Bengal\n` +
               `⏰ **Hours:** Mon-Sat (10 AM - 8 PM)`
      });
    }

    // --- 5. AI FALLBACK ---
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const result = await model.generateContent(`Context: You are CarBot for Keys to Freedom. Use professional tone. User: ${message}`);
      return res.json({ reply: result.response.text() });
    } catch (apiError) {
      return res.json({
        reply: `🤖 **CarBot Assistant**\n` +
               `━━━━━━━━━━━━━━━━━━\n` +
               `I can help you with:\n` +
               `✅ Browsing **Cars for Sale**\n` +
               `✅ Checking **Cars for Rent**\n` +
               `✅ **Comparing** two vehicles\n` +
               `✅ Detailed **Specifications**`
      });
    }

  } catch (error) {
    console.error("🔥 Error:", error.message);
    return res.status(500).json({ reply: "⚠️ **System Update:** Our engine is under maintenance. Please try again in a moment." });
  }
};