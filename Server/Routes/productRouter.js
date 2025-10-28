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

// Get single ad
router.get("/:id", productCtrl.getAdById);

// Delete ad (only owner)
router.delete("/:id", auth, authOwner, productCtrl.deleteAd);

module.exports = router;
