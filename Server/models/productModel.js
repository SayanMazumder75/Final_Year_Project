// product model file (product model is created for CRUD operations on products)
// it stores product details like product_id, title, price, description, content, category, images etc
const mongoose = require('mongoose');

// create product schema
const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        trim: true, // removes whitespace
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    Images: {
        type: Object,
        required: true,
        default: {}
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);