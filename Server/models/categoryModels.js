const mongoose = require('mongoose');

//create category schema
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true, //removes whitespace
        unique:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Category',categorySchema);