const mongoose = require('mongoose');
const DetailOrderSchema = mongoose.Schema({
    order_number: String,
    customer_number: String,
    product_number:String,
    quantity: String
}, {
    timestamps: true
});
module.exports = mongoose.model('DetailOrder', DetailOrderSchema);