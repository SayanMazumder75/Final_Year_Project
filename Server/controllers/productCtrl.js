// controllers/productCtrl.js
const Ad = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// -----------------------------
// CREATE AD
// -----------------------------
exports.createAd = async (req, res) => {
  try {
    console.log("[createAd] Body:", req.body);
    console.log("[createAd] Files:", req.files);

    // Required fields validation
    const requiredFields = [
      "brand",
      "year",
      "fuel",
      "transmission",
      "owners",
      "title",
      "description",
      "price",
      "state",
      "phone",
    ];
    const missingFields = requiredFields.filter((f) => !req.body[f]);
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ message: `Missing required fields: ${missingFields.join(", ")}` });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "ads" });
        imageUrls.push(result.secure_url);

        // Remove temp file
        fs.unlinkSync(file.path);
      }
    }

    // Map frontend fields to schema
    const adData = {
      email: req.body.email,
      user: req.user.id, // from auth middleware
      brand: req.body.brand,
      year: Number(req.body.year),
      fuel: req.body.fuel,
      transmission: req.body.transmission,
      kmsDriven: Number(req.body.kmsDriven || 0),
      noOfOwners: req.body.owners,
      adTitle: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      state: req.body.state,
      mobilePhone: req.body.phone,
      photos: imageUrls,
      adType: req.body.adType,
    };

    // Save Ad
    const newAd = new Ad(adData);
    await newAd.save();

    res.status(201).json({ message: "Ad posted successfully", ad: newAd });
  } catch (err) {
    console.error("[createAd] Error:", err.stack);
    res.status(500).json({ message: err.message });
  }
};

// -----------------------------
// GET ALL ADS
// -----------------------------
exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("user", "name email");
    res.json(ads);
  } catch (error) {
    console.error("[getAds] Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------
// GET SINGLE AD
// -----------------------------
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("user", "name email");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    console.error("[getAdById] Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------
// DELETE AD
// -----------------------------
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!ad)
      return res.status(404).json({ message: "Ad not found or unauthorized" });
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error("[deleteAd] Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------
// GET ADS BY CATEGORY
// -----------------------------
exports.getAdsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const ads = category ? await Ad.find({ category }) : await Ad.find();
    res.json(ads);
  } catch (err) {
    console.error("[getAdsByCategory] Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
