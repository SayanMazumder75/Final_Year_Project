const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/auth");
const authOwner = require("../middleware/authOwner");
const upload = require("../middleware/upload");

// Get all ads
router.get("/get", productCtrl.getAds);

// Create new ad (with images)
router.post(
  "/create",
  auth,
  authOwner,
  upload.array("images", 20), // up to 20 images
  productCtrl.createAd
);

// Get ads by category
router.get("/", productCtrl.getAdsByCategory);


// Delete ad (only owner)
router.delete("/:id", auth, authOwner, productCtrl.deleteAd);
exports.getAdsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const ads = category ? await Ad.find({ category }) : await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/productCtrl.js
const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// CREATE AD
exports.createAd = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Files uploaded:", req.files);

    const {
      email,
      brand,
      year,
      fuel,
      transmission,
      kmsDriven,
      owners,
      title,
      description,
      price,
      state,
      phone,
      adType,
    } = req.body;

    // Validation
    if (!brand || !year || !fuel || !transmission || !title || !description || !price || !state || !phone || !adType) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "ads",
        });
        imageUrls.push(result.secure_url);

        // Remove temp file
        fs.unlinkSync(file.path);
      }
    }

    // Create product
    const newProduct = new Product({
      email,
      brand,
      year,
      fuel,
      transmission,
      kmsDriven,
      owners,
      title,
      description,
      price,
      state,
      phone,
      adType,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating ad:", err);
    res.status(500).json({ message: err.message });
  }
};
// Get ads for logged-in owner (exclude images)
router.get("/my-ads", auth, authOwner, async (req, res) => {
  try {
    // req.user.email comes from auth middleware (JWT decoded)
    const ownerEmail = req.user.email;

    const ads = await Product.find({ email: ownerEmail })
      .select("-images") // exclude images array
      .sort({ createdAt: -1 }); 
    res.json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;