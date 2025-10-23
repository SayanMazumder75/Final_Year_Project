const Buyer = require("../models/buyModel");

//create new Buyer
exports.createBuyer = async (req,res) =>{
    try {
        const buyer = new Buyer(req.body);
        await buyer.save();
        res.status(201).json({
            success: true,
            message: "Buyer booking created successfully",
            buyer,
        })
    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};

//get all buyers

exports.getAllBuyers = async (req,res) =>{
    try{
        const buyers = await Buyer.find();
        res.status(200).json({success: true, buyers});
    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

//get by id

exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).json({success: false, message: "Buyer not found" });
    res.status(200).json({ success: true, buyer });
  } catch(error){
    res.status(500).json({success:false, message: error.message});
  }
};

//delete by id
exports.deleteBuyer = async (req,res) =>{
    try{
        const buyer = await Buyer.findByIdAndDelete(req.params.id);
        if(!buyer) return res.status(404).json({ success: false, message: "Buyer not found" });
        res.status(200).json({ success: true, message: "Buyer deleted successfully" });

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
};

