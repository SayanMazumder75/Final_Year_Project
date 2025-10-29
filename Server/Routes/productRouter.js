const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/auth");
const authOwner = require("../middleware/authOwner");
const upload = require("../middleware/upload"); // <-- Added multer middleware

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
  const { category } = req.query; // e.g., /ads?category=rental
  try {
    const ads = category ? await Ad.find({ category }) : await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = router;