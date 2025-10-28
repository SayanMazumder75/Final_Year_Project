const Ad = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CREATE AD
exports.createAd = async (req, res) => {
  try {
    const imageUrls = [];

    // Upload each image to Cloudinary
    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "ads",
      });
      imageUrls.push(uploadResult.secure_url);
    }

    // Create new ad
    const adData = {
      ...req.body,
      photos: imageUrls,
      user: req.user.id, // owner from auth middleware
    };

    const newAd = new Ad(adData);
    await newAd.save();

    res.status(201).json({ message: "Ad posted successfully", ad: newAd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ADS
exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("owner", "name email");
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE AD
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("owner", "name email");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE AD
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!ad)
      return res.status(404).json({ message: "Ad not found or unauthorized" });
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
