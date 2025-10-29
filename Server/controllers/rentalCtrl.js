// controllers/rentalCtrl.js
const Rental = require("../models/rentalModel");
const Ad = require("../models/productModel");

exports.createRental = async (req, res) => {
  try {
    console.log("📥 Received rental data:", req.body);

    // ✅ FIX: use adTitle instead of title
    const ad = await Ad.findOne({ adTitle: req.body.car });

    if (!ad) {
      console.warn("⚠️ No matching ad found for car:", req.body.car);
    }

    const rental = new Rental({
      ...req.body,
      ownerEmail: ad ? ad.Email || ad.ownerEmail || ad.email : req.body.ownerEmail, // fallback to frontend
    });

    await rental.save();

    res.status(201).json({
      success: true,
      message: "Rental booking created successfully",
      rental,
    });
  } catch (error) {
    console.error("❌ Rental creation failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//get all rentals

exports.getAllRentals = async (req,res) =>{
    try{
        const rentals = await Rental.find();
        res.status(200).json({success: true, rentals});
    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

//get by id

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({success: false, message: "Rental not found" });
    res.status(200).json({ success: true, rental });
  } catch(error){
    res.status(500).json({success:false, message: error.message});
  }
};

//delete by id
exports.deleteRental = async (req,res) =>{
    try{
        const rental = await Rental.findByIdAndDelete(req.params.id);
        if(!rental) return res.status(404).json({ success: false, message: "Rental not found" });
        res.status(200).json({ success: true, message: "Rental deleted successfully" });

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};

