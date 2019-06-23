const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    customer_number: String,
    nama: String,
    jenis_kelamin: String,
    telepon: String,
    alamat: String,
    kec: String,
    kota: String,
    provinsi: String,
    kode_pos: String    
}, {
    timestamps: true
});
module.exports = mongoose.model('Customer', CustomerSchema);