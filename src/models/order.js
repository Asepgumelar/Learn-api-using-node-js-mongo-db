const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
    order_number: String,
    customer_number: String,
    total_harga: String,
    nama_penerima:String,
    alamat_penerima:String,
    telepon_penerima:String,
}, {
    timestamps: true
});
module.exports = mongoose.model('Order', OrderSchema);