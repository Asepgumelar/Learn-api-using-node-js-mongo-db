const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    code: String,
    name: String,
    price: String,
    stock: String,
    description: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Product', ProductSchema);