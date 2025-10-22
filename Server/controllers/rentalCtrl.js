const Rental = require("../models/rentalModel");

//create new rental
exports.createRental = async (req,res) =>{
    try{
        const rental = new Rental(req.body);
        await rental.save();
        res.status(201).json({
            success: true,
            message: "Rental booking created successfully",
            rental,
        })
    } catch(eroor){
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

