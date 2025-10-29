const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //reference to User collection
        ref: "OwnerProfile", //ownerProfileModel name
        required: true
    },
    brand:{ type: String, required: true},
    year:{ type: Number, required: true},
    fuel:{
        type:String,
        enum:["Petrol", "Diesel", "Electric", "CNG/Hybrid"],
        required: true
    },
    email:{ type: String, required: true},
    transmission:{ type: String, enum: ["Manual", "Automatic"], required: true},
    kmsDriven: {type: Number, required: true},
    noOfOwners: {type: String, enum:["1st","2nd","3rd","4th"],required:true},
    adTitle: {type: String, required: true },
    description:{type: String, required: true},
    price: {type: Number, required: true},
    photos: [{type:String}],
    state:{type:String, required: true},
    mobilePhone: {type: String, required:true},
    adType: {
  type: String,
  enum: ["sell", "rent"],
  required: true,
},

}, {timestamps: true});


module.exports = mongoose.model("Ad", adSchema);